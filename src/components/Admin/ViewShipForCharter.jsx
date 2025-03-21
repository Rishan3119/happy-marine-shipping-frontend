import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react"; // Icon for open/close sidebar
import adminLogo from "./AdminImage/logo-light-icon.png";
import config from "../../function/config";
import axios from "axios";
import admin from "./AdminImage/user3jpeg.jpeg";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function ViewShipForCharter() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(4);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1200); // Check screen size

  const toggleDropdown = (id) => {
    if (openDropdown === id) {
      setOpenDropdown(null); // Close if clicking the same dropdown
    } else {
      setOpenDropdown(id); // Open the clicked dropdown
    }
  };

  const [allShips, setallShips] = useState([]);
  const [allCategory, setallCategory] = useState([]);
  const [allSubCategory, setallSubCategory] = useState([]);
  const [input, setInput] = useState([]);
  const [count, setCount] = useState(0);

 

  // fetch ship data
  useEffect(() => {
    async function fetchdata() {
      try {
        const res1 = await axios.get(
          `${config.base_url}/api/HappyMarineShipping/viewShipForCharter`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            params: {
              short_description: input,
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
  }, [config.base_url, input, count]);

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${config.base_url}/api/HappyMarineShipping/deleteCharter/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status === 200) {
        setCount(id);
        console.log(response);
        toast.success(" Deleted Successfully !", {
          autoClose: 1000,
          position: "top-right",
        });
      } else {
        console.log("error1");
        toast.error("Error", {
          autoClose: 2000,
          position: "top-right",
        });
      }
    } catch (err) {
      console.log("error2", err);
      toast.error("Error", {
        autoClose: 2000,
        position: "top-right",
      });
    }
  };

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

        {/* Admin Profile  (Right Side) */}
        <div className="relative ml-auto pr-5 flex items-center gap-20">
          {/* notification */}
          <div className="relative">
            {/* Envelope Icon with Blinking Dot */}
            <div
              className="cursor-pointer relative"
              onClick={toggleDropdownNotification}
            >
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
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
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
            <li className="px-5 hover:text-[#00c292] cursor-pointer py-2 text-lg  flex items-center">
                          <Link to="/admin/dashboard"><i className="fa-solid fa-gauge mr-3"></i></Link>
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
                    <li className="px-4 py-1 text-[#8D97AD] hover:text-[#00c292]">
                      <Link to="/admin/addShip">Add Ships</Link>
                    </li>
                    <li className="px-4 py-1  hover:text-[#00c292]">
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
                    <li className="px-4 py-1  hover:text-[#00c292]">
                      <Link to="/admin/addShip">Add Ships</Link>
                    </li>
                    <li className="px-4  py-1 hover:text-[#00c292]">
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
                    <li className="px-1 py-1 w-full  hover:text-[#00c292]">
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

            <li className="px-2 py-2 text-lg flex flex-col text-[#00c292] border-l-4 border-[#00c292] relative group">
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
                    <li className="px-4 py-2 text-[#8D97AD] hover:bg-gray-100">
                      <Link to="/admin/shipforsale">
                        Ship Sale Registration
                      </Link>
                    </li>
                    <li className="px-4 py-2  hover:bg-gray-100">
                      <Link to="/admin/shipforCharter">Ship For Charter Registration</Link>
                    </li>
                    <li className="px-4 py-2 text-[#8D97AD] hover:bg-gray-100">
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
                    <li className="px-4 py-1 text-[#8D97AD] hover:text-[#00c292]">
                      <Link to="/admin/shipforsale">
                        Ship Sale Registration
                      </Link>
                    </li>
                    <li className="px-4 py-1  hover:text-[#00c292]">
                      <Link to="/admin/shipforCharter">Ship For Charter Registration</Link>
                    </li>
                    <li className="px-4 py-1 text-[#8D97AD] hover:text-[#00c292]">
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
                    <li className="px-4 py-1 hover:text-[#00c292]">
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
            <li className="px-5 py-2 text-lg  flex items-center">
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
                    <li className="px-4 py-1 text-[#8D97AD] hover:text-[#00c292]">
                      <Link to="/admin/addShip">Add Ships</Link>
                    </li>
                    <li className="px-4 py-1  hover:text-[#00c292]">
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
                    <li className="px-4 py-1 text-[#8D97AD] hover:text-[#00c292]">
                      <Link to="/admin/addShip">Add Ships</Link>
                    </li>
                    <li className="px-4  py-1 hover:text-[#00c292]">
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

            <li
              className={`px-3 py-2 text-lg flex flex-col ${
                isSidebarOpen ? "border-l-4 text-[#00c292]  border-[#00c292]" : "border-none"
              }  relative group`}
            >
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
                    <li className="px-4 py-2 text-[#8D97AD] hover:bg-gray-100">
                      <Link to="/admin/shipforsale">
                        Ship Sale Registration
                      </Link>
                    </li>
                    <li className="px-4 py-2  hover:bg-gray-100">
                      <Link to="/admin/shipforCharter">Ship For Charter Registration</Link>
                    </li>
                    <li className="px-4 py-2 text-[#8D97AD] hover:bg-gray-100">
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
                    <li className="px-4 py-1 text-[#8D97AD] hover:text-[#00c292]">
                      <Link to="/admin/shipforsale">
                        Ship Sale Registration
                      </Link>
                    </li>
                    <li className="px-4 py-1  hover:text-[#00c292]">
                      <Link to="/admin/shipforCharter">Ship For Charter Registration</Link>
                    </li>
                    <li className="px-4 py-1 text-[#8D97AD] hover:text-[#00c292]">
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
                    <li className="px-4 py-1 hover:text-[#00c292]">
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
        <div className="flex-1 overflow-auto py-4">
          <div className="bg-white  shadow-sm text-xl w-full p-5">
            <div className="flex justify-between items-center">
              <h1>View Details</h1>
              <div className="flex text-sm gap-2">
                <p>Home</p> <span>/</span>
                <p className="text-[#00c292]">View Ship For Charter Registration</p>
              </div>
            </div>
          </div>

          <div className="w-full  py-5 px-4">
            <div className="bg-white overflow-auto w-full max-w-full  p-6 mt-5 rounded">
              <div className="py-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Search"
                  className="rounded-lg  sm:w-[50%] w-[20%] p-2 border shadow"
                />
              </div>

              {/* Responsive Table Wrapper */}
              <div className="w-full lg:w-[1500px] shadow-lg rounded-lg overflow-auto">
                <table className=" w-full  bg-white  shadow-lg rounded-lg overflow-auto">
                  <thead className="bg-gray-100 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-center text-gray-600 min-w-[50px]">
                        No
                      </th>
                      <th className="px-4 py-3 text-center text-gray-600 min-w-[200px]">
                        Vessel Type
                      </th>
                      <th className="px-4 py-3 text-left text-gray-600 min-w-[200px]">
                        Short Description
                      </th>
                      <th className="px-4 py-3 text-left text-gray-600 min-w-[200px]">
                        Nationality
                      </th>
                      <th className="px-4 py-3 text-center text-gray-600 min-w-[200px]">
                        Inspection Country
                      </th>
                      <th className="px-4 py-3 text-center text-gray-600 min-w-[200px]">
                        Year Built
                      </th>
                      <th className="px-4 py-3 text-center text-gray-600 min-w-[200px]">
                        Capacity
                      </th>
                     
                      <th className="px-4 py-3 text-center text-gray-600 min-w-[200px]">
                        Price
                      </th>
                      <th className="px-4 py-3 text-center text-gray-600 min-w-[200px]">
                        Buy as Scrap
                      </th>
                      <th className="px-4 py-3 text-center text-gray-600 min-w-[200px]">
                        Brief Details
                      </th>
                      <th className="px-4 py-3 text-center text-gray-600 min-w-[200px]">
                        Email
                      </th>
                      <th className="px-4 py-3 text-center text-gray-600 min-w-[200px]">
                        Mobile
                      </th>
                      <th className="px-4 py-3 text-center text-gray-600 min-w-[200px]">
                        Image
                      </th>
                      <th className="px-4 py-3 text-center text-gray-600 min-w-[200px]">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                      
                  {
                    allShips.length===0?(
                      <tr>
                      <td
                        colSpan="6"
                        className="px-6 text-red-500 text-center py-4"
                      >
                          Unavailable
                      </td>
                    </tr>
                    ):(
                     allShips.map((item,index)=>{
                      return(
                        <tr>
                      <td className="px-6 py-3 text-center text-gray-600 min-w-[50px]">
                        {index + 1}
                      </td>
                      <td className="px-6 py-3 text-center text-gray-600 min-w-[200px]">
                        {item.vessel_type}
                      </td>
                      <td className="px-6 py-3 text-left text-gray-600 min-w-[250px]">
                        {item.short_description}
                      </td>
                      <td className="px-6 py-3 text-left text-gray-600 min-w-[150px]">
                        {item.nationality}
                      </td>
                      <td className="px-6 py-3 text-center text-gray-600 min-w-[150px]">
                        {item.inspection_country}
                      </td>
                      <td className="px-6 py-3 text-center text-gray-600 min-w-[120px]">
                        {item.year_built}
                      </td>
                      <td className="px-6 py-3 text-center text-gray-600 min-w-[120px]">
                        {item.desirable_capacity}
                      </td>
                     
                      <td className="px-6 py-3 text-center text-gray-600 min-w-[120px]">
                        {item.from_price} - {item.to_price}
                      </td>
                      <td className="px-6 py-3 text-center text-gray-600 min-w-[120px]">
                        {item.buy_as_scrap}
                      </td>
                      <td className="px-6 py-3 text-center text-gray-600 min-w-[250px]">
                        {item.brief_description}
                      </td>
                      <td className="px-6 py-3 text-center text-gray-600 min-w-[200px]">
                        {item.email}
                      </td>
                      <td className="px-6 py-3 text-center text-gray-600 min-w-[150px]">
                        {item.phone}
                      </td>
                      <td className="px-6 py-3 text-center text-gray-600 min-w-[180px]">
                      <img
                              src={item.image}
                              className="w-full h-20 object-cover rounded-md"
                              alt=""
                            />
                      </td>
                      <td className="px-6 py-3 text-center text-gray-600 min-w-[120px]">
                      <div className="flex gap-4 sm:gap-8 items-center justify-center">
                              <button
                               onClick={()=>handleDelete(item.id)}
                                className="text-red-500 hover:underline"
                              >
                                <i className="fa-solid fa-trash"></i>
                              </button>
                            </div>
                      </td>
                    </tr>
                      )
                     }) 
                     
                    )
                    
                    
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
