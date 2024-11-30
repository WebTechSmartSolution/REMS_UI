import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
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
            try {
                const response = [
                    { id: 1, title: "Demo", type: "Apartment", status: "available", price: "$300,000", totalArea: "1200 sqft" },
                    { id: 2, title: "Test", type: "Villa", status: "sold", price: "$1,200,000", totalArea: "5000 sqft" },
                    { id: 3, title: "Demo", type: "Apartment", status: "available", price: "$300,000", totalArea: "1200 sqft" },
                    { id: 4, title: "Test", type: "Villa", status: "sold", price: "$1,200,000", totalArea: "5000 sqft" },
                ];

                const totalListings = response.length;
                const forSale = response.filter((listing) => listing.status === "available").length;
                const forRent = response.filter((listing) => listing.type === "Apartment").length;
                const soldListings = response.filter((listing) => listing.status === "sold").length;
                const activeListings = totalListings - soldListings;
                const premiumListings = response.filter((listing) =>
                    parseFloat(listing.price.replace(/[^0-9.-]+/g, "")) > 500000
                ).length;

                setListingStats({ totalListings, forSale, forRent, premiumListings, activeListings });

                setPieChartData([
                    { name: "For Sale", value: forSale },
                    { name: "For Rent", value: forRent },
                    { name: "Premium Listings", value: premiumListings },
                    { name: "Active Listings", value: activeListings },
                ]);

                setLineChartData([
                    { month: "Jan", totalListings, activeListings },
                    { month: "Feb", totalListings: totalListings - 1, activeListings: activeListings - 1 },
                    { month: "Mar", totalListings: totalListings + 2, activeListings: activeListings + 1 },
                ]);

                setListings(response);

                setFilters({
                    global: { value: null, matchMode: "contains" },
                });

                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

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
        <img src={rowData.images?.[0]} alt={rowData.title} className="w-6rem h-4rem" />
    );

    const statusBodyTemplate = (rowData) => (
        <Tag value={rowData.status} severity={rowData.status === "available" ? "success" : "danger"} />
    );

    const actionsBodyTemplate = (rowData) => (
        <div className="flex gap-2">
            <Button icon="pi pi-eye" className="p-button-rounded p-button-info" />
            <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning" />
        </div>
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
                    <div key={key} className="card" style={{ background: COLORS[index % COLORS.length] }}>
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
                        <Line type="monotone" dataKey="totalListings" stroke="#8884d8" />
                        <Line type="monotone" dataKey="activeListings" stroke="#82ca9d" />
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
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="table-container">
                {header}
                <DataTable value={listings} paginator rows={10} loading={loading} filters={filters} globalFilterFields={["title", "type", "status", "price", "totalArea"]}>
                    <Column field="id" header="ID" sortable />
                    <Column body={imageBodyTemplate} header="Image" />
                    <Column field="title" header="Property Title" sortable />
                    <Column field="type" header="Property Type" sortable />
                    <Column body={statusBodyTemplate} header="Status" sortable />
                    <Column field="price" header="Price" sortable />
                    <Column field="totalArea" header="Total Area" sortable />
                    <Column body={actionsBodyTemplate} header="Actions" />
                </DataTable>
            </div>
        </div>
    );
};

export default DashboardPage;
