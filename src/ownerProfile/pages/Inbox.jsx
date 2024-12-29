import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import * as signalR from "@microsoft/signalr";
import "../style/ChatPage.css";
import authService from "../../services/Auth_JwtApi/AuthService";
import axios from "axios"; // Axios for API calls

const ChatPage = () => {
  const { chatId } = useParams(); // Extract chatId from URL
  const { state } = useLocation(); // Get state passed from navigate
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [connection, setConnection] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const senderId = authService.getUserIdFromAuthToken(); // Get logged in user's senderId

  // Get ownerId and viewerId from location state
  const { ownerId, viewerId } = state || {};

  // Fetch previous chat messages
  useEffect(() => {
    const fetchChatMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/chat/${chatId}/messages`
        );
        setMessages(response.data); // Assuming the response contains the array of messages
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      }
    };

    fetchChatMessages();
  }, [chatId]); // Run this effect when chatId changes

  useEffect(() => {
    const hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5000/chatHub", {
        accessTokenFactory: () => localStorage.getItem("accessToken"),
      })
      .withAutomaticReconnect()
      .build();

    const joinChat = async (chatId) => {
      try {
        if (!chatId) {
          throw new Error("Chat ID is required to join the chat.");
        }
        // Join the SignalR group with chatId
        await hubConnection.invoke("JoinChat", chatId);
      } catch (error) {
        console.error("Error joining chat:", error);
      }
    };

    const startConnection = async () => {
      try {
        await hubConnection.start();
        console.log("SignalR Connected");
        setIsConnected(true);

        // Join the chat with the provided chatId
        await joinChat(chatId);
      } catch (err) {
        console.error("Error connecting to SignalR:", err);
        setIsConnected(false);
      }
    };

    setConnection(hubConnection);
    startConnection();

    return () => {
      hubConnection.stop().then(() => console.log("SignalR Disconnected"));
    };
  }, [chatId]);

  useEffect(() => {
    if (connection) {
      const handleReceiveMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      };

      // Listen for incoming messages
      connection.on("ReceiveMessage", handleReceiveMessage);

      return () => {
        connection.off("ReceiveMessage", handleReceiveMessage);
      };
    }
  }, [connection]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const message = {
      chatId,
      senderId,
      content: newMessage,
      timestamp: new Date().toISOString(),
      receiverId: senderId === ownerId ? viewerId : ownerId, // Set receiverId depending on who the user is
    };

    try {
      if (!message.chatId) {
        throw new Error("Chat ID is required to send a message.");
      }

      // Send message to SignalR server
      await connection.invoke("SendMessage", message);

      // Update UI with the sent message
      setMessages((prevMessages) => [...prevMessages, message]);
      setNewMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="chat-page">
      <h2>Chat</h2>
      {!isConnected && <p className="error">Reconnecting...</p>}
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${
              msg.senderId === senderId ? "my-message" : "their-message"
            }`}
          >
            <p>{msg.content}</p>
            <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
