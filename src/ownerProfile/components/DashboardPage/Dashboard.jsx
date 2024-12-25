import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import authservice from "../../../services/Auth_JwtApi/AuthService";
// import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Legend,
  Line,
  XAxis,
  YAxis,
} from "recharts";
import "./Dashboard.css";

const DashboardPage = () => {
  const [listings, setListings] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(true);
  const [listingStats, setListingStats] = useState({
    totalListings: 0,
    forSale: 0,
    forRent: 0,
    premiumListings: 0,
    activeListings: 0,
  });

  const [pieChartData, setPieChartData] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const defaultData = [
        { id: 1, propertyName: "Demo", currencyType: "USD", propertyType: "Apartment", status: "available", salePrice: "$300,000", size: "1200 sqft", createdAt: "2023-07-01" },
        { id: 2, propertyName: "Test", currencyType: "USD", propertyType: "Villa", status: "sold", salePrice: "$1,200,000", size: "5000 sqft", createdAt: "2023-07-01" },
        { id: 3, propertyName: "Demo", currencyType: "USD", propertyType: "Apartment", status: "available", salePrice: "$300,000", size: "1200 sqft", createdAt: "2023-07-01" },
        { id: 4, propertyName: "Test", currencyType: "USD", propertyType: "Villa", status: "sold", salePrice: "$1,200,000", size: "5000 sqft", createdAt: "2023-07-01" },
      ];
  
      const calculateStats = (listings) => {
        const totalListings = listings.length;
        const forSale = listings.filter((listing) => listing.status === "available").length;
        const forRent = listings.filter((listing) => listing.propertyType === "rent").length;
        const soldListings = listings.filter((listing) => listing.status === "sold").length;
        const activeListings = totalListings - soldListings;
  
        const premiumListings = listings.filter((listing) => {
          const priceString = listing.salePrice ? listing.salePrice.toString() : "0";
          const price = parseFloat(priceString.replace(/[$,]/g, "")) || 0;
          return price > 500000;
        }).length;
  
        return { totalListings, forSale, forRent, premiumListings, activeListings };
      };
  
      try {
        const response = await authservice.getListings();
        const listings = response?.length > 0 ? response : defaultData;
  
        const stats = calculateStats(listings);
        setListingStats(stats);
  
        setPieChartData([
          { name: "For Sale", value: stats.forSale },
          { name: "For Rent", value: stats.forRent },
          { name: "Premium Listings", value: stats.premiumListings },
          { name: "Active Listings", value: stats.activeListings },
        ]);
  
        setLineChartData([
          { month: "Jan", totalListings: stats.totalListings, activeListings: stats.activeListings },
          { month: "Feb", totalListings: stats.totalListings - 1, activeListings: stats.activeListings - 1 },
          { month: "Mar", totalListings: stats.totalListings + 2, activeListings: stats.activeListings + 1 },
        ]);
  
        setListings(listings);
      } catch (error) {
        console.error("Error fetching data:", error);
  
        // Fallback to default data
        const stats = calculateStats(defaultData);
        setListingStats(stats);
  
        setPieChartData([
          { name: "For Sale", value: stats.forSale },
          { name: "For Rent", value: stats.forRent },
          { name: "Premium Listings", value: stats.premiumListings },
          { name: "Active Listings", value: stats.activeListings },
        ]);
  
        setLineChartData([
          { month: "Jan", totalListings: stats.totalListings, activeListings: stats.activeListings },
          { month: "Feb", totalListings: stats.totalListings - 1, activeListings: stats.activeListings - 1 },
          { month: "Mar", totalListings: stats.totalListings + 2, activeListings: stats.activeListings + 1 },
        ]);
  
        setListings(defaultData);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  // Dependency array ensures fetchData runs only once

  // Rest of the component remains unchanged
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF8062"];

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    const _filters = { ...filters };
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between align-items-center mb-3">
        <h3>Recently Added Listings</h3>
        <span className="p-input-icon-left">
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Search..."
          />
        </span>
      </div>
    );
  };

  const header = renderHeader();

  const imageBodyTemplate = (rowData) => (
    <img
      src={`http://localhost:5000${
        rowData.images?.[0]?.path || "/src/assets/rental1.jpeg"
      }`}
      alt={`Image of ${rowData.propertyName || "Property"}`}
      className="listing-image"
      style={{ width: "6rem", height: "4rem" }}
    />
  );
  

  const statusBodyTemplate = (rowData) => (
    <Tag
      value={rowData.status}
      severity={rowData.status === "available" ? "success" : "danger"}
    />
  );

  const renderLabel = (entry) => {
    const total = pieChartData.reduce((acc, curr) => acc + curr.value, 0);
    const percentage = ((entry.value / total) * 100).toFixed(2);
    return `${entry.name}: ${percentage}%`;
  };
  return (
    <div className="dashboard">
      <div className="card-container">
        {Object.entries(listingStats).map(([key, count], index) => (
          <div
            key={key}
            className="card"
            style={{ background: COLORS[index % COLORS.length] }}
          >
            <h3>{key.replace(/([A-Z])/g, " $1")}</h3>
            <p>{count}</p>
          </div>
        ))}
      </div>

      <div className="chart-container">
        <h3>Listings Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineChartData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line propertyType="monotone" dataKey="totalListings" stroke="#8884d8" />
            <Line propertyType="monotone" dataKey="activeListings" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container">
        <h3>Property Overview</h3>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={pieChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              innerRadius={60}
              fill="#82ca9d"
              label={renderLabel}
              labelLine={false}
            >
              {pieChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="table-container">
        {header}
        <DataTable
          value={listings}
          paginator
          rows={10}
          loading={loading}
          filters={filters}
          globalFilterFields={[
            "propertyName",
            "propertyType",
            "salePrice",
            "currencyType",
            "createdAt",
          ]}
        >
          <Column field="id" header="ID" sortable />
          <Column body={imageBodyTemplate} header="Image" />
          <Column field="propertyName" header="Property Name" sortable />
          <Column field="propertyType" header="Property Type" sortable />
          <Column field="currencyType" header="Currency" sortable />
          <Column body={statusBodyTemplate} header="Status" sortable />
          <Column field="salePrice" header="Price" sortable />
          <Column field="createdAt" header="Created At" />
        </DataTable>
      </div>
    </div>
  );
};

export default DashboardPage;
