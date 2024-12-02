import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Common from "../components/Sections/PD_Section/Common";
import "../components/Sections/style/PropertieDetails.css";
import Section3 from "../components/Sections/PD_Section/Section3";
import Reviews from "../components/Sections/PD_Section/Reviews";
import RequestInfo from "../components/Sections/PD_Section/LeftSideDiv";
import SimilarListings from "../components/Sections/PD_Section/LastSection";
import OwnerDetails from "../components/Sections/PD_Section/Ownerdetails";
import authService from "../services/Auth_JwtApi/AuthService";

function Properties_details() {
  const { id } = useParams(); // Extract the listing ID from the URL
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const data = await authService.fetchListingDetails(id); 
        setListing(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>  
      <div className="propertie-page">
      <Common listing={listing} />
      <div className="Parent">
        <div className="left-side">
          <Section3 listing={listing} />
        </div>
        <div className="right-side">
          <RequestInfo listing={listing} />
          <OwnerDetails owner={listing.owner} />
          <Reviews listingId={id} />
        </div>
      </div>
      <SimilarListings />
    </div>
    </>
  );
}

export default Properties_details;
