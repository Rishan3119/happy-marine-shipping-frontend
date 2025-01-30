import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../Footer";
import config from "../../function/config";
import ShipForSaleNav from "../Navbars/ShipForSaleNav";

export default function CrewBoat() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate()
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

  const [Type, setType] = useState("grid");

  // fetch ship
  const [allShips, setallShips] = useState([]);
  const [input, setInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [refPage, setRefPage] = useState(1);

  // pagination
  const itemsPerPage = 6;

  // Filtering logic based on search input
  const filteredGroups = allShips.filter((group) =>
    group.title.toLowerCase().includes(input.toLowerCase())
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredGroups.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
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
          setallShips(filteredData.reverse());
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchdata();
  }, [config.base_url, input]);

  

  return (
    <div className="">
      <ShipForSaleNav />

      <section className="py-10 bg-gradient-to-r from-[#264861] to-[#326e99] ">
        <h1 className="text-white text-center text-3xl font-bold">CREW BOAT</h1>

        <div className="w-[85%] Lg:w-[90%] border border-white rounded py-10 px-5  m-auto mt-10 ">
          {/* buttons for grid or list and search input */}
          <div className="flex justify-center gap-8 lg:flex-wrap lg:gap-5 items-center">
            <button
              onClick={() => setType("grid")}
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
              onClick={() => setType("list")}
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
                <li className="border-b border-white py-1 text-white font-bold text-[18px] cursor-pointer hover:text-white">
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

            {/* Right: Ship Cards grid type */}
            {Type === "grid" && (
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
                        onClick={()=>navigate(`/singleShip/${card.id}`)}
                          className="w-full rounded-t-lg h-[200px] object-cover"
                          src={card.image}
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
            )}
            {Type === "list" && (
              <div className="overflow-x-auto">
                {/* pagination */}
                <div className=" py-3 flex  gap-3 float-end">
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
                          Crew Boat Ships not Available
                        </td>
                      </tr>
                    ) : (
                      paginatedGroups.map((ship, index) => (
                        <tr key={index} className="border-b">
                          <td onClick={()=>navigate(`/singleShip/${ship.id}`)} className="px-4 py-2 cursor-pointer hover:underline text-[#d1a460]  text-center  border-r border-white">
                            {ship.title}
                          </td>
                          <td  className="px-4 py-2 text-white border-r border-white">
                            <img
                            onClick={()=>navigate(`/singleShip/${ship.id}`)}
                              src={ship.image}
                              alt={ship.title}
                              text-center
                              className="w-full h-30 cursor-pointer object-cover rounded-md"
                            />
                          </td>
                          <td className="px-4 py-2 text-white border-r  text-center border-white">
                            {ship.vessel_type}
                          </td>
                          <td className="px-4 py-2 text-white border-r  text-center border-white">
                            {ship.flag}
                          </td>
                          <td className="px-4 py-2 text-white border-r text-center border-white">
                            {ship.short_description}
                          </td>
                          <td className="px-4 py-2 text-white border-r text-center border-white">
                            {ship.year_built}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
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
