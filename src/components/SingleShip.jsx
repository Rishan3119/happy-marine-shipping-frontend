import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import config from "../function/config";
import axios from "axios";
import SingleShipNav from "./Navbars/SingleShipNav";
import Footer from "./Footer";

export default function SingleShip() {
  const [obj, setObj] = useState({});

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenS, setIsOpenS] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    async function fetchdata() {
      try {
        const res = await axios.get(
          `${config.base_url}/api/HappyMarineShipping/single/${id}`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (res.data.status === 200) {
          console.log(res);
          setObj(res.data.data);
        } else {
          console.log(res);
        }
      } catch (err) {
        console.log("error2", err);
      }
    }
    fetchdata();
  }, [config.base_url]);

  const [Amenities,setAmenities] = useState([])

  useEffect(() => {
    async function fetchdata() {
      try {
        const res = await axios.get(
          `${config.base_url}/api/HappyMarineShipping/singleAmenity/${id}`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (res.data.status === 200) {
          console.log(res);
          setAmenities(res.data.data);
        } else {
          console.log(res);
        }
      } catch (err) {
        console.log("error2", err);
      }
    }
    fetchdata();
  }, [config.base_url]);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <div className="bg-gradient-to-r from-[#2e5775] to-[#326e99]">
      <SingleShipNav />
      <div className="hidden lg:block p-5 px-10  bg-white">
        <div className="flex justify-between flex-wrap gap-3">
          <h1 className="text-[#d1a460] text-xl font-bold">Ship Details</h1>
          <div>
            <Link to={"/"} className="text-xl text-[#d1a460]">
              Home /{" "}
            </Link>
            <Link to={"/"} className="text-xl text-[#d1a460]">
              {" "}
              Categories /
            </Link>
          </div>
        </div>
      </div>

      <div className="flex gap-3  2xl:block  xm:p-3 mt-[20px] p-10">
        {/* 1st divimage */}
        <div className="w-[70%] 2xl:m-auto xm:w-full 2xl:w-[50%] h-[380px] bg-[#123d5f] border p-2 border-gray-400 ">
          <img src={obj.image} className="w-full h-[360px] " alt="" />
        </div>

        {/* 2nd div description */}
        <div className="w-[60%] 2xl:w-[100%] 2xl:mt-5 border  border-gray-400 bg-[#123d5f] flex flex-col ">
          <div className=" rounded-t ">
            <div>
              <div className="px-3 py-3">
                <div
                  className="flex justify-between items-center bg-[#d1a460] py-3 text-white font-bold text-xl px-4 cursor-pointer"
                  onClick={() => setIsOpenS(!isOpenS)}
                >
                  <h1>Other Informations & Short Descriptions</h1>
                  {isOpenS ? (
                    <i className="fa-solid fa-chevron-up text-xl"></i>
                  ) : (
                    <i className="fa-solid fa-chevron-right text-xl"></i>
                  )}
                </div>
              </div>

              {isOpenS && (
                <div className="px-3 py-3">
                  {/* Short Description */}
                  {obj.short_description && (
                    <div className="flex gap-3 border-b border-gray-300 py-1">
                      <h1 className="font-semibold bg-gray-200 ">
                        Short Description:
                      </h1>
                      <span className="text-[#d1a460]">
                        {obj.short_description}
                      </span>
                    </div>
                  )}

                  {/* Flag and Capacity */}
                  {(obj.flag || obj.capacity) && (
                    <div className="flex justify-between border-b border-gray-300 py-1 mt-3">
                      {obj.flag && (
                        <div className="w-full">
                          <span className="font-semibold bg-gray-200 ">
                            Flag:
                          </span>
                          <span className="text-[#d1a460] ml-2">
                            {obj.flag}
                          </span>
                        </div>
                      )}
                      {obj.capacity && (
                        <div className="w-full">
                          <span className="font-semibold bg-gray-200 ">
                            Capacity:
                          </span>
                          <span className="text-[#d1a460] ml-2">
                            {obj.capacity}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* LOA and Built Year */}
                  {(obj.LOA || obj.year_built) && (
                    <div className="flex justify-between border-b border-gray-300 py-1 mt-3">
                      {obj.LOA && (
                        <div className="w-full">
                          <span className="font-semibold bg-gray-200 ">
                            LOA(m):
                          </span>
                          <span className="text-[#d1a460] ml-2">{obj.LOA}</span>
                        </div>
                      )}
                      {obj.year_built && (
                        <div className="w-full">
                          <span className="font-semibold bg-gray-200 ">
                            Built Year:
                          </span>
                          <span className="text-[#d1a460] ml-2">
                            {obj.year_built}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Class and GRT/NRT */}
                  {Amenities && (
                    <div className="flex justify-between border-b border-gray-300 py-1 mt-3">
                      {Amenities.find(
                        (amenity) => amenity.name === "Class"
                      ) && (
                        <div className="w-full">
                          <span className="font-semibold bg-gray-200">
                            Class:
                          </span>
                          <span className="text-[#d1a460] ml-2">
                            {
                              Amenities.find(
                                (amenity) => amenity.name === "Class"
                              ).value
                            }
                          </span>
                        </div>
                      )}
                      {Amenities.find(
                        (amenity) => amenity.name === "GRT/NRT"
                      ) && (
                        <div className="w-full">
                          <span className="font-semibold bg-gray-200">
                            GRT/NRT:
                          </span>
                          <span className="text-[#d1a460] ml-2">
                            {
                              Amenities.find(
                                (amenity) => amenity.name === "GRT/NRT"
                              ).value
                            }
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Main Engine and DWT */}
                  {Amenities && (
                    <div className="flex justify-between mt-3">
                      {Amenities.find(
                        (amenity) => amenity.name === "Main Engine"
                      ) && (
                        <div className="w-full">
                          <span className="font-semibold bg-gray-200">
                            Main Engine:
                          </span>
                          <span className="text-[#d1a460] ml-2">
                            {
                              Amenities.find(
                                (amenity) => amenity.name === "Main Engine"
                              ).value
                            }
                          </span>
                        </div>
                      )}
                      {Amenities.find((amenity) => amenity.name === "DWT") && (
                        <div className="w-full">
                          <span className="font-semibold bg-gray-200">
                            DWT:
                          </span>
                          <span className="text-[#d1a460] ml-2">
                            {
                              Amenities.find(
                                (amenity) => amenity.name === "DWT"
                              ).value
                            }
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="w-full mt-5">
                    <span
                      onClick={() => navigate(`/shipLoc/${obj.id}`)}
                      className=" text-blue-400 cursor-pointer hover:underline "
                    >
                      Track Location
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className=" px-3 py-3">
            <div className="border border-gray-400">
              {/* Dropdown Header */}
              <div
                className="flex justify-between items-center bg-[#d1a460] py-3 text-white font-bold text-xl px-4 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              >
                <h1>Brief Description</h1>
                {isOpen ? (
                  <i className="fa-solid fa-chevron-up text-xl"></i>
                ) : (
                  <i className="fa-solid fa-chevron-right text-xl"></i>
                )}
              </div>

              {/* Dropdown Content */}
              {isOpen && (
                <div className="text-base text-[#d1a460] p-3">
                  {obj.brief_description ? (
                    obj.brief_description
                      .split("\n") // Split text at newlines
                      .map((detail, index) => (
                        <p key={index} className="mb-2">
                          {detail.trim()}
                        </p>
                      ))
                  ) : (
                    <p className="text-red-500">No description available</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* contact */}
        <div className="w-[30%] 2xl:w-[100%] 2xl:mt-5 h-[420px] border bg-[#123d5f] border-gray-400 rounded">
          <div>
            <h1 className="text-xl p-5 font-semibold border-b text-[#d1a460]  border-gray-400">
              Contact Us
            </h1>
          </div>
          <div className="p-5 flex justify-center gap-3">
            <Link
              to={"tel:+971503505898"}
              className="border w-[50%] rounded hover:bg-gray-50 px-3 py-2 text-center bg-white border-gray-400"
            >
              Call
            </Link>
            <Link
              to={
                "https://wa.me/971503505898?text=Hello%20Happy%20Marine%20Shipping,%20I%20would%20like%20to%20inquire%20about%20your%20services."
              }
              className="border w-[50%] rounded hover:bg-gray-50 px-3 py-2 text-center  bg-white border-gray-400"
            >
              Whatsapp
            </Link>
          </div>
          <div className="px-5 py-1">
            <h1 className=" font-semibold text-xl text-[#d1a460]">
              Contact Info
            </h1>

            <div className="mt-5 flex flex-col gap-5">
              <Link className="flex gap-1 items-center">
                {" "}
                <i className="fa-solid fa-map bg-gray-100 rounded-full text-[#d1a460] p-3 mr-2"></i>{" "}
                <span className="text-white">
                  302,Al Ansari Building, Dubai,UAE
                </span>
              </Link>
              <Link
                to={"mailto:admin@happymarine.ae"}
                className="flex gap-1 items-center"
              >
                {" "}
                <i className="fa-solid text-[#d1a460] fa-envelope bg-gray-100 rounded-full  p-3 mr-2"></i>
                <span className="text-white"> admin@happymarine.ae</span>
              </Link>
              <Link
                to={"tel:+971503505898"}
                className="flex- gap-1 items-center"
              >
                {" "}
                <i className="fa-solid fa-phone text-[#d1a460] bg-gray-100 rounded-full p-3  mr-2"></i>{" "}
                <span className="text-white">+971 50 350 5898</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
