"use client";

import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
// import UserInfoSidebar from "./UserInfoSidebar";
// import Footer from "./Footer";

export default function LayoutWrapper({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Closed by default on small screens
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleUserInfo = () => {
    setIsUserInfoOpen(!isUserInfoOpen);
  };

  // Detect screen size to set default sidebar state
  useEffect(() => {
    const handleResize = () => {
      const largeScreen = window.innerWidth >= 1024;
      setIsSidebarOpen(largeScreen); // Open by default on large screens
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex relative min-h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <main
        className={`transition-all duration-300 w-full ${
          isSidebarOpen ? "lg:pr-60" : "lg:w-full"
        }`}
      >
        <div className="px-7 py-5">
          {/* Navbar */}
          <Navbar onAvatarClick={toggleUserInfo} />
          {/* Page Content */}
          {children}
        </div>

        {/* Footer */}
        {/* <div className="mt-36">
          <Footer />
        </div> */}
      </main>

      {/* User Info Sidebar */}
      {/* <UserInfoSidebar isOpen={isUserInfoOpen} onClose={toggleUserInfo} /> */}

      {/* Overlay */}
      {/* {isUserInfoOpen && (
        <div
          className="fixed inset-0 bg-gray-600/50 z-30"
          onClick={toggleUserInfo}
        ></div>
      )} */}
    </div>
  );
}
