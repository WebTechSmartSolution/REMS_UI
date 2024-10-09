import React from 'react';
import NavbarSidebar from '../components/nv';
import { Outlet } from 'react-router-dom';
import './Portfolio.css'

const PortfolioLayout = () => {
  return (
    <div className="portfolio-layout">
      <NavbarSidebar />
      <div className="content-area">
        <Outlet /> {/* This will render child routes dynamically */}
      </div>
    </div>
  );
};

export default PortfolioLayout;
