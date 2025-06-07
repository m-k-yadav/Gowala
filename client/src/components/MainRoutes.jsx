import React from "react";
import Signup from "../auth/Signup";
import Login from "../auth/Login";
import CustomerDashBoard from "../pages/CustomerDashBoard";
import AdminDashboard from "../pages/AdminDashboard";
import SubscriptionForm from "../pages/SubscriptionForm";
import LandingPage from "../pages/LandingPage";
import { AuthProvider } from "../auth/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const MainRoutes = () => {
  return (
    <div>
      <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<CustomerDashBoard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/subscribe" element={<SubscriptionForm />} />
          </Routes>
      </AuthProvider>
    </div>
  );
};

export default MainRoutes;
