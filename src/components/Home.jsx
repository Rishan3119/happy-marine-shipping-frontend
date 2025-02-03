import React, { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import Footer from "./Footer";
import Slider from "react-slick";
import config from "../function/config";
import axios from "axios";
import HomeNav from "./Navbars/HomeNav";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  MessageInput,
  Message,
  TypingIndicator,
  MessageGroup,
} from "@chatscope/chat-ui-kit-react";

export default function Home() {
  const [typing, setTyping] = useState(false);
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");

  const [isSellBoatVisible, setSellBoatVisible] = useState(false);
  const [isSection4Visible, setSection4Visible] = useState(false);
  const [istextRefVisible, setTextRefVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      message: "Hello, I am here to assist you!",
      sender: "chatGPT",
    },
  ]);
  const [isRecording, setIsRecording] = useState(false);

  const API_KEY = process.env.REACT_APP_APIKEY;

  const handleSend = async (message, isVoiceMessage = false) => {
    console.log("API KEY:", API_KEY);
    
    const newMessage = {
      message: message,
      sender: "user",
      sentTime: "just now",
      direction: "outgoing",
      position: "single",
      isVoiceMessage, // Track if the message was sent via voice
    };
  
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setInputText("");
  
    setTyping(true);
  
    // Send message to API and process response
    await processMessageToChatGPT(newMessages, isVoiceMessage);
  };
  
  async function processMessageToChatGPT(chatMessages, isVoiceMessage) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
      return { role, content: messageObject.message };
    });
  
    const systemMessage = {
      role: "system",
      content: "Explain all concepts like you are in  a ship company and you are handling the Happy Marine Shipping website were Happy Marine is a leading provider of ship sale and charter services, committed to facilitating smooth and reliable maritime transactions for clients across the globe.",
    };
  
    const apiRequestBody = {
      store: true,
      model: "gpt-4o-mini",
      messages: [systemMessage, ...apiMessages],
    };
  
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        const botResponse = data.choices[0].message.content;
  
        setMessages((prevMessages) => [
          ...prevMessages,
          { message: botResponse, sender: "ChatGPT" },
        ]);
  
        setTyping(false);
  
        // Speak response **only if the user message was a voice message**
        if (isVoiceMessage) {
          speakResponse(botResponse);
        }
      });
  }
  
  const handleVoiceInput = () => {
    const recognition = new (window.webkitSpeechRecognition || window.SpeechRecognition)();
    
    recognition.lang = "en-US";
    recognition.start();
    setIsRecording(true); // Set mic button to red blinking when recording
  
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      handleSend(transcript, true); // Send message as voice input
    };
  
    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
    };
  
    recognition.onend = () => {
      setIsRecording(false); // Stop blinking effect when recording stops
    };
  };
  
  let speechInstance = null; // Store the current speech instance

const speakResponse = (text) => {
  // Stop any ongoing speech before starting a new one
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }

  speechInstance = new SpeechSynthesisUtterance();
  speechInstance.text = text;
  speechInstance.lang = "en-US";
  speechInstance.volume = 1;
  speechInstance.rate = 1;
  speechInstance.pitch = 1;

  window.speechSynthesis.speak(speechInstance);
};

// Function to stop the voice response
const stopVoiceResponse = () => {
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }
};
  const [input, setInput] = useState("");

  // Toggle chatbot visibility
  const toggleChatbot = () => {
    if (isChatOpen) {
      setMessages([
        {
          message: "Hello, I am here to assist you!",
          sender: "chatGPT",
        },
      ]);
    }
    setIsChatOpen(!isChatOpen);
    stopVoiceResponse(true)
  };

  // Handle sending message
  const sellBoatRef = useRef(null);
  const section4Ref = useRef(null);
  const textRef = useRef(null);

  const { id } = useParams();

  // Generic observer hook for resetting animation state
  const useIntersectionObserver = (ref, setVisible) => {
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setVisible(entry.isIntersecting); // Update visibility based on intersection
        },
        { threshold: 0.2 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }, [ref, setVisible]);
  };

  // Use observer for both sections
  useIntersectionObserver(sellBoatRef, setSellBoatVisible);
  useIntersectionObserver(section4Ref, setSection4Visible);
  useIntersectionObserver(textRef, setTextRefVisible);

  // carousel customer
  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 w-[50px] h-[50px] rounded-full shadow-lg"
    >
      <i class="fa-solid fa-chevron-right"></i>
    </button>
  );

  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute z-10 -left-8 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 w-[50px] h-[50px] rounded-full shadow-lg"
    >
      <i className="fa-solid fa-chevron-left"></i>
    </button>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // From 1024px, show 3 slides
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 717, // From 717px, show 2 slides
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // From 480px, show 1 slide
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const [currentSlideShip, setCurrentSlideShip] = useState(0);
  const [isLastSlide, setIsLastSlide] = useState(false); // Track if it's the last slide
  const ShipsliderRef = useRef(null);

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

  // Scroll to the top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [allShips, setallShips] = useState([]);

  const ship = {
    infinite: allShips.length > 1, // Enable infinite scroll only if there are more than 1 cards
    speed: 800,
    slidesToShow: Math.min(4, allShips.length), // Show fewer slides if there are not enough cards
    slidesToScroll: 1,
    spaceBetween: 5,
    autoplay: true,
    arrows: true,
    dots: false, // Show dots only if there is more than 1 card
    focusOnSelect: true,
    beforeChange: (current, next) => {
      setCurrentSlideShip(next);
    },
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: Math.min(4, allShips.length),
        },
      },
      {
        breakpoint: 1143,
        settings: {
          slidesToShow: Math.min(3, allShips.length),
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: Math.min(2, allShips.length),
        },
      },
      {
        breakpoint: 654,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    afterChange: (index) => {
      setCurrentSlideShip(index);
      if (index === allShips.length - 1) {
        setIsLastSlide(true);
      } else {
        setIsLastSlide(false);
      }
    },
  };

  const [count, setCount] = useState(0);

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
  }, [config.base_url, count]);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <div>
      <div className="">
        <HomeNav />

        <div className="relative h-[500px] xm:h-[400px] w-full overflow-hidden bg-gradient-to-r from-[#2e5775] to-[#326e99]">
          {/* Background Video */}
          <video
            className="absolute top-0 left-0 h-[500px] w-full object-cover  xm:hidden"
            src="/IMG_2408.MP4"
            autoPlay
            loop
            muted
          ></video>

          {/* Background Image for xm screens */}
          <div className="absolute top-0 left-0 h-[500px] w-full   hidden  xm:block image"></div>

          {/* Content Overlay */}
          <div className="relative z-10 flex h-[500px] w-full items-center justify-center bg-black bg-opacity-50 py-[50px] lg:py-10 px-3 xm:py-5 xxxm:px-3">
            <div>
              <h1 className="text-6xl font-bold text-white lg:text-4xl text-center xm:text-[25px] xxm:text-[20px] xxxm:text-[15px]  xm:-mt-14">
                Ship For Sale And Purchase
              </h1>
              <p className="text-white mt-5 text-center xxm:text-[15px]">
                We are the direct bridge between the owners and charters
              </p>
            </div>
          </div>
        </div>

        <section className="bg-gradient-to-r from-[#2e5775] to-[#326e99]">
          <div className="py-[30px] px-[150px] xl:px-10 xxm:px-3">
            <h1 className="text-white text-center font-bold text-[30px]">
              Ships For Sale
            </h1>

            <div className="cards-main mt-5 relative testimonial-carousel">
              <div className="testimonial-slide mt-10 py-5 relative">
                <Slider ref={ShipsliderRef} {...ship}>
                  {allShips.map((card, index) => (
                    <div key={index} className="py-[30px]">
                      <div className="w-[280px] h-[350px] bg-gray-100 overflow-hidden  transition-all rounded-lg border border-white cursor-pointer mx-auto">
                        <div>
                          <img
                            onClick={() => {
                              navigate(`/singleShip/${card.id}`);
                            }}
                            className="w-[280px] rounded-t-lg h-[200px]"
                            src={card.image}
                            alt={card.title}
                          />
                        </div>
                        <div className="px-2 py-3 mt-2">
                          <h1 className="font-bold">
                            {card.short_description}
                          </h1>
                          <h1 className="mt-2">{card.year}</h1>
                        </div>
                        <div className="px-2 py-3 -mt-3 flex gap-3 absolute bottom-10">
                          <button
                            onClick={() => {
                              navigate(`/singleShip/${card.id}`);
                            }}
                            className="bg-[#123d5f] hover:bg-[#172f41ed] text-white rounded-sm px-2 py-1"
                          >
                            View More
                          </button>
                          <Link
                            to={
                              "https://wa.me/971503505898?text=Hello%20Happy%20Marine%20Shipping,%20I%20would%20like%20to%20inquire%20about%20your%20services."
                            }
                            className="bg-white border hover:bg-green-500 hover:border-none hover:text-white border-[#123d5f] rounded-sm px-2 py-1"
                          >
                            Enquiry Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>

              {/* Show Explore More button after the last slide */}

              <div className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2">
                <button
                  onClick={() => navigate("/shipforsale")}
                  className="bg-[#123d5f] text-white rounded-full px-4 py-2 hover:bg-[#0d2437] transition"
                >
                  Explore More
                </button>
              </div>
            </div>
          </div>

          {/* Sell Boat Section */}
          <div className="sellboat mt-10 max-h-screen" ref={sellBoatRef}>
            <div className="z-10 flex h-[80vh] w-full items-center justify-center bg-black bg-opacity-80 py-[50px] lg:py-10 px-4">
              <div>
                <h1
                  className={`text-[70px]  lg:text-[55px] Lg:text-[45px] lg:w-[70%] Lg:w-[100%] xm:text-[30px] xxxm:text-[25px] heading-text w-[60%] m-auto text-center font-bold text-gray-50 ${
                    isSellBoatVisible
                      ? "animate-fade-in animation-delay-100"
                      : ""
                  }`}
                >
                  "Happy Marine: Unlocking New Horizons with Tailored Ship Sales
                  & Charters"
                </h1>
                <p
                  className={`text-gray-50 w-[72%] lg:w-[80%] xm:w-[100%] m-auto mt-5 text-center ${
                    isSellBoatVisible
                      ? "animate-fade-in animation-delay-300"
                      : ""
                  }`}
                >
                  With a commitment to safety, efficiency, and top-notch
                  service, we ensure a seamless experience from booking to
                  completion. Choose Happy Marine for your next venture and set
                  sail with confidence!
                </p>
                <div className="flex justify-center gap-5 items-center mt-10 flex-wrap">
                  <Link
                    to={
                      "whatsapp://send?phone=971503505898&text=Hello%20Happy%20Marine%20Shipping,%20I%20would%20like%20to%20inquire%20about%20your%20services."
                    }
                    className="bg-gray-800 text-gray-50 px-3 py-2 rounded hover:shadow-sm hover:shadow-gray-400 hover:scale-110 duration-300"
                  >
                    <i className="fa-solid fa-phone me-2"></i>+971 50 350 5898
                  </Link>
                  <Link
                    to={"mailto:admin@happymarine.ae"}
                    className="bg-gray-800 text-gray-50 px-3 py-2 rounded hover:shadow-sm hover:shadow-gray-400 hover:scale-110 duration-300"
                  >
                    <i className="fa-solid fa-envelope me-2"></i>{" "}
                    admin@happymarine.ae
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className=" bg-[#fff] py-[50px] section-4 overflow-hidden"
          ref={section4Ref}
        >
          <div className="roboto-text px-3">
            <h1
              className={`text-center text-[34px] font-bold ${
                isSection4Visible
                  ? "animate-slide-in-left animation-delay-100"
                  : "translate-x-[-100%]"
              }`}
            >
              Why Choose Happy Marine
            </h1>
            <p
              className={`text-center w-[50%] xl:w-[65%] lg:w-[75%] md:w-[85%] sm:w-[100%]  m-auto mt-3 ${
                isSection4Visible
                  ? "animate-slide-in-right animation-delay-300"
                  : "translate-x-[100%]"
              }`}
            >
              Our commitment to sustainability means we prioritize eco-friendly
              practices and promote vessels that adhere to modern environmental
              standards.
            </p>
          </div>

          <div className="px-[150px] py-[20px] mt-5 flex gap-10 items-center 2xl:flex-wrap 2xl:px-10 xl:px-8">
            {/* div 1 */}
            <div className="w-[450px]  m-auto  border border-gray-200 rounded-lg shadow-xl shadow-gray-100 p-5">
              <div>
                <div className="bg-[#7167FF1A] m-auto rounded-full p-4 w-[75px] h-[75px]">
                  <i class="fa-solid fa-users text-[40px] text-center text-black"></i>
                </div>
                <h1 className="text-center mt-4 text-[#123D5F] text-xl font-bold">
                  Expertise you Can Trust
                </h1>

                <p
                  ref={textRef}
                  className={`text-center mt-3 text-[#797896]  m-auto ${
                    istextRefVisible
                      ? "animate-fade-in animation-delay-100"
                      : ""
                  }`}
                >
                  With years of experience in the maritime industry, Happy
                  Marine has the knowledge and resources to provide dependable
                  ship sales and charter solutions tailored to your needs.
                </p>
              </div>
            </div>
            {/* div 2 */}
            <div className="w-[450px]  m-auto border border-gray-200 rounded-lg shadow-xl shadow-gray-100 p-5">
              <div>
                <div className="bg-[#7167FF1A] m-auto rounded-full p-4 w-[75px] h-[75px]">
                  <i class="fa-solid fa-ship text-center text-[40px] text-black"></i>
                </div>
                <h1 className="text-center mt-4 text-[#123D5F] text-xl font-bold">
                  Diverse Fleet Options
                </h1>

                <p
                  ref={textRef}
                  className={`text-center mt-3 text-[#797896]  m-auto ${
                    istextRefVisible
                      ? "animate-fade-in animation-delay-100"
                      : ""
                  }`}
                >
                  Travellers security: Our angel team members will constantly be
                  available to guide and support you irrespective of where you
                  are, for us our clients safety is of utmost priority.
                </p>
              </div>
            </div>
            {/* div 3 */}
            <div className="w-[450px]  m-auto border border-gray-200 rounded-lg shadow-xl shadow-gray-100 p-5">
              <div>
                <div className="bg-[#FFB6091A] m-auto rounded-full p-4 w-[75px] h-[75px]">
                  <i class="fa-solid fa-shield-halved text-center text-[40px] text-black"></i>
                </div>
                <h1 className="text-center mt-4 text-[#123D5F] text-xl font-bold">
                  Commitment to Quality & Safety
                </h1>

                <p
                  ref={textRef}
                  className={`text-center mt-3 text-[#797896]  m-auto ${
                    istextRefVisible
                      ? "animate-fade-in animation-delay-100"
                      : ""
                  }`}
                >
                  We maintain rigorous standards for quality, safety, and
                  compliance, so you can have peace of mind knowing your vessel
                  meets the highest industry standards.
                </p>
              </div>
            </div>
          </div>

          {/* customers review */}
          <div className="px-[150px] py-[30px] mt-10 2xl:px-10  lg:px-6">
            <div>
              <h1 className=" text-[34px] font-bold text-center xm:text-[25px]">
                Our Customers Say
              </h1>
            </div>

            <div className="testimonial-carousel mt-10 py-5 relative">
              <Slider className="" {...settings}>
                {/* Item 1 */}
                <div className="testimonial-slide w-[366px] h-[250px] overflow-auto xl:max-h-screen bg-gradient-to-b from-pink-200 via-white to-white border border-gray-200 rounded-lg shadow-xl shadow-gray-100 p-5">
                  <h1 className="text-center mt-4 text-black text-xl font-bold">
                    Fathima M
                  </h1>
                  <p className="text-center mt-3 text-black m-auto">
                    <i className="fa-solid fa-quote-left pe-2"></i>
                    "The level of professionalism and commitment to quality at
                    Happy Marine is impressive. Their charter services were
                    exactly what we needed for our time-sensitive project.
                    Fantastic experience!"
                  </p>
                </div>

                {/* Item 2 */}
                <div className="testimonial-slide w-[366px] h-[250px] overflow-auto  xl:max-h-screen bg-gradient-to-b from-cyan-100 via-white to-white border border-gray-200 rounded-lg shadow-xl shadow-gray-100 p-5">
                  <h1 className="text-center mt-4 text-black text-xl font-bold">
                    John D
                  </h1>
                  <p className="text-center mt-3 text-black m-auto">
                    <i className="fa-solid fa-quote-left pe-2"></i>
                    "From start to finish, the Happy Marine team was
                    outstanding. They understood our unique requirements and
                    matched us with the perfect ship. We couldn’t be happier
                    with their service!"
                  </p>
                </div>

                {/* Item 3 */}
                <div className="testimonial-slide w-[366px] h-[250px] overflow-auto  xl:max-h-screen bg-gradient-to-b from-orange-200 via-white to-white border border-gray-200 rounded-lg shadow-xl shadow-gray-100 p-5">
                  <h1 className="text-center mt-4 text-black text-xl font-bold">
                    Sarah A
                  </h1>
                  <p className="text-center mt-3 text-black m-auto">
                    <i className="fa-solid fa-quote-left pe-2"></i>
                    "Happy Marine made our ship charter process seamless. Their
                    team was attentive, knowledgeable, and handled every detail,
                    allowing us to focus on our operations."
                  </p>
                </div>

                {/* Item 4 */}
                <div className="testimonial-slide w-[366px] h-[250px] overflow-auto  xl:max-h-screen bg-gradient-to-b from-gray-300 via-white to-white border border-gray-200 rounded-lg shadow-xl shadow-gray-100 p-5">
                  <h1 className="text-center mt-4 text-black text-xl font-bold">
                    Michael B
                  </h1>
                  <p className="text-center mt-3 text-black m-auto">
                    <i className="fa-solid fa-quote-left pe-2"></i>
                    "Purchasing a vessel through Happy Marine was a smooth
                    experience. They provided all the information we needed and
                    were transparent throughout. Excellent service and support!"
                  </p>
                </div>
              </Slider>
            </div>
          </div>
        </section>

        {/* Go to Top Button */}
        {isScrolled && (
          <div className="fixed bottom-16 right-8 z-50">
            <div
              className="back-to-top px-4 hover:bg-[#615d91]"
              onClick={scrollToTop}
            >
              <i className="fa-solid fa-arrow-up text-2xl"></i>
            </div>
          </div>
        )}

        {/* Chatbot Icon */}
        {!isChatOpen && (
          <div className="fixed bottom-6 right-5 z-50">
            <div
              className="bg-[#123d5f] text-white px-3 py-2 rounded-full shadow-lg cursor-pointer hover:bg-blue-600"
              onClick={toggleChatbot}
            >
              <i className="fa-solid fa-message text-2xl"></i>
            </div>
          </div>
        )}

        {/* Chatbox UI */}
        {isChatOpen && (
          <div className="fixed bottom-10 right-10 w-[25%] 2xl:w-[40%] lg:w-[90%] xm:w-[100%] xm:justify-center xm:right-0 xm:left-0 xm:mt-10 h-[90%] shadow-lg border border-gray-300 rounded z-50 flex flex-col bg-white">
            {/* Chat Header */}
            <div className="bg-blue-600 rounded-t text-white  p-4 flex justify-between items-center">
              <span className="font-bold text-xl">Chatbot</span>
              <button onClick={toggleChatbot} className="text-white text-lg">
                ✖
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              {/* Custom Message List */}
              <div className="space-y-4">
                {messages.map((message, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-black"
                      }`}
                    >
                      <p>{message.message}</p>
                    </div>
                  </div>
                ))}
                {typing && (
                  <div className="flex justify-start">
                  <div className="max-w-[70%] py-2 px-3 rounded-full bg-gray-200 text-blue-500 flex items-center justify-center">
  <p className="font-bold typing-dots">
    <i className="fa-solid fa-circle fa-xs"></i>
    <i className="fa-solid fa-circle fa-xs"></i>
    <i className="fa-solid fa-circle fa-xs"></i>
  </p>
</div>

                  </div>
                )}
              </div>
            </div>

            {/* Message Input and Mic Button */}
            <div className="p-4  bg-gray-200 flex items-center gap-3 rounded-b">
              {/* Mic Button */}
              <button
                onClick={handleVoiceInput}
                className={`px-4 py-2 rounded-full  shadow-lg transition-all  
    ${isRecording ? "bg-red-500 animate-pulse" : "bg-white text-black hover:bg-gray-400"}`}
              >
                <i className="fa-solid fa-microphone"></i>
              </button>
              {/* Message Input */}
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-2 border rounded-lg outline-none"
              />

              {/* Send Button */}
              <button
                onClick={() => handleSend(inputText)}
                className="bg-blue-500 text-white px-3 py-2 rounded-full shadow-lg"
              >
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
}
