import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AboutUsNav() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [isScrolled, setIsScrolled] = useState(false);

  // Track scrolling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Adjust the value to when you want the effect
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Automatically flip twice on page load
  const handleFlip = () => {
    setIsFlipped(false); // Temporarily set to false
    setTimeout(() => setIsFlipped((prevState) => !prevState), 10); // Reapply the flipped state
  };

  
  return (
    <div>
      <nav>
        <div className="bg-[#123d5f]   border-b border-white">
          <div className="px-[150px] sm:px-[10px]  3xl:px-[40px] py-2 flex justify-between items-center xs:justify-center">
            <h1 className="text-white text-[18px] ">Happy Marine Shipping</h1>
            <div className="flex items-center gap-2 xs:hidden">
              <Link
                to={
                  "whatsapp://send?phone=971503505898&text=Hello%20Happy%20Marine%20Shipping,%20I%20would%20like%20to%20inquire%20about%20your%20services."
                }
                className="text-white flex gap-1 items-center "
              >
                <i className="fa-solid fa-phone me-2"></i>{" "}
                <p className="ssm:hidden">+971 50 350 5898 </p>
              </Link>

              <div className="flex gap-4 items-center px-3 border-l-2 border-white">
                <Link
                  to={"https://www.facebook.com/groups/2708905909353211"}
                  className=" "
                >
                  <i class="fa-brands hover:scale-125 duration-200 hover:text-blue-400  fa-facebook text-2xl text-blue-600"></i>
                </Link>
                <Link to={"https://www.instagram.com/data.marine/?hl=en"}>
                  <i class="fa-brands fa-instagram hover:scale-125 duration-200 hover:text-pink-400 text-2xl text-pink-500"></i>
                </Link>
                <Link
                  target="_blank"
                  to={
                    "https://wa.me/971503505898?text=Hello%20Happy%20Marine%20Shipping,%20I%20would%20like%20to%20inquire%20about%20your%20services."
                  }
                >
                  <i class="fa-brands fa-whatsapp hover:scale-125 duration-200 hover:text-green-400 text-2xl text-green-500"></i>
                </Link>
              </div>
            </div>
          </div>
          <hr className="border-1 border-white -mt-1" />

          <div
           className={` px-[150px] xl:px-5  ssm:px-2  transition-all duration-300 3xl:px-[50px] py-8 flex justify-between items-center relative ${
            isScrolled
              ? "fixe top-0 left-0 w-full bg-white text-[#d1a460] hover:text-blue-500 shadow-md z-50 pointer-events-auto"
              : ""
          }`}
          >
            {/* Menu Icon - Shown only on 2xl screens */}
            <i
              onClick={toggleSidebar}
              className={`bx ${
                isSidebarOpen ? "bx-x" : "bx-menu-alt-left"
              } ml-10 xs:ml-1 hidden ssm:block absolute left-0  text-[40px] cursor-pointer transition-transform duration-300 ${
                isScrolled ? "text-gray-600" : "text-white"
              }`}
            ></i>

            {/* Ship Icon - Centered when screen size is 2xl */}
            <div className="2xl:flex-1 xl:flex flex  justify-center items-center">
                          <Link
                            to={"/"} 
                            className={`xl:absolute xl:mt-2 xl:top-2 xl:left-1/2 xl:-translate-x-1/2 xl:flex xl:justify-center   ${
                              isFlipped ? "flipped" : ""
                            }`}
                          >
                            <i
                              className={`fa-solid fa-ship  text-[40px] cursor-pointer ${
                                isScrolled ? "text-blue-500" : "text-white"
                              }`}
                            ></i>
                          </Link>
                        </div>

            {/* Navigation Links - Hidden on 2xl */}
            <div className="flex flex-wrap xl:mt-10 xl:m-auto justify-center  gap-12 items-center ssm:hidden">
              <Link
                to={"/"}
                className={`text-[#d1a460] text-sm   transition-all duration-300 ${
                  isScrolled ? "hover:text-blue-500" : "hover:text-white"
                }`}
              >
                Home
              </Link>
              <Link
                to={"/shipforsale"}
                className={`text-[#d1a460] text-sm transition-all duration-300 ${
                  isScrolled ? "hover:text-blue-500" : "hover:text-white"
                }`}
              >
                Ship For Sale
              </Link>
              <Link
              to="/shipreadytochart"
                className={`text-[#d1a460] text-sm transition-all duration-300 ${
                  isScrolled ? "hover:text-blue-500" : "hover:text-white"
                }`}
              >
                Ship For Charter
              </Link>
              <Link
                to={"/logistics"}
                className={`text-[#d1a460] text-sm transition-all duration-300 ${
                  isScrolled ? "hover:text-blue-500" : "hover:text-white"
                }`}
              >
                Logistic & Transport
              </Link>
              <Link
              onClick={() => window.location.href = "/about"}
                className={` font-bold  text-lg transition-all duration-300 ${
                  isScrolled ? "text-blue-500" : "text-white"
                }`}
              >
                About Us
              </Link>
              <Link
              to={'/contact'}
                className={`text-[#d1a460] text-sm transition-all duration-300 ${
                  isScrolled ? "hover:text-blue-500" : "hover:text-gray-100"
                }`}
              >
                Contact Us
              </Link>
              <div>
                <Link
                  to={"/regShip"}
                  className="bg-[#d1a460] text-sm transition-all duration-300 text-black hover:bg-[#e8be7f] rounded py-2 px-2"
                >
                  + Register your Ship
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div
              className={`fixed top-0 left-0 h-full bg-gray-100 shadow-lg transform ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              } transition-transform duration-300 z-50 w-[250px]`}
            >
              <div className="p-4">
                <div className="flex justify-between">
                  <h2 className="text-lg font-bold mb-4">Menu</h2>
                  <p onClick={toggleSidebar}>
                    <i className="fa-solid fa-circle-chevron-left text-xl"></i>
                  </p>
                </div>
                <ul className="space-y-4">
                  <li>
                    <Link
                      to="/"
                      className="text-gray-800 hover:text-blue-500 block"
                      onClick={toggleSidebar}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/shipforsale"
                      className="text-gray-800 hover:text-blue-500 block"
                      onClick={toggleSidebar}
                    >
                      Ship For Sale
                    </Link>
                  </li>
                  <li>
                    <Link
                     to="/shipreadytochart"
                      className="text-gray-800 hover:text-blue-500 block"
                      onClick={toggleSidebar}
                    >
                      Ship For Charter
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/logistics"
                      className="text-gray-800 hover:text-blue-300 block"
                      onClick={toggleSidebar}
                    >
                      Logistic & Transport
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      className="text-blue-500 hover:text-blue-500 block"
                      onClick={toggleSidebar}
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="text-gray-800 hover:text-blue-500 block"
                      onClick={toggleSidebar}
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/regShip"}
                      className="bg-[#d1a460] text-black hover:bg-[#af9164] rounded py-2 px-2"
                    >
                      + Register your Ship
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
