import React from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../services/Auth_JwtApi/AuthService";  
import "../style/OwnerDetails.css"; // Assuming you have a separate CSS file for this

const OwnerDetails = () => {

  const navigate = useNavigate();
  const viewerId = authService.getUserIdFromAuthToken(); 
  // const viewerId = "viewer123";
  console.log("Viewer ID:", viewerId);
  const startChat = async () => {
    try {
        const form = {
            viewerId,
            ownerId: listing.ownerId,
        };
        const roomId = await authService.StartChat_with_Listing_Owner(form);
        navigate(`/chat/${roomId}`);
    } catch (error) {
        console.error("Failed to start chat:", error);
    }
};
  // Hardcoded example data for the owner
  const owner = {
    name: "John Doe",
    profileImage: "src/assets/images.jpeg", // Update this with your image path
    phone: "+1 234 567 890",
    email: "johndoe@email.com",
    bio: "Experienced property owner with over 10 years in the real estate market. I specialize in renting and selling luxury homes and apartments.",
  };

  return (
    <div className="owner-details">
      <h3>Listing Owner</h3>
      <div className="owner-card">
        <div className="owner-image-container">
          <img src={owner.profileImage} alt={owner.name} />
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
        <button
            type="button"
            className="contact-owner"
            onClick={startChat}
          >
            Start Chat
          </button>
      </div>
    </div>
  );
};

export default OwnerDetails;
