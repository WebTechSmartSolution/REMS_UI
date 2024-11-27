import React, { useState, useEffect } from "react";
import { notify } from "../../../services/errorHandlingService";
import authService from "../../../services/Auth_JwtApi/AuthService";
import { useNavigate } from "react-router-dom";
import "./All-Listing.css";

const ListingDashboard = () => {
  const [listings, setListings] = useState([]);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate(); // To handle redirects for edit

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Logging response for debugging
        const fetchedListings = await authService.getListings();

        if (fetchedListings.length > 0) {
          setListings(fetchedListings);
        } else {
          notify("warning", "No listings found. Using default data.");
          setListings([
            {
              id: 1,
              image: "/default.jpg",
              title: "Sample Property 1",
              reservationId: "1234",
              totalBooking: 10,
              pending: 2,
              confirmed: 8,
              price: "$500",
            },
            {
              id: 2,
              image: "/default.jpg",
              title: "Sample Property 2",
              reservationId: "5678",
              totalBooking: 5,
              pending: 1,
              confirmed: 4,
              price: "$300",
            },
          ]);
        }
      } catch (error) {
        // Logging error for debugging
        notify("error", "Error fetching listings: " + (error.message || error));
      }
    };

    fetchListings();
  }, []);

  const filteredListings = listings; // All listings are shown as the default filter

  const handleView = (id) => {
    navigate(`/listing/view/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/listing/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await authService.deleteListing(id);
      setListings((prevListings) => prevListings.filter((listing) => listing.id !== id));
    } catch (error) {
      notify("error", "Error during listing deletion: " + (error.message || error));
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-stats">
          <div className="stat-item">
            <div className="stat-value">{listings.length}</div>
            <div className="stat-label">Total listings</div>
          </div>
        </div>
        <button className="new-space-btn" onClick={() => navigate("/listing/new")}>
          List New Space
        </button>
      </div>

      <div className="filter-section">
        <ul className="filter-list">
          <li className="filter-item active" onClick={() => setFilter("all")}>
            All Listings
          </li>
        </ul>
      </div>

      <div className="search-section">
        <input type="text" placeholder="Search by title" className="search-input" />
      </div>

      <div className="table-container">
        <table className="listings-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Image</th>
              <th>Property Title</th>
              <th>Property Id</th>
              <th>Property Type</th>
              <th>Area(Sqft)</th>
              <th>Listing Date</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredListings.length > 0 ? (
              filteredListings.map((listing) => (
                <tr key={listing.id}>
                  <td>{listing.id}</td>
                  <td>
                    <img
                      src={listing.image}
                      alt={`Image of ${listing.title}`}
                      className="listing-image"
                    />
                  </td>
                  <td>{listing.title}</td>
                  <td>{listing.reservationId}</td>
                  <td>{listing.totalBooking}</td>
                  <td>{listing.pending}</td>
                  <td>{listing.confirmed}</td>
                  <td>{listing.price}</td>
                  <td className="action-icons">
                    <button className="action-btn view-btn" onClick={() => handleView(listing.id)}>
                      <i className="fas fa-eye"></i> View
                    </button>
                    <button className="action-btn edit-btn" onClick={() => handleEdit(listing.id)}>
                      <i className="fas fa-edit"></i> Edit
                    </button>
                    <button className="action-btn delete-btn" onClick={() => handleDelete(listing.id)}>
                      <i className="fas fa-trash"></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="no-data">No listings available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListingDashboard;
