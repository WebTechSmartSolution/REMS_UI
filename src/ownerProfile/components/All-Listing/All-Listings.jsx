import React, { useState, useEffect } from "react";
import { notify } from "../../../services/errorHandlingService";
import authService from "../../../services/Auth_JwtApi/AuthService";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import "./All-Listing.css";
import LoadingSpinner from "../../../components/cards/loadingspiner";

const ListingDashboard = () => {
  const [listings, setListings] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // Add searchQuery state
  const navigate = useNavigate(); // To handle redirects for edit

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        // Logging response for debugging
        const fetchedListings = await authService.getListings();
        console.log(fetchedListings.images);
        if (fetchedListings.length > 0) {
          setListings(fetchedListings);
        } else {
          notify("warning", "No listings found. Using default data.");
          setListings([
            // Default data for testing
            {
              id: 1,
              image: "/src/assets/rental2.jpeg",
              title: "Sample Property 1",
              reservationId: "1234",
              totalBooking: 10,
              pending: 2,
              confirmed: 8,
              price: "$500",
            },
            {
              id: 2,
              image: "/src/assets/rental1.jpeg",
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
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchListings();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredListings = listings.filter((listing) => {
    const title = listing.title || listing.propertyName; // Ensure title is a string
    return title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleView = (id) => {
    navigate(`/portfolio/listing/view/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/portfolio/listing/edit/${id}`);
  };

  const handleStatusChange = async (id) => {
    try {
      await authService.ChangeListingStatus(id);
      setListings((prevListings) =>
        prevListings.filter((listing) => listing.id !== id)
      );
    } catch (error) {
      notify(
        "error",
        "Error during listing deletion: " + (error.message || error)
      );
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
        <button
          className="new-space-btn"
          onClick={() => navigate("/portfolio/post_listing")}
        >
          List New Property
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
        <input
          type="text"
          placeholder="Search by title"
          className="search-input"
          value={searchTerm}
          onChange={handleSearchChange}
        />
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
                      src={`http://localhost:5000${
                        listing.images?.[0]?.path || "/src/assets/rental1.jpeg"
                      }`}
                      alt={`Image of ${listing.title || listing.propertyName}`}
                      className="listing-image"
                    />
                  </td>
                  <td>{listing.title || listing.propertyName}</td>
                  <td>{listing.reservationId || "N/A"}</td>
                  <td>{listing.propertyType}</td>
                  <td>{listing.sqft}</td>
                  <td>{listing.createdAt ? format(new Date(listing.createdAt), "dd/MM/yyyy") : "N/A"}</td>
                  <td>{listing.salePrice}</td>
                  <td className="action-icons">
                    <button
                      className="action-btn view-btn"
                      onClick={() => handleView(listing.id)}
                    >
                      <i className="fas fa-eye"></i> View
                    </button>
                    <button
                      className="action-btn edit-btn"
                      onClick={() => handleEdit(listing.id)}
                    >
                      <i className="fas fa-edit"></i> Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="no-data">
                  No listings available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListingDashboard;
