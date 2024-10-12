import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faClipboardList, faUserFriends, faBuilding } from "@fortawesome/free-solid-svg-icons"; // Import your desired icons
import "./style/Section6th.css"; // Assuming you have a separate CSS file

const Section6th = () => {
    const [agentCount, setAgentCount] = useState(0);
    const [serviceCount, setServiceCount] = useState(0);
    const [userCount, setUserCount] = useState(0);
    const [listingCount, setListingCount] = useState(0);

    // Function to simulate counting up to the desired numbers
    const animateCount = (setter, target) => {
        let count = 0;
        const interval = setInterval(() => {
            if (count < target) {
                count++;
                setter(count);
            } else {
                clearInterval(interval);
            }
        }, 50); // Adjust speed of counting
    };

    useEffect(() => {
        animateCount(setAgentCount, 90); // Set target for agents
        animateCount(setServiceCount, 40); // Set target for services
        animateCount(setUserCount, 1000); // Set target for users
        animateCount(setListingCount, 100); // Set target for listings
    }, []);

    return (
        <section className="statistics-section">
            <div className="container">
                <div className="statistic-card">
                    <div className="icon">
                        <FontAwesomeIcon icon={faUserFriends} />
                    </div>
                    <h3>{agentCount}+</h3>
                    <p>Agents Listed</p>
                </div>
                <div className="statistic-card">
                    <div className="icon">
                        <FontAwesomeIcon icon={faClipboardList} />
                    </div>
                    <h3>{serviceCount}+</h3>
                    <p>Services Controlled</p>
                </div>
                <div className="statistic-card">
                    <div className="icon">
                        <FontAwesomeIcon icon={faUsers} />
                    </div>
                    <h3>{userCount}+</h3>
                    <p>Users</p>
                </div>
                <div className="statistic-card">
                    <div className="icon">
                        <FontAwesomeIcon icon={faBuilding} />
                    </div>
                    <h3>{listingCount}+</h3>
                    <p>Listings Added</p>
                </div>
            </div>
        </section>
    );
};

export default Section6th;
