import React, { useEffect, useState } from 'react'
import AboutUsNav from './Navbars/AboutUsNav'
import about from '../images/About.png'
import Footer from './Footer';
import { useLocation } from 'react-router-dom';

export default function AboutUs() {
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
    const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return (
    <div className=' '>
      <AboutUsNav/>

      <section >
        <h1 className='bg-gray-200 text-gray-600 font-bold text-center  text-3xl px-5 py-16'>About Happy Marine</h1>
        <div className='ml-[80px] 2xl:ml-0 p-3 flex lg:flex-wrap gap-4'>
          <div className='-mt-10 2xl:mt-10 2xl:m-auto'>
            <img src={about} className='w-[400px] h-[500px] 2xl:w-auto 2xl:h-auto' alt="" />
          </div>

          <div className='w-[70%] 2xl:w-[100%] p-3'>
            <h1 className='text-black font-bold text-3xl mt-14'>Who We Are</h1>

            <p className='mt-5 leading-relaxed'>Happy Marine is a leading provider of ship sale and charter services, committed to facilitating smooth and reliable maritime transactions for clients across the globe. With an extensive fleet of vessels and a reputation for excellence, we offer tailored solutions to meet the diverse needs of various industries, including shipping, logistics, offshore energy, and more.</p>

            <p className='mt-5 leading-relaxed'>Our primary focus is ensuring that our clients have access to the right vessels, whether through purchase or charter, allowing them to achieve success in their marine operations. Backed by a team of industry experts, we offer professional, transparent, and customer-oriented services that prioritize safety, efficiency, and sustainability.</p>

            <p className='mt-5 leading-relaxed'>At Happy Marine, sustainability is a core part of our mission. We understand the importance of responsible maritime operations and are dedicated to minimizing the environmental impact of our services. We promote eco-friendly practices and ensure that all our vessels meet the latest environmental standards. Through continuous innovation, we aim to reduce our carbon footprint and support global efforts to protect our oceans.</p>
          </div>
        </div>

        <div className='mt-10 px-[100px] lg:px-5 flex xl:flex-wrap 2xl:m-auto  gap-10 py-10'>
          <div className='w-[50%] 2xl:m-auto 2xl:w-[100%]  text-center border shadow-lg border-gray-300 p-5 rounded-lg '>
          <i className="fa-solid fa-eye-low-vision text-3xl text-blue-500  bg-gray-200 p-3 rounded-full"></i>
          <h1 className='text-[#d1a460] text-2xl font-bold mt-4'>Our Vision</h1>
          <p className='mt-4 text-gray-600'>To be recognized as a global leader in the maritime services industry, offering innovative solutions that set new standards for ship sales and charters</p>
          </div>

          <div className='w-[50%] 2xl:w-[100%] 2xl:m-auto text-center border shadow-lg border-gray-300 p-5 rounded-lg '>
          <i className="fa-solid fa-bullseye text-3xl text-green-500 bg-gray-200 px-4 py-3 rounded-full"></i>
          <h1 className='text-[#d1a460] text-2xl font-bold mt-4'>Our Vision</h1>
          <p className='mt-4 text-gray-600'>To deliver world-class ship sale and charter services that empower businesses and individuals to explore new opportunities at sea, with a commitment to excellence, customer satisfaction, and environmental responsibility.</p>
          </div>

        </div>

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


      </section>

      <Footer/>
    </div>
  )
}
