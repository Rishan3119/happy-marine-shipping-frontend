import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../Footer";
import config from "../../function/config";
import ShipForSaleNav from "../Navbars/ShipForSaleNav";

export default function CrewBoat() {
  const [isScrolled, setIsScrolled] = useState(false);
      const [Type, setType] = useState("grid");
      const [count,setCount] = useState(0)
      const [input, setInput] = useState("");
      useEffect(() => {
        const handleScroll = () => {
          setIsScrolled(window.scrollY > 50); // Adjust the value to when you want the effect
        };
    
        window.addEventListener("scroll", handleScroll);
    
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, []);
    
      
      // Scroll to the top
      const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      };
      const [allShips, setAllShips] = useState([]);
      const [currentPage, setCurrentPage] = useState(1);
      const [refPage, setRefPage] = useState(1);
      const [loading, setLoading] = useState(true);
      const [allImages, setAllImages] = useState([]);
    
      const navigate = useNavigate();
      const location = useLocation();
    
      // Pagination logic
      const itemsPerPage = 6;
      const searchParams = new URLSearchParams(location.search);
      const pageFromUrl = parseInt(searchParams.get("page")) || 1;
    
      // Filtering logic based on search input
      const filteredGroups = allShips.filter((group) =>
        group.title.toLowerCase().includes(input.toLowerCase())
      );
    
      // Calculate total pages
      const totalPages = Math.ceil(filteredGroups.length / itemsPerPage);
    
      // Set currentPage based on URL and fetch ships accordingly
      useEffect(() => {
        if (pageFromUrl >= 1 && pageFromUrl <= totalPages) {
          setCurrentPage(pageFromUrl);
          setRefPage(pageFromUrl);
        }
      }, [pageFromUrl, totalPages]);
    
      const handleNavigateToSingleShip = (shipId) => {
        navigate(`/singleShip/${shipId}`, { 
          state: { 
            from: location.pathname, 
            page: currentPage // Store current pagination page
          } 
        });
      };
      // Handle page change
      const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
          navigate(`/CrewBoat?page=${page}`); // Update URL first
          setCurrentPage(page);
          setRefPage(page);
        }
      };
    
      // Paginated data
      const startIndex = (currentPage - 1) * itemsPerPage;
      const paginatedGroups = filteredGroups.slice(
        startIndex,
        startIndex + itemsPerPage
      );

  useEffect(() => {
    async function fetchdata() {
      try {
        const res1 = await axios.get(
          `${config.base_url}/api/HappyMarineShipping/viewShip`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            params: {
              title: input, // Pass input as a query parameter if required
            },
          }
        );

        if (res1.data.status === 200) {
          console.log(res1);
          console.log(input);

          let filteredData = res1.data.data;

          // Filter ships based on vessel_type
          filteredData = filteredData.filter(
            (ship) => ship.vessel_type === "Crew Boat"
          );

          // Reset page to 1 if fewer than 7 items
          if (filteredData.length < 7) {
            setCurrentPage(1);
          }

          // Reset page to reference page if input is empty
          if (input === "") {
            setCurrentPage(refPage);
          }

          // Update state with filtered data
          setAllShips(filteredData.reverse());
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchdata();
  }, [config.base_url, input, currentPage, refPage]);

 // Fetch images for ships
 useEffect(() => {
  async function fetchImages() {
    try {
      const res3 = await axios.get(`${config.base_url}/api/HappyMarineShipping/ship_images`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res3.data.status === 200) {
        setAllImages(res3.data.data);
      } else {
        console.log("Error fetching images");
      }
    } catch (error) {
      console.log(error);
    }
  }

  fetchImages();
}, [config.base_url, input, count]);

// Scroll to top on page change
const { pathname } = useLocation();
useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, [pathname]);

// Loading state
useEffect(() => {
  const fetchShips = async () => {
    try {
      setLoading(true); // Start loading
      const response = await fetch("API_ENDPOINT"); // Replace with your API
      const data = await response.json();
      setAllShips(data);
    } catch (error) {
      console.error("Error fetching ships:", error);
    } finally {
      setLoading(false); // Stop loading after fetch
    }
  };

  fetchShips();
}, []);

  

  return (
    <div className="">
      <ShipForSaleNav />

      <section className="py-10 bg-gradient-to-r from-[#264861] to-[#326e99] ">
        <h1 className="text-white text-center text-3xl font-bold">CREW BOAT</h1>

        <div className="w-[85%] Lg:w-[90%] border border-white rounded py-10 px-5  m-auto mt-10 ">
          {/* buttons for grid or list and search input */}
          <div className="flex justify-center gap-8 lg:flex-wrap lg:gap-5 items-center">
            <button
              onClick={() => navigate(`/CrewBoat?page=${currentPage}`)}
              className={`${
                Type === "grid"
                  ? "bg-[#d1a460] text-white"
                  : "bg-white text-[#d1a460]"
              } rounded py-1 xm:w-[100%]  text-center px-4`}
            >
              <p className="text-lg">
                {" "}
                <i class="bx bxs-grid-alt"></i> Grid
              </p>
            </button>
            <button
              onClick={() => navigate(`/CrewBoat/list?page=${currentPage}`)}
              className={`${
                Type === "list"
                  ? "bg-[#d1a460] text-white"
                  : "bg-white text-[#d1a460]"
              } rounded py-1 xm:w-[100%] px-4  text-center`}
            >
              <p className="text-lg">
                <i class="fa-solid fa-bars"></i> List
              </p>
            </button>

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              className="bg-white xm:w-[100%] border border-[#d1a460] px-2 rounded py-1"
              placeholder="Search..."
            />
          </div>

          {/* section details  */}

          <div className="mt-5 flex lg:flex-wrap gap-10 items-start">
            

            {/* Right: Ship Cards grid type */}
            {Type === "grid" && (
              <>
              {/* Left: Types of Ships */}
            <div>
              <h1 className="text-2xl font-semibold text-white">
                Types of Ships
              </h1>
              <ul className="text-[#d1a460] mt-3 py-3 w-[300px] xl:w-[100%] lg:w-[600px] md:w-[500px] ssm:w-[400px] xm:w-[330px] xs:w-[290px]">
                <li className="border-b border-white py-1 text-[16px]   cursor-pointer hover:text-white">
                  <Link
                    to="/shipforsale"
                    className="text-inherit hover:no-underline"
                  >
                    All Ships
                  </Link>
                </li>
                <li className="border-b border-white py-1 text-[18px]  cursor-pointer hover:text-white">
                  <Link to="/Barge" className="text-inherit hover:no-underline">
                    Barge
                  </Link>
                </li>
                <li className="border-b border-white py-1 text-[16px] cursor-pointer hover:text-white">
                  <Link to="/Bulk" className="text-inherit hover:no-underline">
                    Bulk
                  </Link>
                </li>
                <li className="border-b border-white py-1 text-[16px]  cursor-pointer hover:text-white">
                  <Link to="/cargo" className="text-inherit hover:no-underline">
                    Cargo
                  </Link>
                </li>
                <li className="border-b border-white py-1 text-[16px]   cursor-pointer hover:text-white">
                  <Link to="/Container" className="text-inherit hover:no-underline">
                    Container
                  </Link>
                </li>
                <li className="border-b border-white py-1 text-[16px]  cursor-pointer hover:text-white">
                  <Link to="/Fishing" className="text-inherit hover:no-underline">
                    Fishing
                  </Link>
                </li>
                <li className="border-b border-white py-1 text-[16px]  cursor-pointer hover:text-white">
                  <Link to="/Multipurpose" className="text-inherit hover:no-underline">
                    Multipurpose
                  </Link>
                </li>
                <li className="border-b border-white py-1 text-[16px] cursor-pointer hover:text-white">
                  <Link to="/PassengerFerry" className="text-inherit hover:no-underline">
                    Passenger/Ferry
                  </Link>
                </li>
                <li className="border-b border-white py-1 text-[16px]   cursor-pointer hover:text-white">
                  <Link to="/Reefer" className="text-inherit hover:no-underline">
                    Reefer
                  </Link>
                </li>
                <li className="border-b border-white py-1 text-[16px]  cursor-pointer hover:text-white">
                  <Link to="/Roro" className="text-inherit hover:no-underline">
                    Roro
                  </Link>
                </li>
                <li className="border-b border-white py-1 text-[16px]  cursor-pointer hover:text-white">
                  <Link to="/Tanker" className="text-inherit hover:no-underline">
                    Tanker
                  </Link>
                </li>
                <li className="border-b border-white py-1  text-[16px] cursor-pointer hover:text-white">
                  <Link to="/Tug" className="text-inherit hover:no-underline">
                    Tug
                  </Link>
                </li>
                <li className="border-b border-white py-1 text-[16px]  cursor-pointer hover:text-white">
                  <Link to="/Dredger" className="text-inherit hover:no-underline">
                    Dredger
                  </Link>
                </li>
                <li className="border-b border-white py-1 text-[18px]  cursor-pointer hover:text-white">
                  <Link to="/Floating-Crane" className="text-inherit hover:no-underline">
                  Floating-Crane
                  </Link>
                </li>
                <li className="border-b border-white py-1 text-[18px]  cursor-pointer hover:text-white">
                  <Link to="/Landing-Craft" className="text-inherit hover:no-underline">
                    Landing Craft
                  </Link>
                </li>
                <li className="border-b border-white py-1 text-[18px]  cursor-pointer hover:text-white">
                  <Link to="/Yacht" className="text-inherit hover:no-underline">
                    Yacht
                  </Link>
                </li>
                <li className="border-b border-white py-1 text-[16px]  cursor-pointer hover:text-white">
                  <Link to="/SupplyBoat" className="text-inherit hover:no-underline">
                    Supply Boat
                  </Link>
                </li>
                <li className="border-b border-white py-1 text-white  text-[18px] cursor-pointer hover:text-white">
                  <Link to="/CrewBoat" className="text-inherit hover:no-underline">
                    Crew Boat
                  </Link>
                </li>
                <li className="border-b border-white py-1 text-[16px] cursor-pointer hover:text-white">
                  <Link to="/Others" className="text-inherit hover:no-underline">
                    Others
                  </Link>
                </li>
              </ul>
            </div>
                <div className="w-[90%] flex flex-wrap flex-col items-center">
                  {/* Card Grid */}
                  <div
                    className="grid grid-cols-3 gap-5 2xl:grid-cols-2 md:grid-cols-1 mt-10"
                    style={{ minHeight: "800px" }} // Set a consistent minimum height for the grid
                  >
                    {paginatedGroups.length === 0 ? (
                      <div className="col-span-full text-center">
                        <p className="text-xl mt-16 text-red-600">
                          {" "}
                          Crew Boat Ships not Available...
                        </p>
                      </div>
                    ) : (
                      paginatedGroups.map((card, index) => (
                        <div
  
                          key={index}
                          className="w-[270px] h-[350px] md:w-[100%] hover:scale-105 duration-300 bg-gray-100 overflow-hidden transition-all rounded-lg border border-white cursor-pointer relative"
                        >
                          <img
                          onClick={() => handleNavigateToSingleShip(card.id)}
                            className="w-full rounded-t-lg h-[200px] object-cover"
                            src={
                              allImages.find((img) => img.ship === card.id && img.thumbnail_image)?.thumbnail_image || "fallback-image-url"
                            }
                            alt={card.title}
                          />
                          <div className="px-2 py-3 mt-2">
                            <h1 className="font-bold">{card.title}</h1>
                            <h1 className="mt-2">{card.year}</h1>
                          </div>
                          <div className="px-2 py-3 -mt-3 flex gap-3 absolute bottom-0">
                            <button className="bg-[#123d5f] hover:bg-[#172f41ed] text-white rounded-sm px-2 py-1">
                              View More
                            </button>
                            <button className="bg-white border hover:bg-green-500 hover:border-none hover:text-white border-[#123d5f] rounded-sm px-2 py-1">
                              Enquiry Now
                            </button>
                          </div>
                        </div>
                      ))
                    )}
  
                    {/* Add placeholder cards if items are fewer */}
                    {paginatedGroups.length > 0 &&
                      paginatedGroups.length < 9 && // Adjust based on max items per page
                      Array.from({ length: 9 - paginatedGroups.length }).map(
                        (_, index) => (
                          <div
                            key={`placeholder-${index}`}
                            className="w-[270px]  md:w-[100%] bg-transparent"
                          />
                        )
                      )}
                  </div>
  
                  {/* Pagination */}
                  <div className="  flex justify-center items-center gap-3">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      className={`px-4 py-2 bg-[#123d5f] text-white rounded-sm ${
                        currentPage === 1
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-[#172f41ed]"
                      }`}
                      disabled={currentPage === 1}
                    >
                      <i className="fa-solid fa-chevron-left"></i>
                    </button>
  
                    <span className="px-4 py-2 bg-[#d1a460] text-white rounded-sm">
                      {currentPage}
                    </span>
  
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      className={`px-4 py-2 bg-[#0d2c45] text-white rounded-sm ${
                        currentPage === totalPages
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-[#172f41ed]"
                      }`}
                      disabled={currentPage === totalPages}
                    >
                      <i className="fa-solid fa-chevron-right"></i>
                    </button>
                  </div>
  
                  {/* Right side table list */}
                </div>
              </>
             
            )}
            {Type === "list" && (
              <>
               <div>
              <h1 className="text-2xl font-semibold text-white">
                Types of Ships
              </h1>

              <ul className="text-[#d1a460] mt-3 py-3 w-[300px] xl:w-[100%] lg:w-[700px] md:w-[630px] sm:w-[540px]  ssm:w-[480px] xm:w-[330px] xs:w-[290px]">
                <li className="border-b border-white py-1 text-[16px]  font-bold cursor-pointer hover:text-white">
                  <Link
                    to="/shipforsale/list"
                    className="text-inherit hover:no-underline"
                  >
                    All Ships
                  </Link>
                </li>
                <li className="border-b border-white py-1 text-[16px] cursor-pointer hover:text-white">
                  <Link to="/Barge/list" className="text-inherit hover:no-underline">
                    Barge
                  </Link>
                </li>
                <li className="border-b border-white py-1 text-[16px] cursor-pointer hover:text-white">
                  <Link to="/Bulk/list" className="text-inherit hover:no-underline">
                    Bulk
                  </Link>
                </li>
                <li className="border-b border-white py-1 text-[16px] cursor-pointer hover:text-white">
                  <Link to="/cargo/list" className="text-inherit hover:no-underline">
                    Cargo
                  </Link>
                </li>
                <li className="border-b border-white py-1 text-[16px] cursor-pointer hover:text-white">
                  <Link to="/Container/list" className="text-inherit hover:no-underline">
                    Container
                  </Link>
                </li>
                <li className="border-b border-white py-1 text-[16px] cursor-pointer hover:text-white">
                  <Link to="/Fishing/list" className="text-inherit hover:no-underline">
                    Fishing
                  </Link>
                </li>
                <li className="border-b border-white py-1 text-[16px] cursor-pointer hover:text-white">
                  <Link to="/Multipurpose/list" className="text-inherit hover:no-underline">
                    Multipurpose
                  </Link>
                </li>
                <li className="border-b border-white py-1 text-[16px] cursor-pointer hover:text-white">
                  <Link to="/PassengerFerry/list" className="text-inherit hover:no-underline">
                    Passenger/Ferry
                  </Link>
                </li>
                <li className="border-b border-white py-1 text-[16px] cursor-pointer hover:text-white">
                  <Link to="/Reefer/list " className="text-inherit hover:no-underline">
                    Reefer
                  </Link>
                </li>
                <li className="border-b border-white py-1 text-[16px] cursor-pointer hover:text-white">
                  <Link to="/Roro/list" className="text-inherit hover:no-underline">
                    Roro
                  </Link>
                </li>
                <li className="border-b border-white py-1 text-[16px] cursor-pointer hover:text-white">
                  <Link to="/Tanker/list" className="text-inherit hover:no-underline">
                    Tanker
                  </Link>
                </li>
                <li className="border-b border-white py-1 text-[16px] cursor-pointer hover:text-white">
                  <Link to="/Tug/list" className="text-inherit hover:no-underline">
                    Tug
                  </Link>
                </li>
                <li className="border-b border-white py-1 text-[16px] cursor-pointer hover:text-white">
                  <Link to="/Dredger/list" className="text-inherit hover:no-underline">
                    Dredger
                  </Link>
                </li>
                <li className="border-b border-white py-1 text-[16px] cursor-pointer hover:text-white">
                  <Link to="/Floating-Crane/list" className="text-inherit hover:no-underline">
                    Floating Crane
                  </Link>
                </li>
                <li className="border-b border-white py-1 text-[16px] cursor-pointer hover:text-white">
                  <Link to="/Landing-Craft/list" className="text-inherit hover:no-underline">
                    Landing Craft
                  </Link>
                </li>
                <li className="border-b border-white py-1 text-[16px] cursor-pointer hover:text-white">
                  <Link to="/Yacht/list" className="text-inherit hover:no-underline">
                    Yacht
                  </Link>
                </li>
                <li className="border-b border-white py-1 text-[16px] cursor-pointer hover:text-white">
                  <Link to="/SupplyBoat/list" className="text-inherit hover:no-underline">
                    Supply Boat
                  </Link>
                </li>
                <li className="border-b border-white py-1 text-[18px] text-white cursor-pointer hover:text-white">
                  <Link to="/CrewBoat/list" className="text-inherit hover:no-underline">
                    Crew Boat
                  </Link>
                </li>
                <li className="border-b border-white py-1 text-[16px] cursor-pointer hover:text-white">
                  <Link to="/Others/list" className="text-inherit hover:no-underline">
                    Others
                  </Link>
                </li>
              </ul>
            </div>
            <div style={{ minHeight: "800px" }} className="flex overflow-x-auto flex-col m-auto gap-10">
                  <div className="">
                    <table className="2xl:w-[900px] w-full  border border-white">
                      <thead className="bg-[#d1a460] ">
                        <tr>
                          <th className="text-white   border-r border-white w-[200px] py-4">
                            Ship Title
                          </th>
                          <th className="text-white   border-r border-white w-[300px] py-4">
                            Ship Image
                          </th>
                          <th className="text-white   border-r border-white  w-[200px] py-4">
                            Vessel Type
                          </th>
                          <th className="text-white   border-r border-white w-[200px] py-4">
                            Flag
                          </th>
                          <th className="text-white   border-r border-white w-[200px] py-4">
                            Short Description
                          </th>
                          <th className="text-white   border-r border-white w-[140px] py-4">
                            Built Year
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedGroups.length === 0 ? (
                          <tr>
                            <td colSpan="6" className="text-center py-4">
                              No Ships Available
                            </td>
                          </tr>
                        ) : (
                          paginatedGroups.map((ship, index) => (
                            <tr key={index} className="border-b">
                              <td onClick={() => handleNavigateToSingleShip(ship.id)} className="px-4 py-2 text-[#d1a460] cursor-pointer hover:underline  text-center  border-r border-white">
                                {ship.title}
                              </td>
                              <td className="px-4 py-2 text-white border-r border-white">
                                <img
                                onClick={() => handleNavigateToSingleShip(ship.id)}
                                src={
                                  allImages.find(
                                    (img) =>
                                      img.ship === ship.id &&
                                      img.thumbnail_image
                                  )?.thumbnail_image || "fallback-image-url"
                                }
                                  alt={ship.title}
                                  text-center
                                  className="w-full cursor-pointer h-[110px] object-cover rounded-md"
                                />
                              </td>
                              <td className="px-4 py-2 text-white border-r  text-center border-white">
                                {ship.vessel_type || "None"}
                              </td>
                              <td className="px-4 py-2 text-white border-r  text-center border-white">
                                {ship.flag || "None"}
                              </td>
                              <td className="px-4 py-2 text-white border-r text-center border-white">
                                {ship.short_description || "None"}
                              </td>
                              <td className="px-4 py-2 text-white border-r text-center border-white">
                                {ship.year_built || "None"}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
  
                  {/* pagination */}
             <div className=" py-5 flex justify-center gap-3 ">
                      <button
                        onClick={() => {
                          handlePageChange(currentPage - 1);
                        }}
                        className="px-3 py-1 bg-[#123d5f] hover:bg-[#172f41ed] text-white rounded-sm"
                        disabled={currentPage === 1}
                      >
                        <i class="fa-solid fa-chevron-left"></i>
                      </button>
    
                      <span className="px-3 py-1 bg-[#d1a460] text-white rounded-sm">
                        {currentPage}
                      </span>
    
                      <button
                        onClick={() => {
                          handlePageChange(currentPage + 1);
                        }}
                        className="px-3 py-1 bg-[#0d2c45] hover:bg-[#172f41ed] text-white rounded-sm"
                        disabled={currentPage === totalPages}
                      >
                        <i class="fa-solid fa-chevron-right"></i>
                      </button>
                    </div>
                </div>
              </>
             
            )}
          </div>
        </div>
      </section>

      {/* Go to Top Button */}
      {isScrolled && (
        <div
          className="fixed bottom-16 right-8 z-50 " // Ensure it's in the right position with high z-index
        >
          <div
            className="back-to-top px-4 hover:bg-[#615d91]"
            onClick={scrollToTop}
          >
            <i className="fa-solid fa-arrow-up text-2xl"></i>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
