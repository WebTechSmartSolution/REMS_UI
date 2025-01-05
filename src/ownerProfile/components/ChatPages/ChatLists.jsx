import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import authService from "../../../services/Auth_JwtApi/AuthService";
import "./ChatList.css";

const ChatList = () => {
  const [chats, setChats] = useState([]); // State to hold chat data
  const [loading, setLoading] = useState(true); // State to handle loading
  const navigate = useNavigate();
  const userId = authService.getUserIdFromAuthToken(); // Get the logged-in user's ID from token

  // Function to fetch the chat list for the logged-in user
  const fetchChatList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/Chat/user/${userId}/chats`
      );
      // console.log("Fetched Chats (raw):", response.data);
  
      const chatsWithIds = response.data.map((chat) => ({
        ...chat,
        ChatId: chat.chatId, // Ensure `ChatId` is correctly assigned from `chatId` in the response
      }));
  
      // console.log("Mapped Chats:", chatsWithIds); // Debugging the updated structure
      setChats(chatsWithIds); // Update state with processed chat data
      setLoading(false); // Stop the loading spinner
    } catch (error) {
      console.error("Error fetching chat list:", error);
      setLoading(false); // Stop the loading spinner in case of errors
    }
  };

  // Function to handle deleting a chat
  const deleteChat = async (chatId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/Chat/${chatId}`);
      // console.log(response.data);
      // Remove the deleted chat from the state
      setChats((prevChats) => prevChats.filter((chat) => chat.ChatId !== chatId));
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  // Fetch chat list when the component mounts
  useEffect(() => {
    fetchChatList();
  }, []);

  // Navigate to the chat page with the selected chat ID
  const openChat = (chatId, ownerId, viewerId) => {
    if (!chatId) {
      // console.error("Invalid chatId:", chatId);
      return;
    }
    navigate(`/portfolio/chat/${chatId}`, {
      state: { ownerId, viewerId },
    });
  };

  return (
    <div className="chat-list">
      <h2>Your Chats</h2>
      {loading ? (
        <p>Loading chats...</p> // Display loading text while fetching chats
      ) : chats.length === 0 ? (
        <p>No chats available.</p> // Display message if no chats are available
      ) : (
        <div className="chat-cards">
          {chats.map((chat) => (
            <div
              key={chat.ChatId} // Use the explicitly assigned ChatId as the unique identifier
              className="chat-card"
              onClick={() => openChat(chat.ChatId, chat.OwnerId, chat.ViewerId)}
            >
              <div className="chat-card-header">
                <img
                  src={"/src/assets/chat-bubble.png"} // Use a default avatar if no image is provided
                  alt={chat.OtherUserName || "User"}
                  className="chat-card-avatar"
                />
                <div className="chat-card-info">
                  <h4>{chat.OtherUserName || "Unknown User"}</h4>
                  <p className="chat-card-preview">
                    {chat.LastMessage || "No messages yet"}
                  </p>
                </div>
              </div>
              <p className="chat-card-timestamp">
                {chat.LastMessageTimestamp
                  ? new Date(chat.LastMessageTimestamp).toLocaleString()
                  : "No timestamp available"}
              </p>
              {/* Delete Button */}
              <button onClick={() => deleteChat(chat.ChatId)} className="delete-chat-btn">
                Delete Chat
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatList;
