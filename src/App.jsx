import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/Signup";
import ForgotPassword from "./components/auth/Forgotpass";
import Layout from "./Layout/Layout";
import Home from "./pages/Home";
import ResetPassword from "./components/auth/Resetpass";
import "react-toastify/dist/ReactToastify.css";
import PortfolioLayout from "./ownerProfile/Layout/PortfolioLayout";
import Dashboard from "./ownerProfile/pages/Dashboard";
import AllListing from "./ownerProfile/pages/All-Listing";
// import PortfolioLayout from './Layout/PortfolioLayout';
// import { Route, Routes } from 'react-router-dom';
import OrderHistory from "./ownerProfile/pages/Order-History";
import PostListing from "./ownerProfile/pages/Post-Listing";
import Purchaseorders from "./ownerProfile/pages/Purchase-orders";
import UserProfile from "./ownerProfile/pages/UserProfile";
import Inbox from "./ownerProfile/pages/Inbox";
import Properties_details from "./pages/Properties_Details";
import ListingPage from "./pages/ListingPage";
import PrivateRoute from "./services/Auth_JwtApi/PrivateRoute";
import PaymentPage from "./ownerProfile/pages/Pyament";

// import Navbar from './components/header-footer/Header';
// import SignUp from './components/auth/signup'

function App() {
  return (
    <>
      <Routes>
        {/*Routes that are  in Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/all_Listings" element={<ListingPage />} />
          <Route path="/view_listing_details/:id" element={<Properties_details />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/Forgot-Password" element={<ForgotPassword />} />
          <Route path="/Reset-Password" element={<ResetPassword />} />
        </Route>

        {/* Other Routes that are not in Layout */}
        {/* routes for portfolio section of user */}

        {/* Protected Portfolio Routes */}
        <Route path="/portfolio" element={<PortfolioLayout />}>
          {/* <Route element={<PortfolioLayout />}> */}
            <Route index element={<Dashboard />} />
            <Route path="my_all_listings" element={<AllListing />} />
            <Route path="order_history" element={<OrderHistory />} />
            <Route path="post_listing" element={<PostListing />} />
            <Route path="purchase_products" element={<Purchaseorders />} />
            <Route path="payment_checkout" element={<PaymentPage />} />
            
            <Route path="inbox" element={<Inbox />} />

            {/* Profile nested routes */}
            <Route path="profile_setting" element={<UserProfile />}>
              <Route path="update_profile" element={<UserProfile />} />
              <Route path="change_password" element={<UserProfile />} />
            </Route>
          </Route>
        {/* </Route> */}
      </Routes>
    </>
  );
}

export default App;
