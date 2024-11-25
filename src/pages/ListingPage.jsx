import React, { useEffect, useState } from 'react';
import Filters from '../components/Sections/Listing/Section3';
import ListingCard from '../components/cards/Card';
import { FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import '../style/ListingPage.css';
import Section1 from '../components/Sections/Listing/Section1';
import { notify } from '../services/errorHandlingService';

const ITEMS_PER_PAGE = 12;

const defaultListings = [
  {
    Propertytype: "Buy",
    id: 1,
    title: "Beautiful Condo Room",
    location: "Chicago, IL",
    price: 2200,
    beds: 4,
    baths: 4,
    size: 3500,
    imageUrl: "/src/assets/US1.jpeg",
    agentName: "Marc Silva",
    agentImage: "/src/assets/US3.jpeg",
    isFeatured: true,
    isNew: true,
  },
  {
    Propertytype: "Buy",
    id: 15,
    title: "Beautiful Condo Room",
    location: "Chicago, IL",
    price: 2200,
    beds: 4,
    baths: 4,
    size: 3500,
    imageUrl: "/src/assets/US1.jpeg",
    agentName: "Marc Silva",
    agentImage: "/src/assets/US3.jpeg",
    isFeatured: true,
    isNew: true,
  },
  {
    Propertytype: "Rent", // Add Propertytype here as well
    id: 16,
    title: "Grand Mahaka",
    location: "New York, NY",
    price: 1400,
    beds: 2,
    baths: 1,
    size: 5000,
    imageUrl: "/src/assets/US1.jpeg",
    agentName: "Karen Maria",
    agentImage: "/src/assets/US4.jpeg",
    isFeatured: true,
    isNew: false,
  },
  {
    Propertytype: "Buy",
    id: 2,
    title: "Grand Mahaka",
    location: "New York, NY",
    price: 1400,
    beds: 2,
    baths: 1,
    size: 5000,
    imageUrl: "/src/assets/US1.jpeg",
    agentName: "Karen Maria",
    agentImage: "/src/assets/US4.jpeg",
    isFeatured: true,
    isNew: false,
  },
  {
    Propertytype: "Buy",
    id: 3,
  title: "Grand Mahaka",
  location: "New York, NY",
  price: 1400,
  beds: 2,
  baths: 1,
  size: 5000,
  imageUrl: "/src/assets/US1.jpeg",
  agentName: "Karen Maria",
  agentImage: "/src/assets/US4.jpeg",
  isFeatured: true,
  isNew: false,
},
{
  Propertytype: "Buy",
  id: 4,
title: "Grand Mahaka",
location: "New York, NY",
price: 1400,
beds: 2,
baths: 1,
size: 5000,
imageUrl: "/src/assets/US1.jpeg",
agentName: "Karen Maria",
agentImage: "/src/assets/US4.jpeg",
isFeatured: true,
isNew: false,
},
{Propertytype: "Buy",
  id: 5,
title: "Grand Mahaka",
location: "New York, NY",
price: 1400,
beds: 2,
baths: 1,
size: 5000,
imageUrl: "/src/assets/US1.jpeg",
agentName: "Karen Maria",
agentImage: "/src/assets/US4.jpeg",
isFeatured: true,
isNew: false,
},
{Propertytype: "Buy",
  id: 6,
title: "Grand Mahaka",
location: "New York, NY",
price: 1400,
beds: 2,
baths: 1,
size: 5000,
imageUrl: "/src/assets/US1.jpeg",
agentName: "Karen Maria",
agentImage: "/src/assets/US4.jpeg",
isFeatured: true,
isNew: false,
},
{Propertytype: "Buy",
  id: 7,
title: "Grand Mahaka",
location: "New York, NY",
price: 1400,
beds: 2,
baths: 1,
size: 5000,
imageUrl: "/src/assets/US1.jpeg",
agentName: "Karen Maria",
agentImage: "/src/assets/US4.jpeg",
isFeatured: true,
isNew: false,
},
{Propertytype: "Buy",
  id: 8,
title: "Grand Mahaka",
location: "New York, NY",
price: 1400,
beds: 2,
baths: 1,
size: 5000,
imageUrl: "/src/assets/US1.jpeg",
agentName: "Karen Maria",
agentImage: "/src/assets/US4.jpeg",
isFeatured: true,
isNew: false,
}, 
{Propertytype: "Buy",
   id: 9,
title: "Grand Mahaka",
location: "New York, NY",
price: 1400,
beds: 2,
baths: 1,
size: 5000,
imageUrl: "/src/assets/US1.jpeg",
agentName: "Karen Maria",
agentImage: "/src/assets/US4.jpeg",
isFeatured: true,
isNew: false,
},
{Propertytype: "Rent",
  id: 10,
title: "Grand Mahaka",
location: "New York, NY",
price: 1400,
beds: 2,
baths: 1,
size: 5000,
imageUrl: "/src/assets/US1.jpeg",
agentName: "Karen Maria",
agentImage: "/src/assets/US4.jpeg",
isFeatured: true,
isNew: false,
},
{Propertytype: "Rent",
  id: 11,
title: "Grand Mahaka",
location: "New York, NY",
price: 1400,
beds: 2,
baths: 1,
size: 5000,
imageUrl: "/src/assets/US1.jpeg",
agentName: "Karen Maria",
agentImage: "/src/assets/US4.jpeg",
isFeatured: true,
isNew: false,
},
{Propertytype: "Rent",
  id: 12,
title: "Grand Mahaka",
location: "New York, NY",
price: 1400,
beds: 2,
baths: 1,
size: 5000,
Propertytype: 'buy',
imageUrl: "/src/assets/US1.jpeg",
agentName: "Karen Maria",
agentImage: "/src/assets/US4.jpeg",
isFeatured: true,
isNew: false,
},
{Propertytype: "Rent",
  id: 13,
title: "Grand Mahaka",
location: "New York, NY",
price: 1400,
beds: 2,
baths: 1,
size: 5000,
imageUrl: "/src/assets/US1.jpeg",
agentName: "Karen Maria",
agentImage: "/src/assets/US4.jpeg",
isFeatured: true,
isNew: false,
},
{Propertytype: "Rent",
  id: 14,
title: "Grand Mahaka",
location: "New York, NY",
price: 1400,
beds: 2,
baths: 1,
size: 5000,
imageUrl: "/src/assets/US1.jpeg",
agentName: "Karen Maria",
agentImage: "/src/assets/US4.jpeg",
isFeatured: true,
isNew: false,
},
  // Add more default listings as needed
];

const ListingPage = () => {
  const [listings, setListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/listings'); // Replace with actual API endpoint
        const data = await response.json();
        setListings(data.length ? data : defaultListings);
        setFilteredData(data.length ? data : defaultListings);
      } catch (error) {
        notify("error", "Error fetching listings: " + error.message);
       
        setListings(defaultListings);
        setFilteredData(defaultListings);
      }
    };

    fetchListings();
  }, []);

  const handleSearch = (filters) => {
    const { location, priceRange, Propertytype } = filters;
  
    const filtered = listings.filter((listing) => {
      const locationMatch = !location || listing.location.toLowerCase().includes(location.toLowerCase());
      const priceMatch = !priceRange || listing.price <= Number(priceRange);
      const PropertytypeMatch = !Propertytype || listing.Propertytype.toLowerCase() === Propertytype.toLowerCase();
  
      // Use AND condition to include listings that match all selected filters
      return locationMatch && priceMatch && PropertytypeMatch;
    });
  
    setFilteredData(filtered);
    setCurrentPage(1);
  };
  
  
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIdx = Math.min(startIdx + ITEMS_PER_PAGE, filteredData.length);
  const paginatedListings = filteredData.slice(startIdx, endIdx);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="listing-page">
      <Section1/>
      <Filters onSearch={handleSearch} searchIcon={<FiSearch />} />

      <div className="listing-count">
        Showing results {startIdx + 1} - {endIdx} of {filteredData.length}
      </div>

      <div className="cards-container">
        {paginatedListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>

      <div className="pagination">
        <button 
          onClick={goToPreviousPage} 
          disabled={currentPage === 1} 
          className="pagination-btn"
        >
          <FiChevronLeft />
        </button>
        <span className="page-info">{currentPage} of {totalPages}</span>
        <button 
          onClick={goToNextPage} 
          disabled={currentPage === totalPages} 
          className="pagination-btn"
        >
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
};

export default ListingPage;
