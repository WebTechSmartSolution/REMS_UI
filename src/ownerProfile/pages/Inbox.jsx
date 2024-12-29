import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as signalR from "@microsoft/signalr";
import "../style/ChatPage.css";
import authService from "../../services/Auth_JwtApi/AuthService";

const ChatPage = () => {
  const { chatId } = useParams(); // Extract chatId from URL
  console.log("Extracted chatId:", chatId);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [connection, setConnection] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const senderId = authService.getUserIdFromAuthToken();

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
      
          // Convert chatId to Guid if necessary
          if (typeof chatId === "string") {
            chatId = chatId.trim(); // Optionally validate if it is a valid Guid string
          }
      
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
    };

    try {
      if (!message.chatId) {
        throw new Error("Chat ID is required to send a message.");
      }
      await connection.invoke("SendMessage", message);
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
