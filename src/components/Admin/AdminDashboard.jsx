import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react"; // Icon for open/close sidebar
import adminLogo from './AdminImage/logo-light-icon.png'

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
    {/* Navbar - Full Width, Above Sidebar */}
    <nav className="bg-[#123d5f] p-4 flex items-center shadow-md w-full transition-all duration-300">
        {/* Left Side - Admin Logo & Title */}
        <div className="flex items-center gap-2">
          <img src={adminLogo} className="w-[35px] h-[35px]" alt="Admin Logo" />
          {isSidebarOpen && <h1 className="text-lg font-bold text-white">Admin</h1>}
        </div>

        {/* Menu Button (Moves on Sidebar Toggle) */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`absolute transition-all duration-300 text-white ${
            isSidebarOpen ? "left-60" : "left-16"
          }`}
        >
          <Menu size={28} />
        </button>

        {/* Logout Button (Right Side) */}
        <div className="ml-auto">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Logout
          </button>
        </div>
      </nav>

    {/* Sidebar & Content Wrapper */}
    <div className="flex flex-1">
      {/* Sidebar */}
      <div
      className={` ${
        isSidebarOpen ? "w-60" : "w-16"
      } bg-white text-[#8D97AD] shadow-lg transition-all duration-300 overflow-hidden`}
    >
      <ul className="mt-10 flex flex-col gap-3">
        <li className="px-4 py-2 text-lg text-[#00c292] border-l-4 border-[#00c292] flex items-center">
          <i className="fa-solid fa-gauge mr-3"></i>
          {isSidebarOpen && <Link to="/admin/dashboard">Dashboard</Link>}
        </li>
        
        <li className="px-2 py-2 text-lg flex flex-col ">
          <div className="flex items-center justify-between cursor-pointer  p-2" onClick={() => toggleDropdown(1)}>
            <div className="flex items-center gap-2 hover:text-[#00c292]">
            <i className='bx bx-home text-2xl'></i>
              {isSidebarOpen && <span>Ship For Sale</span>}
            </div>
            {isSidebarOpen && (openDropdown === 1 ?<i className="fa-solid fa-chevron-up"></i> : <i className="fa-solid fa-chevron-right"></i>)}
          </div>
          <div className={`ml-6 mt-2 transition-all duration-300 ${openDropdown === 1 ? "max-h-40 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
            <ul>
            <li className="px-4 py-1 hover:text-[#00c292]"><Link to="#">Add Ships</Link></li>
              <li className="px-4 py-1 hover:text-[#00c292]"><Link to="#">View Ships</Link></li>
              
            </ul>
          </div>
        </li>
        
        <li className="px-3 py-2 text-lg flex flex-col">
          <div className="flex items-center justify-between cursor-pointer  p-2" onClick={() => toggleDropdown(2)}>
            <div className="flex items-center hover:text-[#00c292] gap-2">
              <i className="fa-solid fa-list"></i>
              {isSidebarOpen && <span>Category</span>}
            </div>
            {isSidebarOpen && (openDropdown === 2 ?<i className="fa-solid fa-chevron-up"></i> : <i className="fa-solid fa-chevron-right"></i>)}
          </div>
          <div className={`ml-6 mt-2 transition-all duration-300 ${openDropdown === 2 ? "max-h-40 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
            <ul>
              <li className="px-4 py-1 hover:text-[#00c292]"><Link to="#">Add Category</Link></li>
              <li className="px-4 py-1 hover:text-[#00c292]"><Link to="#">View Category</Link></li>
            </ul>
          </div>
        </li>

        <li className="px-3 py-2 text-lg flex flex-col">
          <div className="flex items-center justify-between cursor-pointer  p-2" onClick={() => toggleDropdown(3)}>
            <div className="flex items-center hover:text-[#00c292] gap-2">
              <i className="fa-solid fa-list"></i>
              {isSidebarOpen && <span>Sub Category</span>}
            </div>
            {isSidebarOpen && (openDropdown === 3 ?<i className="fa-solid fa-chevron-up"></i> : <i className="fa-solid fa-chevron-right"></i>)}
          </div>
          <div className={`ml-6 mt-2 transition-all duration-300 ${openDropdown === 3 ? "max-h-40 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
            <ul>
              <li className="px-1 py-1 w-full hover:text-[#00c292]"><Link to="#">Add Sub Category</Link></li>
              <li className="px-1 py-1 w-full hover:text-[#00c292]"><Link to="#">View Sub Category</Link></li>
            </ul>
          </div>
        </li>

        <li className="px-3 py-2 text-lg flex flex-col">
          <div className="flex items-center justify-between cursor-pointer  p-2" onClick={() => toggleDropdown(4)}>
            <div className="flex items-center hover:text-[#00c292] gap-2">
              <i className="fa-solid fa-list "></i>
              {isSidebarOpen && <span>Registrations</span>}
            </div>
            {isSidebarOpen && (openDropdown === 4 ?<i className="fa-solid fa-chevron-up"></i> : <i className="fa-solid fa-chevron-right"></i>)}
          </div>
          <div className={`ml-6  transition-all duration-300 ${openDropdown === 4 ? "max-h-44 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
            <ul>
              <li className="px-2 py-1 w-full hover:text-[#00c292]"><Link to="#">Ship Sale Registration </Link></li>
              <li className="px-2 py-1 mt-1 w-full hover:text-[#00c292]"><Link to="#">Ship For Charter Registration </Link></li>
              <li className="px-2 w-full mt-1 py-1 hover:text-[#00c292]"><Link to="#">Supply Equipment Registration </Link></li>
            </ul>
          </div>
        </li>

        <li className="px-5 mt-3 cursor-pointer hover:text-[#00c292] py-2 text-lg flex items-center">
          <i className="fa-solid fa-gauge mr-2"></i>
          {isSidebarOpen && "Amenities"}
        </li>

        <li className="px-5 mt-3 cursor-pointer hover:text-[#00c292] py-2 text-lg flex items-center">
          <i className="fa-solid fa-gear mr-2"></i>
          {isSidebarOpen && "Settings"}
        </li>
      </ul>
    </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="bg-white cursor-pointer hover:bg-[#00c2921b] transition-all duration-200 shadow-sm p-5 w-[20%]">
          <h1 className="text-xl ">SHIP LIST</h1>
          <div className="flex mt-4 justify-between items-center">
          <i className='bx bx-home text-blue-500 text-4xl'></i>
          <h1 className="text-3xl text-gray-600">0</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
