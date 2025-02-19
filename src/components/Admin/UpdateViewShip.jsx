import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Menu } from "lucide-react"; // Icon for open/close sidebar
import adminLogo from "./AdminImage/logo-light-icon.png";
import config from "../../function/config";
import axios from "axios";
import admin from "./AdminImage/user3jpeg.jpeg";
import { motion } from "framer-motion";
import { toast } from "react-toastify";


export default function UpdaetViewShip() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1200); // Check screen size

  const [loading,setLoading] = useState('')

  const toggleDropdown = (id) => {
    if (openDropdown === id) {
      setOpenDropdown(null); // Close if clicking the same dropdown
    } else {
      setOpenDropdown(id); // Open the clicked dropdown
    }
  };

  const [allCategory, setallCategory] = useState([]);
  const [count,setCount] = useState(0)

 

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

  

 


  const [allSubCategory, setallSubCategory] = useState([]);
  
  const {id} = useParams()

  const [CategoryTitle,setCategoryTitle] = useState('');
  const [Category,setCategory] = useState('')
  const [SubCategoryDescription,setSubCategoryDescription] = useState('')
    const [Title, setTitle] = useState("");
    const [vesselType, setvesselType] = useState("");
    const [ShortDescription, setShortDescription] = useState("");
    const [Flag, setFlag] = useState("");
    const [YearBuilt, setYearBuilt] = useState("");
    const [Capacity, setCapacity] = useState("");
    const [LOA, setLOA] = useState("");
    const [Class, setClass] = useState("");
    const [GRTNRT, setGRTNRT] = useState("");
    const [Teu, setTeu] = useState("");
    const [Hidden, setHidden] = useState("");
    const [MainEngine, setMainEngine] = useState("");
    const [DWT, setDWT] = useState("");
  
    const [Email, setEmail] = useState("");
    const [MobileNO, setMobileNO] = useState("");
    const [BriefDescription, setBriefDescription] = useState("");
    const [Image, setImage] = useState("");
    const [thumbnailImage, setThumbnailImage] = useState("");
    const [ci,setCi] = useState('')
    const [cImage,setCImage] = useState('')
    
  const navigate = useNavigate()

  // fetch Category  data
  useEffect(() => {
    async function fetchdata() {
      try {
        const res1 = await axios.get(
          `${config.base_url}/api/HappyMarineShipping/single/${id}`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
           
          }
        );
        if (res1.data.status === 200) {
          console.log(res1);
          setTitle(res1.data.data.title)
          setvesselType(res1.data.data.vessel_type)
          setSelectedCategory(res1.data.data.main_category)
          setFlag(res1.data.data.flag)
          setCapacity(res1.data.data.capacity)
          setLOA(res1.data.data.LOA)
          setYearBuilt(res1.data.data.year_built)
          setClass(res1.data.data.Class)
          setGRTNRT(res1.data.data.GRT_NRT)
          setTeu(res1.data.data.Teu)
          setMainEngine(res1.data.data.main_engine)
          setDWT(res1.data.data.DWT)
          setHidden(res1.data.data.hidden_details)
          setShortDescription(res1.data.data.short_description)
          setBriefDescription(res1.data.data.brief_description)
          setCi(res1.data.data.thumbnail_image)
          setCImage(res1.data.data.image)
          
        } else {
          console.log("error");
        }
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
          setallCategory(res2.data.data);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchdata();
  }, [config.base_url, count]);

  const [selectedCategory, setSelectedCategory] = useState(""); // Track selected main category
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res1 = await axios.get(
          `${config.base_url}/api/HappyMarineShipping/viewSubCategory`,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (res1.data.status === 200) {
          console.log(res1)
          setallSubCategory(res1.data.data);
        }

        const res2 = await axios.get(
          `${config.base_url}/api/HappyMarineShipping/viewCategory`,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (res2.data.status === 200) {
          console.log(res2)
          setallCategory(res2.data.data);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
    fetchData();
  }, [config.base_url, count]);



  // Filter subcategories when main category changes
  useEffect(() => {
    if (selectedCategory) {
      const filtered = allSubCategory.filter(
        (sub) => Number(sub.category) === Number(selectedCategory) // Convert both to numbers
      );
      setFilteredSubCategories(filtered);
    } else {
      setFilteredSubCategories([]);
    }
  }, [selectedCategory, allSubCategory]);

  const handleSubmit = async(e)=>{
    e.preventDefault();
   navigate('/admin/viewShip')
    setLoading(true)
    const data = {
        title: Title,
        vessel_type: vesselType,
        short_description: ShortDescription,
        flag: Flag,
        year_built: YearBuilt,
        capacity: Capacity,
        LOA: LOA,
        Class: Class,
        GRT_NRT: GRTNRT,
        Teu: Teu,
        hidden_details: Hidden,
        main_engine: MainEngine,
        DWT: DWT,
        email: Email,
        phone: MobileNO,
        brief_description: BriefDescription,
        image: Image,
        thumbnail_image: thumbnailImage,
        main_category:selectedCategory
      };
    try {
        const response = await axios.put(`${config.base_url}/api/HappyMarineShipping/updateShip/${id}`,data,{
          headers:{
            'Content-Type':'multipart/form-data',
          }
        });
        if(response.data.status===200){
            // navigate('/admin/viewSubCategory')
          console.log(response)
          setLoading(false)
          setCount(id)
          toast.success("Ship Updated Successfully!",{
            autoClose:1500,
            position:'top-right',
            
          });
        }
        else{
            setLoading(false)
          console.log("error1")
          toast.error("Fill the required Fields",{
            autoClose:1500,
            position: "top-right",
          })
        }
        
      } catch (err) {
        setLoading(false)
        console.log("error2",err)
        toast.error("Error",{
          autoClose:2000,
          position: "top-right",
        })
      }
    
}

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
                    Profile
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Logout
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
            <li className="px-5 py-2 text-lg  flex items-center">
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

            <li className="px-3 py-2 text-lg flex flex-col  relative">
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
                    <li className="px-1 py-1 w-full text-[#8D97AD] hover:text-[#00c292]">
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
                    <li className="px-4 py-1 text-[#8D97AD] hover:text-[#00c292]">
                      <Link to="/admin/viewCategory">View Category</Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>

            <li className="px-3 py-2 text-lg flex flex-col  relative group ">
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
                    <li className="px-1 py-1 w-full text-[#8D97AD] hover:text-[#00c292]">
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
                    <li className="px-1 py-1 text-[#8D97AD] w-full hover:text-[#00c292]">
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
                      <Link to="#">Ship For Charter Registration</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <Link to="#">Supply Equipment Registration</Link>
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
                      <Link to="#">Ship For Charter Registration</Link>
                    </li>
                    <li className="px-4 py-1 hover:text-[#00c292]">
                      <Link to="#">Supply Equipment Registration</Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>

            <li className="px-5  cursor-pointer w-full relative hover:text-[#00c292] py-2 text-lg flex items-center">
              <i className="fa-solid fa-gauge mr-2"></i>
              {isSidebarOpen && "Amenities"}
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
                      <Link to="#">Profile</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <Link to="#">Logout</Link>
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
                      <Link to="#">Profile</Link>
                    </li>
                    <li className="px-4 py-1 hover:text-[#00c292]">
                      <Link to="#">Logout</Link>
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
            <li className={`px-2  text-lg  flex flex-col   relative`}>
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

            <li
              className={`px-3 py-2 text-lg flex flex-col   relative`}
            >
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
                    <li className="px-1 py-1 w-full text-[#8D97AD] hover:text-[#00c292]">
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
                    <li className="px-4 py-1 text-[#8D97AD] hover:text-[#00c292]">
                      <Link to="/admin/viewCategory">View Category</Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>

            <li className={`px-3 py-2 text-lg flex flex-col  relative group `}>
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
                    <li className="px-1 py-1 w-full text-[#8D97AD] hover:text-[#00c292]">
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
                    <li className="px-1 py-1 w-full text-[#8D97AD] hover:text-[#00c292]">
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
                      <Link to="#">Ship For Charter Registration</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <Link to="#">Supply Equipment Registration</Link>
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
                      <Link to="#">Ship For Charter Registration</Link>
                    </li>
                    <li className="px-4 py-1 hover:text-[#00c292]">
                      <Link to="#">Supply Equipment Registration</Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>

            <li className="px-5  cursor-pointer w-full relative hover:text-[#00c292] py-2 text-lg flex items-center">
              {isSidebarOpen && <i className="fa-solid fa-gauge mr-2"></i>}
              {isSidebarOpen && "Amenities"}
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
                      <Link to="#">Profile</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <Link to="#">Logout</Link>
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
                      <Link to="#">Profile</Link>
                    </li>
                    <li className="px-4 py-1 hover:text-[#00c292]">
                      <Link to="#">Logout</Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 py-4 overflow-y-auto">
          <div className="bg-white  shadow-sm text-xl w-full p-5">
          <div className="flex justify-between items-center">
              <h1>Edit Ship </h1>
              <div className="flex text-sm gap-2">
               <p>Home</p> <span>/</span>
               <p className="text-[#00c292]">Edit Ship Category</p>
              </div>
            </div>
          </div>
          <div className="w-full py-5 px-4">
          <form className="bg-white  px-5 mt-5 rounded ">
              {/*Title & vessel type */}
              <div className="p-5 flex gap-5 items-center xm:flex-wrap xm:gap-5">
                <div className="flex flex-col gap-1 w-[100%] ">
                  <label htmlFor="Title" className="">
                    Title
                  </label>
                  <input
                    value={Title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter the Ship Title"
                    className="w-full mt-2 rounded border border-gray-400  text-gray-500 p-2"
                    name=""
                    id="Title"
                  />
                </div>
              </div>
              {/* main category and sub category */}
              <div className="p-5 flex xm:flex-wrap gap-5 items-center">
                <div className="w-[50%] xm:w-[100%]">
                  <label htmlFor="MainCategory">Main Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full mt-2 rounded border border-gray-400 p-2 text-[#d1a460]"
                    name="MainCategory"
                    id="MainCategory"
                  >
                    <option disabled value="">
                      Select
                    </option>
                    {allCategory.length === 0 ? (
                      <option value="" disabled>
                        No category Available
                      </option>
                    ) : (
                      allCategory.map((itm) => (
                        <option key={itm.id} value={itm.id}>
                          {itm.category_name}
                        </option>
                      ))
                    )}
                  </select>
                </div>

                {/* Sub Category Dropdown */}
                <div className="w-[50%] xm:w-[100%]">
                  <label htmlFor="SubCategory">Sub Category</label>
                  <select
                    value={vesselType}
                    onChange={(e) => setvesselType(e.target.value)}
                    className="w-full mt-2 rounded border border-gray-400 p-2 text-[#d1a460]"
                    name="SubCategory"
                    id="SubCategory"
                    disabled={!selectedCategory}
                  >
                    <option disabled value="">
                      {selectedCategory?"Select":"Select Main Category First"}
                    </option>
                    {filteredSubCategories.length === 0 ? (
                      <option value="" disabled>
                        No subcategory available
                      </option>
                    ) : (
                      filteredSubCategories.map((itm) => (
                        <option key={itm.id} value={itm.sub_category_name}>
                          {itm.sub_category_name}
                        </option>
                      ))
                    )}
                  </select>
                </div>
              </div>

              {/* flag and Year Built*/}
              <div className="p-5 flex gap-5 items-center xm:flex-wrap">
                <div className="flex flex-col gap-1 w-[50%] xm:w-[100%]">
                  <label htmlFor="Flag" className="">
                    Flag
                  </label>
                  <input
                    placeholder="Enter the Country Name"
                    value={Flag}
                    onChange={(e) => setFlag(e.target.value)}
                    className="w-full mt-2 rounded border border-gray-400  text-gray-500 p-2"
                    name=""
                    id="Flag"
                  />
                </div>

                <div className="flex flex-col gap-1 w-[50%] xm:w-[100%]">
                  <label htmlFor="Capacity" className="">
                    Capacity
                  </label>
                  <input
                    value={Capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    className="w-full mt-2 rounded border border-gray-400  text-gray-500 p-2"
                    placeholder="Enter the Capacity"
                    name=""
                    id="Capacity"
                  />
                </div>
                <div className="flex flex-col gap-1 w-[50%] xm:w-[100%]">
                  <label htmlFor="Length of all" className="">
                    Length of all:LOA(m)
                  </label>
                  <input
                    value={LOA}
                    onChange={(e) => setLOA(e.target.value)}
                    className="w-full mt-2 rounded border border-gray-400  text-gray-500 p-2"
                    name=""
                    id="Length of all"
                    placeholder="Enter LOA"
                  />
                </div>
              </div>

              {/* Year Built */}
              <div className="p-5 ">
                <div className="w-[50%] xm:w-[100%]">
                  <label htmlFor="Year Built" className="">
                    Built(Year)
                  </label>
                  <input
                    placeholder="Enter the Year"
                    value={YearBuilt}
                    onChange={(e) => setYearBuilt(e.target.value)}
                    className="w-full mt-2 rounded border border-gray-400  text-gray-500 p-2"
                    name=""
                    id="Year Built"
                  />
                </div>
              </div>

              <div className="w-full  p-5 ">
                <div>
                  <h1 className="text-xl border-gray-300 border-b">
                    Amenities
                  </h1>
                </div>
              </div>
              {/* class */}
              <div className="p-5  gap-5 grid grid-cols-3 xm:grid-cols-2 xs:grid-cols-1 items-center ">
                <div className="flex flex-col gap-1  xm:w-[100%]">
                  <label htmlFor="Class" className="">
                    Class
                  </label>
                  <input
                    value={Class}
                    onChange={(e) => setClass(e.target.value)}
                    className="w-full mt-2 rounded border border-gray-400  text-gray-500 p-2"
                    placeholder="Enter the Class"
                    name=""
                    id="Class"
                  />
                </div>

                <div className="flex flex-col gap-1  xm:w-[100%]">
                  <label htmlFor="GRT/NRT" className="">
                    GRT/NRT
                  </label>
                  <input
                    value={GRTNRT}
                    onChange={(e) => setGRTNRT(e.target.value)}
                    className="w-full mt-2 rounded border border-gray-400  text-gray-500 p-2"
                    name=""
                    id="GRT/NRT"
                    placeholder="Enter GRT/NRT"
                  />
                </div>

                <div className="flex flex-col gap-1  xm:w-[100%]">
                  <label htmlFor="Teu" className="">
                    Teu
                  </label>
                  <input
                    value={Teu}
                    onChange={(e) => setTeu(e.target.value)}
                    className="w-full mt-2 rounded border border-gray-400  text-gray-500 p-2"
                    name=""
                    id="Teu"
                    placeholder="Enter Teu"
                  />
                </div>

                <div className="flex flex-col gap-1  xm:w-[100%]">
                  <label htmlFor="Main Engine" className="">
                    Main Engine
                  </label>
                  <input
                    value={MainEngine}
                    onChange={(e) => setMainEngine(e.target.value)}
                    className="w-full mt-2 rounded border border-gray-400  text-gray-500 p-2"
                    name=""
                    id="Main Engine"
                    placeholder="Enter Main Engine"
                  />
                </div>
                <div className="flex flex-col gap-1  xm:w-[100%]">
                  <label htmlFor="DWT" className="">
                    DWT
                  </label>
                  <input
                    value={DWT}
                    onChange={(e) => setDWT(e.target.value)}
                    className="w-full mt-2 rounded border border-gray-400  text-gray-500 p-2"
                    name=""
                    id="DWT"
                    placeholder="Enter DWT"
                  />
                </div>
              </div>

              {/*Hidden Details */}
              <div className="p-5 ">
                <div className="flex flex-col gap-1 w-[50%] xm:w-[100%]">
                  <label htmlFor="Hidden" className="">
                    Hidden Details
                  </label>
                  <input
                    value={Hidden}
                    onChange={(e) => setHidden(e.target.value)}
                    className="w-full mt-2 rounded border border-gray-400  text-gray-500 p-2"
                    name=""
                    id="Hidden"
                  />
                </div>
              </div>

              {/* short description */}
              <div className="p-5">
                <label htmlFor="shortDescription" className="">
                  Short Description
                </label>
                <textarea
                  placeholder="Enter Ship Name/Country/Yr Built..."
                  value={ShortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  className="w-full mt-2 rounded border border-gray-400  text-gray-500 p-2"
                  name=""
                  id="shortDescription"
                ></textarea>
              </div>

              {/* Brief Description */}
              <div className="p-5">
                <label htmlFor="Brief Description" className="">
                  Brief Description
                </label>
                <textarea
                  value={BriefDescription}
                  onChange={(e) => setBriefDescription(e.target.value)}
                  rows={5}
                  className="w-full mt-2 rounded border border-gray-400  text-gray-500 p-2"
                  name=""
                  id="Brief Description"
                  placeholder="Write about your ship...."
                ></textarea>
              </div>

              {/* upoad image */}
              <div className="p-5">
                <label htmlFor="Upload Image" className="">
                  Upload Thumbnail Image
                </label>
                <div className='flex flex-col '>
                <img src={ci} alt="ci"   className='w-[200px] h-[100px] mt-3 '/>
                </div>
                <input
                  type="file"
                  onChange={(e) => setThumbnailImage(e.target.files[0])}
                  className="imageInput w-full mt-2 rounded border border-gray-400  text-gray-500 p-2"
                  name=""
                  id="Upload Image"
                />
              </div>

              <div className="p-5">
                <label htmlFor="Upload Image" className="">
                  Upload  Image
                </label>
                <div className='flex flex-col '>
                <img src={cImage} alt="cImage"   className='w-[200px] h-[100px] mt-3 '/>
                </div>
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="imageInput w-full mt-2 rounded border border-gray-400  text-gray-500 p-2"
                  name=""
                  id="Upload Image"
                />
              </div>

              <hr className="text-gray-500 w-full" />
              <div className="p-4">
                <button
                  onClick={(e) => handleSubmit(e)}
                  type="submit"
                  className="bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded"
                >
                  {loading ? (
                    <span className="block w-[16px] h-[16px] border-2 border-b-0 border-white mt-[4px] mb-[4px] rounded-full m-auto animate-spin"></span>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
