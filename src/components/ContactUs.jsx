import React, { useEffect, useState } from 'react'

import Footer from './Footer';
import { Link, useLocation } from 'react-router-dom';
import ContactUsNav from './Navbars/ContactUsNav';

export default function ContactUs() {
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
      <ContactUsNav/>

      <section >
        <h1 className='bg-gray-200 text-gray-600 font-bold text-center  text-3xl px-5 py-16'>Contact Us</h1>
        

        <div className='mt-10 px-[100px] lg:px-5 flex xl:flex-wrap 2xl:m-auto  gap-10 py-10'>
          <div className='w-[50%] 2xl:m-auto 2xl:w-[100%]   border shadow-lg border-gray-300 p-5 rounded-lg '>
            <div className='flex gap-4 items-center'>
            <i className="fa-solid fa-location-dot text-2xl text-white  bg-purple-500 px-4 py-2 rounded-full"></i>
            <p className='text-gray-600'>
            302,Al Ansari Building, Dubai,UAE</p>
            </div>
            <Link to={"mailto:admin@happymarine.ae"} className='flex gap-4 mt-5 items-center'>
            <i className="fa-solid fa-envelope text-2xl bg-blue-500  text-white px-3 py-2 rounded-full"></i>
            <p  className='text-gray-600'>
            admin@happymarine.ae</p>
            </Link>
            <Link to={'httpswame971503505898text=Hello%20Happy%20Marine%20Shipping%20I%20would%20like%20to%20inquire%20about%20your%20services.'} className='flex gap-4 mt-5 items-center'>
            <i className="fa-brands fa-whatsapp text-2xl bg-green-500  text-white px-3 py-2 rounded-full"></i>
            <p className='text-gray-600'>
            +971 50 3505898</p>
            </Link>

            <div className="flex gap-5  mt-5 pl-3 ">
                                   <Link to={'https://www.facebook.com/groups/2708905909353211'}>
                                     <i className="fa-brands hover:scale-125 duration-200 hover:text-blue-400 fa-facebook text-2xl text-blue-600"></i>
                                   </Link>
                                   <Link to={'https://www.instagram.com/data.marine/?hl=en'}>
                                     <i className="fa-brands fa-instagram hover:scale-125 duration-200 hover:text-pink-400 text-2xl text-pink-500"></i>
                                   </Link>
                                 </div>
          
          </div>

          <div className="w-[50%] 2xl:w-[100%] 2xl:m-auto text-center border shadow-lg border-gray-300 p-5 rounded-lg">
     <iframe className='w-full h-full' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.255807509094!2d55.328992974969985!3d25.261978829074494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5d722df49f75%3A0x8fbdb0714974a65f!2sHappy%20Marine%20Shipping%20LLC!5e0!3m2!1sen!2sae!4v1728160374591!5m2!1sen!2sae" frameborder="0"></iframe>
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
