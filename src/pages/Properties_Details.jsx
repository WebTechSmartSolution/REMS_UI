import React from "react";
// import PropertyDetails from './components/PD_Section/Section1'
// import Section2 from './components/PD_Section/Section2'
import "../components/Sections/style/PropertieDetails.css";
import Section3 from "../components/Sections/PD_Section/Section3";
import Reviews from "../components/Sections/PD_Section/Reviews";
import RequestInfo from "../components/Sections/PD_Section/LeftSideDiv";
import Common from "../components/Sections/PD_Section/Common";
import SimilarListings from "../components/Sections/PD_Section/LastSection";
import OwnerDetails from "../components/Sections/PD_Section/Ownerdetails";

function Properties_details() {
  return (
    <>
      
      <div className="propertie-page">
      <Common />
      <div className="Parent">
        <div className="left-side">
          <Section3 />
         
        </div>
        <div className="right-side">
          <RequestInfo />
          <OwnerDetails/>
          <Reviews />
        </div>
        </div>
        <SimilarListings/>
      </div>
    </>
  );
}

export default Properties_details;
