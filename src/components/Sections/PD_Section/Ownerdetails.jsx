import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../services/Auth_JwtApi/AuthService";
import "../style/OwnerDetails.css";
import { notify } from "../../../services/errorHandlingService";

const OwnerDetails = ({ listingId, ownerId }) => {
  const navigate = useNavigate();
  const ViewerID = authService.getUserIdFromAuthToken(); // console.log(ViewerID);

  const [owner, setOwner] = useState({
    name: "",
    profileImage: "",
    phone: "",
    email: "",
    bio: "",
  });

  // Fetch owner data
  useEffect(() => {
    const fetchOwnerDetails = async () => {
      try {
        const ownerData = await authService.fetchUserData(ownerId);
        console.log(ownerData);
        setOwner({
          name: ownerData.name || "N/A",
          profileImage: ownerData.profileImage || "/assets/default-avatar.png", // Fallback image
          phone: ownerData.mobileNumber || "N/A",
          email: ownerData.email || "N/A",
          // Created Date: ownerData.bio || "N/A",
        });
      } catch (error) {
        console.error("Error fetching owner details:", error);
        notify(
          "error",
          "Failed to load owner details. Please try again later."
        );
      }
    };

    fetchOwnerDetails();
  }, [ownerId]);

  const startChat = async () => {
    try {
      const chatData = await authService.startChat(
        listingId,
        ownerId,
        ViewerID
      );
      if (chatData?.chatId) {
        navigate(`/portfolio/chat/${chatData.chatId}`, {
          state: { ownerId: chatData.ownerId, viewerId: chatData.viewerId },
        });
      } else {
        throw new Error("Invalid chat data");
      }
    } catch (error) {
      console.error("Error starting chat:", error);
      notify("info", "Unable to start chat. Please try again later.");
    }
  };

  return (
    <div className="owner-details">
      <h3>Listing Owner</h3>
      <div className="owner-card">
        <div className="owner-image-container">
          <img
            src={`http://localhost:5000${
              owner.profileImage || "/src/assets/rental1.jpeg"
            }`}
            alt={owner.name}
            onError={(e) => (e.target.src = "/src/assets/rental1.jpeg")} // Fallback image on error
          />
        </div>
        <h4>{owner.name}</h4>
        <p className="owner-bio">{owner.bio}</p>
        <div className="contact-info">
          <p>
            <strong>Phone: </strong>
            {owner.phone}
          </p>
          <p>
            <strong>Email: </strong>
            <a href={`mailto:${owner.email}`}>{owner.email}</a>
          </p>
        </div>
        <button type="button" className="contact-owner" onClick={startChat}>
          Start Chat
        </button>
      </div>
    </div>
  );
};

export default OwnerDetails;
