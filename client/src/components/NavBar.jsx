import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";

const NavBar = () => {
  const navLinkBaseClasses =
    "px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#EEEEEE] focus-visible:ring-offset-[#00ADB5]";

  const getNavLinkClasses = ({ isActive }) => {
    if (isActive) {
      return `${navLinkBaseClasses} bg-[#222831] text-[#EEEEEE] shadow-md`; // Darker, richer active background
    }
    return `${navLinkBaseClasses} text-white hover:bg-[#393E46]/50 hover:text-[#EEEEEE]`; // White text, subtle hover
  };

  return (
    <nav className="flex justify-center items-center gap-3 sm:gap-5 px-4 py-3 bg-[#00ADB5] shadow-lg">
      {/* Consider adding a Logo or Brand Name here, e.g.,
        <div className="mr-auto text-white text-xl font-bold">
          MyApp
        </div>
      */}
      <NavLink className={getNavLinkClasses} to="/">
        Home
      </NavLink>
      <NavLink className={getNavLinkClasses} to="/login">
        Login
      </NavLink>
      <NavLink className={getNavLinkClasses} to="/signup">
        Signup
      </NavLink>
      <NavLink className={getNavLinkClasses} to="/subscribe">
        Subscribe
      </NavLink>
      <NavLink className={getNavLinkClasses} to="/dashboard">
        Dashboard
      </NavLink>
      <NavLink className={getNavLinkClasses} to="/calendar">
        Calendar
      </NavLink>
    </nav>
  );
};

export default NavBar;
