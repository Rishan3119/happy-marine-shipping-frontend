import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react"; // Icon for open/close sidebar
import adminLogo from "./AdminImage/logo-light-icon.png";
import config from "../../function/config";
import axios from "axios";
import admin from "./AdminImage/user3jpeg.jpeg";
import { motion } from "framer-motion";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import EarningsAreaChart from "./AdminImage/EarningsAreaChart";

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [date, setDate] = useState(new Date());
  const earnings = [3000, 4000, 5000, 7000, 6000, 8000, 9000, 12000, 11000, 15000, 14000, 16000];

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1200); // Check screen size

  const toggleDropdown = (id) => {
    if (openDropdown === id) {
      setOpenDropdown(null); // Close if clicking the same dropdown
    } else {
      setOpenDropdown(id); // Open the clicked dropdown
    }
  };

  const [allShips, setallShips] = useState([]);
  const [allCat, setallCat] = useState([]);
  const [allSubCat, setallsubCat] = useState([]);
  const [allAm, setallAm] = useState([]);
  const [allImages,setAllImages] = useState([])
  const [selectedShip, setSelectedShip] = useState(null); // State for selected ship

  useEffect(() => {
    async function fetchdata() {
      try {
        const res3 = await axios.get(
          `${config.base_url}/api/HappyMarineShipping/ship_images`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            }
          }
        );
        if (res3.data.status === 200) {
          console.log("Images :",res3);
          setAllImages(res3.data.data.reverse());
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchdata();
  }, [config.base_url]);

  // fetch ship data
  useEffect(() => {
    async function fetchdata() {
      try {
        const res1 = await axios.get(
          `${config.base_url}/api/HappyMarineShipping/viewShip`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (res1.data.status === 200) {
          console.log(res1);
          setallShips(res1.data.data.reverse());
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchdata();
  }, [config.base_url]);

  useEffect(() => {
    async function fetchdata() {
      try {
        const res2 = await axios.get(
          `${config.base_url}/api/HappyMarineShipping/viewCategory`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (res2.data.status === 200) {
          console.log(res2);
          setallCat(res2.data.data.reverse());
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchdata();
  }, [config.base_url]);

  // sub category
  useEffect(() => {
    async function fetchdata() {
      try {
        const res2 = await axios.get(
          `${config.base_url}/api/HappyMarineShipping/viewSubCategory`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (res2.data.status === 200) {
          console.log(res2);
          setallsubCat(res2.data.data.reverse());
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchdata();
  }, [config.base_url]);

  // amenities
  useEffect(() => {
    async function fetchdata() {
      try {
        const res2 = await axios.get(
          `${config.base_url}/api/HappyMarineShipping/viewAmenities`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (res2.data.status === 200) {
          console.log(res2);
          setallAm(res2.data.data.reverse());
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchdata();
  }, [config.base_url]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1200);
      if (window.innerWidth <= 1200) {
        setIsSidebarOpen(false); // Hide sidebar by default on small screens
        setOpenDropdown(false);
      }
    };

    handleResize(); // Call on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle dropdown
  const toggleDropdownprofile = (e) => {
    e.stopPropagation(); // Prevent click event from bubbling
    setIsOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const [hasNotification, setHasNotification] = useState(true);
  const [isOpennoti, setIsOpennoti] = useState(false);
  const toggleDropdownNotification = (e) => {
    e.stopPropagation();
    setIsOpennoti((prev) => !prev);

    // Remove notification dot when opening dropdown
    if (hasNotification) {
      setHasNotification(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpennoti(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);


  const navigate = useNavigate()
  
  const recentShip = allShips.length > 0 ? allShips[0] : null;
  const recentShipImage = allImages.length > 0 ? allImages[0] : null;

  const displayedShip = selectedShip || (allShips.length > 0 ? allShips[0] : null);
  const displayedShipimage = selectedShip || (allImages.length > 0 ? allImages[0] : null);

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Navbar - Full Width, Above Sidebar */}
      <nav className="bg-[#123d5f] p-4 flex items-center shadow-md w-full transition-all duration-300">
        {/* Left Side - Admin Logo & Title */}
        <div className="flex items-center gap-2">
          <img src={adminLogo} className="w-[35px] h-[35px]" alt="Admin Logo" />
          {isSidebarOpen && (
            <h1 className="text-lg font-bold text-white">Admin</h1>
          )}
        </div>

         {/* Menu Button (Moves on Sidebar Toggle) */}
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className={`absolute xm:hidden transition-all duration-300 text-white ${
                    isSidebarOpen ? "left-60" : "left-16"
                  }`}
                >
                  <Menu size={28} />
                </button>

             {/* mobile screen menu button */}
                    <button
                      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                      className={`absolute xm:block hidden transition-all duration-300 text-white ${
                        isSidebarOpen ? "left-32" : "left-16"
                      }`}
                    >
                      <Menu size={28} />
                    </button>

        {/* Admin Profile (Right Side) */}
        <div className="relative ml-auto pr-5 flex items-center gap-20">
          {/* notification */}
          <div className="relative">
            {/* Envelope Icon with Blinking Dot */}
            <div className="cursor-pointer relative" onClick={toggleDropdownNotification}>
              <i className="fa-regular fa-envelope text-[28px] text-gray-500"></i>

              {/* Blinking Notification Dot */}
              {hasNotification && (
                <span className="absolute top-0 right-0 h-3 w-3 bg-red-600 rounded-full animate-ping"></span>
              )}
            </div>

            {/* Notification Dropdown */}
            {isOpennoti && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-48 py-2 origin-top transition-transform duration-300 scale-y-100 opacity-100"
                style={{ transformOrigin: "top" }}
              >
                <ul className="text-gray-700">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Check Notifications
                  </li>
                </ul>
              </div>
            )}
          </div>
          {/* Admin Image */}
          <div>
            <img
              src={admin} // Replace with {admin} if using a variable
              className="rounded-full w-[35px] cursor-pointer"
              alt="admin"
              onClick={toggleDropdownprofile}
            />
            {/* Dropdown */}
            {isOpen && (
              <motion.div
                ref={dropdownRef}
                initial={{ opacity: 0, rotateX: 90, scale: 0.9 }}
                animate={{ opacity: 1, rotateX: 0, scale: 1 }}
                exit={{ opacity: 0, rotateX: 90, scale: 0.9 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-40 py-2 origin-top transform"
              >
                <ul className="text-gray-700">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <Link to={'/admin/profile'}>Profile</Link>
                  </li>
                  <li className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                  <Link to={'/admin'} className="text-red-500"><i class='bx bx-log-out'></i> Logout</Link>
                  </li>
                </ul>
              </motion.div>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar & Content Wrapper */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`${
            isSidebarOpen ? "w-60" : "w-16"
          }  bg-white xl:hidden text-[#8D97AD] shadow-xl transition-all duration-300  max-h-screen `}
        >
          <ul className="mt-10 flex flex-col gap-3 ">
            {/* Dashboard */}
            <li className="px-4 py-2 text-lg  text-[#00c292] border-l-4 border-[#00c292] flex items-center">
              <i className="fa-solid fa-gauge mr-3"></i>
              {isSidebarOpen && <Link to="/admin/dashboard">Dashboard</Link>}
            </li>

            {/* Ship For Sale Dropdown */}
            <li className="px-2  text-lg  flex flex-col  relative">
              <div
                className="flex items-center  justify-between cursor-pointer p-2"
                onClick={() => toggleDropdown(1)} // Toggle Ship For Sale dropdown
              >
                <div className="flex items-center  gap-2 hover:text-[#00c292]">
                  <i className="bx bx-home text-2xl"></i>
                  {isSidebarOpen && <span>Ship For Sale</span>}
                </div>
                {isSidebarOpen && (
                  <i
                    className={`fa-solid ${
                      openDropdown === 1 ? "fa-chevron-up" : "fa-chevron-right"
                    }`}
                  ></i>
                )}
              </div>

              {!isSidebarOpen && openDropdown === 1 && (
                <div className="absolute left-full top-0 bg-white shadow-lg rounded-md py-2 w-56 z-20">
                  <ul>
                    <li className="px-4 py-1 hover:text-[#00c292]">
                      <Link to="/admin/addShip">Add Ships</Link>
                    </li>
                    <li className="px-4 py-1 text-[#8D97AD] hover:text-[#00c292]">
                      <Link to="/admin/viewShip">View Ships</Link>
                    </li>
                  </ul>
                </div>
              )}

              {/* Dropdown Content */}
              {isSidebarOpen && (
                <div
                  className={`ml-6 mt-2 transition-all duration-300 ${
                    openDropdown === 1
                      ? "max-h-40 opacity-100"
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  <ul>
                    <li className="px-4 py-1 hover:text-[#00c292]">
                      <Link to="/admin/addShip">Add Ships</Link>
                    </li>
                    <li className="px-4 text-[#8D97AD] py-1 hover:text-[#00c292]">
                      <Link to="/admin/viewShip">View Ships</Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>

            <li className="px-3 py-2 text-lg flex flex-col relative">
              <div
                className="flex items-center justify-between cursor-pointer p-2"
                onClick={() => toggleDropdown(2)} // Toggle Category dropdown
              >
                <div className="flex items-center hover:text-[#00c292] gap-2">
                  <i className="fa-solid fa-list"></i>
                  {isSidebarOpen && <span>Category</span>}
                </div>
                {isSidebarOpen && (
                  <i
                    className={`fa-solid ${
                      openDropdown === 2 ? "fa-chevron-up" : "fa-chevron-right"
                    }`}
                  ></i>
                )}
              </div>
              {!isSidebarOpen && openDropdown === 2 && (
                <div className="absolute left-full top-0 bg-white shadow-lg rounded-md py-2 w-56 z-20">
                  <ul>
                    <li className="px-1 py-1 w-full hover:text-[#00c292]">
                      <Link to="/admin/addCategory">Add Category</Link>
                    </li>
                    <li className="px-1 py-1 w-full hover:text-[#00c292]">
                      <Link to="/admin/viewCategory">View Category</Link>
                    </li>
                  </ul>
                </div>
              )}

              {/* Dropdown Content */}
              {isSidebarOpen && (
                <div
                  className={`ml-6 mt-2 transition-all duration-300 ${
                    openDropdown === 2
                      ? "max-h-40 opacity-100"
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  <ul>
                    <li className="px-4 py-1 hover:text-[#00c292]">
                      <Link to="/admin/addCategory">Add Category</Link>
                    </li>
                    <li className="px-4 py-1 hover:text-[#00c292]">
                      <Link to="/admin/viewCategory">View Category</Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>

            <li className="px-3 py-2 text-lg flex flex-col relative group ">
              <div
                className="flex items-center justify-between cursor-pointer p-2"
                onClick={() => toggleDropdown(3)} // Toggle Sub Category dropdown
              >
                <div className="flex items-center hover:text-[#00c292] gap-2">
                  <i className="fa-solid fa-list"></i>
                  {isSidebarOpen && <span>Sub Category</span>}
                </div>
                {isSidebarOpen && (
                  <i
                    className={`fa-solid ${
                      openDropdown === 3 ? "fa-chevron-up" : "fa-chevron-right"
                    }`}
                  ></i>
                )}
              </div>

              {!isSidebarOpen && openDropdown === 3 && (
                <div className="absolute left-full top-0 bg-white shadow-lg rounded-md py-2 w-56 z-20">
                  <ul>
                    <li className="px-1 py-1 w-full hover:text-[#00c292]">
                      <Link to="/admin/addsubcategory">Add Sub Category</Link>
                    </li>
                    <li className="px-1 py-1 w-full hover:text-[#00c292]">
                      <Link to="/admin/viewSubCategory">View Sub Category</Link>
                    </li>
                  </ul>
                </div>
              )}

              {/* Dropdown Content */}
              {isSidebarOpen && (
                <div
                  className={`ml-6 mt-2 transition-all duration-300 ${
                    openDropdown === 3
                      ? "max-h-40 opacity-100"
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  <ul>
                    <li className="px-1 py-1 w-full hover:text-[#00c292]">
                      <Link to="/admin/addsubcategory">Add Sub Category</Link>
                    </li>
                    <li className="px-1 py-1 w-full hover:text-[#00c292]">
                      <Link to="/admin/viewSubCategory">View Sub Category</Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>

            <li className="px-3 py-2 text-lg flex flex-col relative group">
              {/* Clickable Div */}
              <div
                className="flex items-center justify-between cursor-pointer p-2 w-full hover:text-[#00c292]"
                onClick={() => toggleDropdown(4)}
              >
                <div className="flex items-center gap-2 w-full">
                  <i className="fa-solid fa-list"></i>
                  {isSidebarOpen && <span>Registrations</span>}
                </div>
                {isSidebarOpen && (
                  <i
                    className={`fa-solid ${
                      openDropdown === 4 ? "fa-chevron-up" : "fa-chevron-right"
                    }`}
                  ></i>
                )}
              </div>

              {!isSidebarOpen && openDropdown === 4 && (
                <div className="absolute left-full top-0 bg-white shadow-lg rounded-md py-2 w-64 z-20">
                  <ul>
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <Link to="/admin/shipforsale">Ship Sale Registration</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <Link to="/admin/shipforCharter">Ship For Charter Registration</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <Link to="/admin/shipforEq">Supply Equipment Registration</Link>
                    </li>
                  </ul>
                </div>
              )}

              {/* Click Dropdown (For open sidebar) */}
              {isSidebarOpen && (
                <div
                  className={`ml-6 mt-2 transition-all duration-300 ${
                    openDropdown === 4
                      ? "max-h-48 opacity-100 "
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  <ul>
                    <li className="px-4 py-1 hover:text-[#00c292]">
                      <Link to="/admin/shipforsale">Ship Sale Registration</Link>
                    </li>
                    <li className="px-4 py-1 hover:text-[#00c292]">
                      <Link to="/admin/shipforCharter">Ship For Charter Registration</Link>
                    </li>
                    <li className="px-4 py-1 hover:text-[#00c292]">
                      <Link to="/admin/shipforEq">Supply Equipment Registration</Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>

            <li className="px-5  cursor-pointer w-full relative hover:text-[#00c292] py-2 text-lg flex items-center">
              <i className="fa-solid fa-gauge mr-2"></i>
              {isSidebarOpen && (
                <Link to={'/admin/amenities'}>Amenities</Link>
              )}
            </li>

            {/* Settings Dropdown */}
            <li className="px-3 py-2 text-lg flex flex-col relative group">
              <div
                className="flex items-center justify-between cursor-pointer p-2 hover:text-[#00c292]"
                onClick={() => toggleDropdown(5)}
              >
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-gear"></i>
                  {isSidebarOpen && <span>Settings</span>}
                </div>
                {isSidebarOpen && (
                  <i
                    className={`fa-solid ${
                      openDropdown === 5 ? "fa-chevron-up" : "fa-chevron-right"
                    }`}
                  ></i>
                )}
              </div>

              {/* Hover Dropdown (Closed Sidebar) */}
              {!isSidebarOpen && openDropdown === 5 && (
                <div className="absolute left-full top-0 bg-white shadow-lg transition-all duration-300 w-40 py-2 rounded-lg z-20">
                  <ul>
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <Link to="/admin/profile">Profile</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100">
                    <Link to={'/admin'} className="text-red-500"><i class='bx bx-log-out'></i> Logout</Link>
                    </li>
                  </ul>
                </div>
              )}

              {/* Click Dropdown (Open Sidebar) */}
              {isSidebarOpen && (
                <div
                  className={`ml-6 mt-2 transition-all duration-300 ${
                    openDropdown === 5
                      ? "max-h-40 opacity-100"
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  <ul>
                    <li className="px-4 py-1 hover:text-[#00c292]">
                      <Link to="/admin/profile">Profile</Link>
                    </li>
                    <li className="px-3 py-1 hover:text-[#00c292]">
                     <Link to={'/admin'} className="text-red-500"><i class='bx bx-log-out'></i> Logout</Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </div>

        {/* mobile screen sidebar */}

        <div
          className={`fixed hidden xl:block h-full bg-white text-[#8D97AD] shadow-xl transition-all duration-300 ${
            isMobile
              ? isSidebarOpen
                ? "w-full translate-x-0" // Open in full width on mobile
                : "-translate-x-full w-0" // Hide sidebar on mobile
              : isSidebarOpen
              ? "w-60 translate-x-0" // Open normally on desktop
              : "w-0" // Hide sidebar on desktop
          }`}
        >
          <ul className="mt-10 flex flex-col gap-3 ">
            {/* Dashboard */}
            <li className={`px-4 py-2 text-lg text-[#00c292] ${
                isSidebarOpen ? "border-l-4 border-[#00c292]" : "border-none"
              }  flex items-center`}>
              {isSidebarOpen && <i className="fa-solid fa-gauge mr-3"></i>}
              {isSidebarOpen && <Link to="/admin/dashboard">Dashboard</Link>}
            </li>

            {/* Ship For Sale Dropdown */}
            <li
              className={`px-2  text-lg  flex flex-col  relative`}
            >
              <div
                className="flex items-center  justify-between cursor-pointer p-2"
                onClick={() => toggleDropdown(1)} // Toggle Ship For Sale dropdown
              >
                <div className="flex items-center  gap-2 hover:text-[#00c292]">
                  {isSidebarOpen && <i className="bx bx-home text-2xl"></i>}
                  {isSidebarOpen && <span>Ship For Sale</span>}
                </div>
                {isSidebarOpen && (
                  <i
                    className={`fa-solid ${
                      openDropdown === 1 ? "fa-chevron-up" : "fa-chevron-right"
                    }`}
                  ></i>
                )}
              </div>

              {!isSidebarOpen && openDropdown === 1 && (
                <div className="absolute left-full top-0 bg-white shadow-lg rounded-md py-2 w-56 z-20">
                  <ul>
                    <li className="px-4 py-1 hover:text-[#00c292]">
                      <Link to="/admin/addShip">Add Ships</Link>
                    </li>
                    <li className="px-4 py-1 text-[#8D97AD] hover:text-[#00c292]">
                      <Link to="/admin/viewShip">View Ships</Link>
                    </li>
                  </ul>
                </div>
              )}

              {/* Dropdown Content */}
              {isSidebarOpen && (
                <div
                  className={`ml-6 mt-2 transition-all duration-300 ${
                    openDropdown === 1
                      ? "max-h-40 opacity-100"
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  <ul>
                    <li className="px-4 py-1 hover:text-[#00c292]">
                      <Link to="/admin/addShip">Add Ships</Link>
                    </li>
                    <li className="px-4 text-[#8D97AD] py-1 hover:text-[#00c292]">
                      <Link to="/admin/viewShip">View Ships</Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>

            <li className="px-3 py-2 text-lg flex flex-col relative">
              <div
                className="flex items-center justify-between cursor-pointer p-2"
                onClick={() => toggleDropdown(2)} // Toggle Category dropdown
              >
                <div className="flex items-center hover:text-[#00c292] gap-2">
                  {isSidebarOpen && <i className="fa-solid fa-list"></i>}
                  {isSidebarOpen && <span>Category</span>}
                </div>
                {isSidebarOpen && (
                  <i
                    className={`fa-solid ${
                      openDropdown === 2 ? "fa-chevron-up" : "fa-chevron-right"
                    }`}
                  ></i>
                )}
              </div>
              {!isSidebarOpen && openDropdown === 2 && (
                <div className="absolute left-full top-0 bg-white shadow-lg rounded-md py-2 w-56 z-20">
                  <ul>
                    <li className="px-1 py-1 w-full hover:text-[#00c292]">
                      <Link to="/admin/addCategory">Add Category</Link>
                    </li>
                    <li className="px-1 py-1 w-full hover:text-[#00c292]">
                      <Link to="/admin/viewCategory">View Category</Link>
                    </li>
                  </ul>
                </div>
              )}

              {/* Dropdown Content */}
              {isSidebarOpen && (
                <div
                  className={`ml-6 mt-2 transition-all duration-300 ${
                    openDropdown === 2
                      ? "max-h-40 opacity-100"
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  <ul>
                    <li className="px-4 py-1 hover:text-[#00c292]">
                      <Link to="/admin/addCategory">Add Category</Link>
                    </li>
                    <li className="px-4 py-1 hover:text-[#00c292]">
                      <Link to="/admin/viewCategory">View Category</Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>

            <li className="px-3 py-2 text-lg flex flex-col relative group ">
              <div
                className="flex items-center justify-between cursor-pointer p-2"
                onClick={() => toggleDropdown(3)} // Toggle Sub Category dropdown
              >
                <div className="flex items-center hover:text-[#00c292] gap-2">
                  {isSidebarOpen && <i className="fa-solid fa-list"></i>}
                  {isSidebarOpen && <span>Sub Category</span>}
                </div>
                {isSidebarOpen && (
                  <i
                    className={`fa-solid ${
                      openDropdown === 3 ? "fa-chevron-up" : "fa-chevron-right"
                    }`}
                  ></i>
                )}
              </div>

              {!isSidebarOpen && openDropdown === 3 && (
                <div className="absolute left-full top-0 bg-white shadow-lg rounded-md py-2 w-56 z-20">
                  <ul>
                    <li className="px-1 py-1 w-full hover:text-[#00c292]">
                      <Link to="/admin/addsubcategory">Add Sub Category</Link>
                    </li>
                    <li className="px-1 py-1 w-full hover:text-[#00c292]">
                      <Link to="/admin/viewSubCategory">View Sub Category</Link>
                    </li>
                  </ul>
                </div>
              )}

              {/* Dropdown Content */}
              {isSidebarOpen && (
                <div
                  className={`ml-6 mt-2 transition-all duration-300 ${
                    openDropdown === 3
                      ? "max-h-40 opacity-100"
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  <ul>
                    <li className="px-1 py-1 w-full hover:text-[#00c292]">
                      <Link to="/admin/addsubcategory">Add Sub Category</Link>
                    </li>
                    <li className="px-1 py-1 w-full hover:text-[#00c292]">
                      <Link to="/admin/viewSubCategory">View Sub Category</Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>

            <li className="px-3 py-2 text-lg flex flex-col relative group">
              {/* Clickable Div */}
              <div
                className="flex items-center justify-between cursor-pointer p-2 w-full hover:text-[#00c292]"
                onClick={() => toggleDropdown(4)}
              >
                <div className="flex items-center gap-2 w-full">
                  {isSidebarOpen && <i className="fa-solid fa-list"></i>}
                  {isSidebarOpen && <span>Registrations</span>}
                </div>
                {isSidebarOpen && (
                  <i
                    className={`fa-solid ${
                      openDropdown === 4 ? "fa-chevron-up" : "fa-chevron-right"
                    }`}
                  ></i>
                )}
              </div>

              {!isSidebarOpen && openDropdown === 4 && (
                <div className="absolute left-full top-0 bg-white shadow-lg rounded-md py-2 w-64 z-20">
                  <ul>
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <Link to="/admin/shipforsale">Ship Sale Registration</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <Link to="/admin/shipforCharter">Ship For Charter Registration</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <Link to="/admin/shipforEq">Supply Equipment Registration</Link>
                    </li>
                  </ul>
                </div>
              )}

              {/* Click Dropdown (For open sidebar) */}
              {isSidebarOpen && (
                <div
                  className={`ml-6 mt-2 transition-all duration-300 ${
                    openDropdown === 4
                      ? "max-h-48 opacity-100 "
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  <ul>
                    <li className="px-4 py-1 hover:text-[#00c292]">
                      <Link to="/admin/shipforsale">Ship Sale Registration</Link>
                    </li>
                    <li className="px-4 py-1 hover:text-[#00c292]">
                      <Link to="/admin/shipforCharter">Ship For Charter Registration</Link>
                    </li>
                    <li className="px-4 py-1 hover:text-[#00c292]">
                      <Link to="/admin/shipforEq">Supply Equipment Registration</Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>

            <li className="px-5  cursor-pointer w-full relative hover:text-[#00c292] py-2 text-lg flex items-center">
              {isSidebarOpen && <i className="fa-solid fa-gauge mr-2"></i>}
              {isSidebarOpen && (
                              <Link to={'/admin/amenities'}>Amenities</Link>
                            )
                            }
            </li>

            {/* Settings Dropdown */}
            <li className="px-3 py-2 text-lg flex flex-col relative group">
              <div
                className="flex items-center justify-between cursor-pointer p-2 hover:text-[#00c292]"
                onClick={() => toggleDropdown(5)}
              >
                <div className="flex items-center gap-2">
                  {isSidebarOpen && <i className="fa-solid fa-gear"></i>}
                  {isSidebarOpen && <span>Settings</span>}
                </div>
                {isSidebarOpen && (
                  <i
                    className={`fa-solid ${
                      openDropdown === 5 ? "fa-chevron-up" : "fa-chevron-right"
                    }`}
                  ></i>
                )}
              </div>

              {/* Hover Dropdown (Closed Sidebar) */}
              {!isSidebarOpen && openDropdown === 5 && (
                <div className="absolute left-full top-0 bg-white shadow-lg transition-all duration-300 w-40 py-2 rounded-lg z-20">
                  <ul>
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <Link to="/admin/profile">Profile</Link>
                    </li>
                    <li className="px-3 py-1 hover:text-[#00c292]">
                     <Link to={'/admin'} className="text-red-500"><i class='bx bx-log-out'></i> Logout</Link>
                    </li>
                  </ul>
                </div>
              )}

              {/* Click Dropdown (Open Sidebar) */}
              {isSidebarOpen && (
                <div
                  className={`ml-6 mt-2 transition-all duration-300 ${
                    openDropdown === 5
                      ? "max-h-40 opacity-100"
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  <ul>
                    <li className="px-4 py-1 hover:text-[#00c292]">
                      <Link to="/admin/profile">Profile</Link>
                    </li>
                    <li className="px-3 py-1 hover:text-[#00c292]">
                     <Link to={'/admin'} className="text-red-500"><i class='bx bx-log-out'></i> Logout</Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto py-4 ">
          <div className="bg-white  shadow-sm text-xl w-full p-5">
          <div className="flex justify-between items-center">
              <h1>Dashboard</h1>
              <div className="flex text-sm gap-2">
               <p>Home</p> <span>/</span>
               <p className="text-[#00c292]">Dashboard</p>
              </div>
            </div>
          </div>
          <div className="p-5 xm:p-2">
        {/* content ship */}
        <div className=" transition-all duration-300 ">
          {/* Add main content here */}
          
          <div className='  2xl:px-0 '><hr className=' border-1 border-[#afe9fd]'/></div>

          <div className="2xl:px-5 2xl:flex-wrap flex gap-10 mt-4">
      {/* Ship List */}
      <div className="w-[340px] px-2 overflow-y-auto xm:w-[100%] xxxm:mb-[50px] XM:mb-[150px] sm:m-auto 2xl:m-auto 2xl:mt-5  h-[400px]">
        <div className="flex justify-between">
          <h1 className="text-xl text-gray-700 font-bold">Ship List</h1>
          <select className="bg-[#f4fcff]">
            <option value="">Today</option>
          </select>
        </div>

        {/* Ship Details List */}
        <div className="2xl:border xm:w-[100%] cursor-pointer 2xl:rounded-lg 2xl:border-[#a3e5fc] 2xl:px-1 2xl:mt-3">
  {allShips.map((itm) => (
    <div
      key={itm.id}
      className={`mt-5 px-1 py-3 xxxm:flex-wrap xxxm:gap-3 rounded-lg flex justify-between items-center ${
        displayedShip?.id === itm.id ? "border-2 border-[#afe9fd]" : "" // Apply border to selected item
      }`}
      onClick={() => setSelectedShip(itm)} // Update selected ship on click
    >
      <div className="flex items-center gap-3">
        <img
          src={
            allImages.find((img) => img.ship === itm.id && img.thumbnail_image)?.thumbnail_image ||
            "fallback-image-url"
          }
          className="w-[45px] h-[45px] border-2 border-green-500 rounded-full"
          alt=""
        />
        <div>
          <h1 className="font-bold">{itm.title}</h1>
        </div>
      </div>
    </div>
  ))}
</div>

      </div>

      {/* Ship Details */}
      <div className="sm:m-auto xxxm:overflow-x-auto xxm:mt-[50px] XM:mt-[200px] xxxm:mt-[150px]">
        <h1 className="font-bold text-xl text-gray-700">Ship Details</h1>
        {displayedShip ? (
          <div className="mt-5 border xxxm:overflow-x-auto shadow-lg border-green-500 px-4 py-3 rounded-lg">
            <div className="flex items-center gap-3">
              <img
                 src={
                  allImages.find((img) => img.ship === displayedShip.id && img.thumbnail_image)?.thumbnail_image || "fallback-image-url"
                }
                className="w-[55px] h-[55px] border-2 border-green-500 rounded-full"
                alt="Ship Thumbnail"
              />
              <div>
                <h1 className="font-bold text-xl">{displayedShip.title}</h1>
              </div>
            </div>

            <div className="mt-10 flex gap-16 flex-wrap sm:gap-3 items-center justify-between">
              <h1 className="font-bold">Ship Type</h1>
              <div className="flex gap-10">
                <h1 className="font-semibold text-gray-700">{displayedShip.vessel_type || "N/A"}</h1>
              </div>
            </div>

            <div className="mt-10 flex gap-16 sm:gap-6 justify-between">
              <h1 className="font-bold">Flag</h1>
              <div className="flex gap-5">
                <p className="text-gray-700">{displayedShip.flag || "N/A"}</p>
              </div>
            </div>

            <div className="mt-10 flex gap-16 sm:gap-6 justify-between">
              <h1 className="font-bold">Built Year</h1>
              <div className="flex gap-5">
                <p className="text-gray-700">{displayedShip.year_built || "N/A"}</p>
              </div>
            </div>

            <div className="mt-10 pr-0 flex sm:gap-6 justify-between">
              <h1 className="font-bold">Short Description</h1>
              <div >
                <p className="text-gray-700 ">{displayedShip.short_description || "No description available"}</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-600 mt-5">No ship data available.</p>
        )}
      </div>

      {/* Calendar Section */}
      <div className="xm:overflow-x-auto 2xl:m-auto lg:m-0">
        <h1 className="font-bold text-xl text-gray-700">Calendar</h1>
        <div className="mt-5 border border-gray-300 rounded-lg p-4 bg-[#f4fcff] shadow">
          <Calendar
            onChange={setDate}
            value={date}
            className="rounded-lg bg-[#f4fcff]"
            showNeighboringMonth={false}
          />
          <p className="mt-4 text-gray-600 text-sm">
            Selected Date: <span className="font-semibold text-gray-800">{date.toDateString()}</span>
          </p>
        </div>
      </div>
    </div>


        </div>

        <div className="flex mt-8 justify-around  xxxm:overflow-x-auto  sm:justify-center   flex-wrap gap-10  items-center">
          {/* ship */}   
              <div onClick={()=>navigate('/admin/viewShip')} className="w-[250px] sm:w-full  py-[10px] bg-[#f97276] shadow-lg items-center cursor-pointer hover:bg-[#ee565b] max-h-screen rounded-lg  ">
                <div className="flex  xxxm:flex-wrap-reverse px-[20px] justify-between items-center">
                  <div className='flex flex-col gap-2'>
                    <p className="text-xl text-white">Ship List</p>
                    <div className='flex gap-4 '>
                      <h1 className='text-white font-bold text-2xl'>{allShips.length}</h1>
                      <div className='flex flex-col'>
                        <i className="fa-duotone font-bold mt-2 text-white fa-solid fa-chart-line"></i>
                        <h1 className='text-white'>+4%</h1>
                        </div>
                    </div>
                    
                    </div>
                  <i className="bx bx-home  border-2 border-gray-200 text-2xl px-3 py-2 rounded-full text-white font-semibold"></i>
                </div>
              </div>
            
           

          {/* cat */}
          
          
              
           
            <div onClick={()=>navigate('/admin/viewCategory')} className="w-[250px] sm:w-full py-[10px] bg-[#46bc62] shadow-lg items-center cursor-pointer hover:bg-[#3d7e4c] max-h-screen rounded-lg  ">
                <div className="flex  xxxm:flex-wrap-reverse px-[20px] justify-between items-center">
                  <div className='flex flex-col gap-2'>
                    <p className="text-xl text-white">Category</p>
                    <div className='flex gap-4 '>
                      <h1 className='text-white font-bold text-2xl'>{allCat.length}</h1>
                      <div className='flex flex-col'>
                        <i className="fa-duotone font-bold mt-2 text-white fa-solid fa-chart-line"></i>
                        <h1 className='text-white'>+.4%</h1>
                        </div>
                    </div>
                    
                    </div>
                  <i className="fa-solid  border-2 border-gray-200 fa-list text-2xl px-3 py-2 rounded-full text-white font-bold"></i>
                </div>
              </div>
          
         

          {/* sub cat */}
          
          
            <div onClick={()=>navigate('/admin/viewSubCategory')} className="w-[250px] sm:w-full py-[10px] bg-[#74b4d1] shadow-lg  items-center cursor-pointer hover:bg-[#3d7f9b] max-h-screen rounded-lg  ">
                <div className="flex px-[20px]  xxxm:flex-wrap-reverse justify-between items-center">
                  <div className='flex flex-col gap-2'>
                    <p className="text-xl text-white">Sub Category</p>
                    <div className='flex gap-4 '>
                      <h1 className='text-white font-bold text-2xl'>{allSubCat.length}</h1>
                      <div className='flex flex-col'>
                        <i className="fa-duotone font-bold mt-2 text-white fa-solid fa-chart-line"></i>
                        <h1 className='text-white'>+.2%</h1>
                        </div>
                    </div>
                    
                    </div>
                    <i className="fa-solid  border-2 border-gray-200 fa-list text-2xl px-3 py-2 rounded-full text-white font-semibold"></i>
                </div>
              </div>
          
         
              {/* amenities */}
            
              <div onClick={()=>navigate('/admin/amenities')} className="w-[250px] sm:w-full py-[10px] bg-[#c58dd7] shadow-lg  items-center cursor-pointer hover:bg-[#c36ae1] max-h-screen rounded-lg  ">
                <div className="flex px-[20px]  xxxm:flex-wrap-reverse justify-between items-center">
                  <div className='flex flex-col gap-2'>
                    <p className="text-xl text-white">Amenities</p>
                    <div className='flex gap-4 '>
                      <h1 className='text-white font-bold text-2xl'>{allAm.length}</h1>
                      <div className='flex flex-col'>
                        <i className="fa-duotone font-bold mt-2 text-white fa-solid fa-chart-line"></i>
                        <h1 className='text-white'>+.5%</h1>
                        </div>
                    </div>
                    
                    </div>
                    <i className="fa-solid  border-2 border-gray-200 fa-gauge text-2xl px-3 py-2 rounded-full text-white font-semibold"></i>
                </div>
              </div>
            
        </div>


        {/* chart */}

        <div className='  xxxm:overflowx-auto overflow-y-hidden mt-10  mb-10 '>
          <EarningsAreaChart  earningsData={earnings} />
          </div>

          </div>
        </div>
      </div>
    </div>
  );
}
