import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div>
        <footer>
             <div className='bg-[#123d5f] '>
                <div className='px-[150px] 3xl:px-[50px] xm:px-[20px] py-[50px] flex justify-between flex-wrap gap-10 xxm:block h-[100%]'>
                     {/* social media */}
                     <div>
                        <h1 className=' text-[#d1a460] text-lg font-semibold px-3 mb-3 '>Social Links</h1>
                     <div className="flex gap-5 items-center px-3 ">
                       <Link to={'https://www.facebook.com/groups/2708905909353211'}>
                         <i className="fa-brands hover:scale-125 duration-200 hover:text-blue-400 fa-facebook text-2xl text-blue-600"></i>
                       </Link>
                       <Link to={'https://www.instagram.com/data.marine/?hl=en'}>
                         <i className="fa-brands fa-instagram hover:scale-125 duration-200 hover:text-pink-400 text-2xl text-pink-500"></i>
                       </Link>
                       <Link
                         target="_blank"
                         to={
                           'https://wa.me/971503505898?text=Hello%20Happy%20Marine%20Shipping,%20I%20would%20like%20to%20inquire%20about%20your%20services.'
                         }
                       >
                         <i className="fa-brands fa-whatsapp hover:scale-125 duration-200 hover:text-green-400 text-2xl text-green-500"></i>
                       </Link>
                     </div>
         
                     </div>
    
                     {/* useful Links */}
                     <div className='xxm:mt-8'>
                     <h1 className=' text-[#d1a460] text-lg font-semibold px-3 mb-3 '>useful Links</h1>
    
                     <div className='px-3 flex flex-col gap-2 text-gray-50'>
                         <Link to={'/'}>Home</Link>
                         <Link to={'/about'}>About</Link>
                         <Link>Contact us</Link>
                     </div>
    
                     </div>
    
                     {/* Our Services */}
                     <div className='xxm:mt-8'>
                     <h1 className=' text-[#d1a460] text-lg font-semibold px-3 mb-3 '>Our Services</h1>
    
                     <div className='px-3 flex flex-col gap-2 text-gray-50'>
                         <Link to={'/shipforsale'}>Ship For Sale</Link>
                         <Link>Ship For Charter</Link>
                         <Link>Supply Equipments</Link>
                     </div>
    
                     </div>
                     
                     {/* Contact */}
                     <div className='xxm:mt-8'>
                     <h1 className=' text-[#d1a460] text-lg font-semibold px-3 mb-3 '>Contact</h1>
    
                     <div className='px-3 flex flex-col gap-2 text-gray-50'>
                     <p className='flex gap-3 items-center'><i className="fa-solid fa-house text-[#d1a460] font-bold"></i>  <h1 >302, Al Ansari Building, Dubai, UAE</h1></p>
                     <p className='flex gap-3 items-center'><i className="fa-solid fa-envelope text-[#d1a460] font-bold"></i>  <h1 >admin@happymarine.ae</h1></p>
                     <p className='flex gap-3 items-center'><i className="fa-solid fa-phone text-[#d1a460] font-bold"></i>  <h1 >+971 50 350 5898</h1></p>
                     </div>
    
                     </div>
    
                </div>
                 <hr className='text-gray-100 w-full ' />
                 <div className='py-5'><h1 className='text-center text-[#d1a460] m-auto'>Copyright © 2024 Happy Marine, All rights reserved.</h1></div>
             </div>
            

             
          </footer>
      
    </div>
  )
}
