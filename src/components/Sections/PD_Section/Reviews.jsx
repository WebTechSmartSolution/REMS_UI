import React, { useState, useEffect } from "react";
import "../style/Reviews.css"; // Assuming CSS is in a separate file

const Reviews = () => {
  // State to store reviews and form inputs
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 0,
    comment: ""
  });

  // Fetch reviews from the API on component load
  useEffect(() => {
    fetchReviewsFromAPI();
  }, []);

  const fetchReviewsFromAPI = async () => {
    try {
      const response = await fetch("your-api-endpoint/reviews"); // Replace with your API endpoint
      const data = await response.json();
      if (data.length === 0) {
        // If no reviews are fetched, show default reviews
        setReviews([
          {
            name: "John Doe",
            email: "johndoe@gmail.com",
            rating: 5,
            comment: "Great property, I loved my stay!",
          },
        ]);
      } else {
        setReviews(data);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "rating") {
      const validRating = Math.max(1, Math.min(5, Number(value)));  // Constrain value between 1 and 5
      setFormData((prevData) => ({
        ...prevData,
        [name]: validRating,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Submit review to the API
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("your-api-endpoint/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      // Add the new review locally for immediate feedback
      setReviews((prevReviews) => [formData, ...prevReviews]);
      // Clear form after submission
      setFormData({ name: "", email: "", rating: 0, comment: "" });
    } catch (error) {
      console.error("Error posting review:", error);
    }
  };

  return (
    <section className="reviews-section">
      <h2>User Reviews</h2>
      <div className="reviews-list">
        {reviews.map((review, index) => (
          <div className="review-card" key={index}>
            <h3>{review.name}</h3>
            <p>Email: {review.email}</p>
            <div className="rating">
              {Array.from({ length: 5 }, (_, idx) => (
                <span key={idx} className={idx < review.rating ? "star filled" : "star"}>
                  ★
                </span>
              ))}
            </div>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleFormSubmit} className="review-form">
        <h3>Submit a Review</h3>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
       <input
  type="number"
  name="rating"
  placeholder="Rating (1-5)"
  value={formData.rating}
  min="1"  // Minimum rating of 1
  max="5"  // Maximum rating of 5
  onChange={handleInputChange}
  required
/>
        <textarea
          name="comment"
          placeholder="Your Review"
          value={formData.comment}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Submit Review</button>
      </form>
    </section>
  );
};

export default Reviews;
