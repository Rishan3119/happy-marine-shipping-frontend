import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { toast } from 'react-toastify';
import config from '../function/config';
import axios from 'axios';
import RegisterPageNav from './Navbars/RegisterPageNav';
import { Phone } from 'lucide-react';

export default function RegisterShip() {

  
const [isScrolled, setIsScrolled] = useState(false);
 useEffect(() => {
        const handleScroll = () => {
          setIsScrolled(window.scrollY > 50); // Adjust the value to when you want the effect
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
      
  // Scroll to the top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
      
        
        const navigate = useNavigate()
        
          

          const [formType, setFormType] = useState("sale"); // Default to "sale"

          const [loading,setLoading] = useState(false)
          const[Title,setTitle] = useState('')
          const[vesselType,setvesselType] = useState('')
          const[ShortDescription,setShortDescription] = useState('')
          const[Flag,setFlag] = useState('')
          const[YearBuilt,setYearBuilt] = useState('')
          const[Capacity,setCapacity] = useState('')
          const[LOA,setLOA] = useState('')
          const[Class,setClass] = useState('')
          const[GRTNRT,setGRTNRT] = useState('')
          const[Teu,setTeu] = useState('')
          const[Price,setPrice] = useState('')
          const[MainEngine,setMainEngine] = useState('')
          const[DWT,setDWT] = useState('')

          const[Email,setEmail] = useState('')
          const[MobileNO,setMobileNO] = useState('')
          const[BriefDescription,setBriefDescription] = useState('')
          const[Image,setImage] = useState('')

          const [Nationality,setNationality] = useState('')
          const [BuyAsScrap,setBuyAsScrap] = useState('')
          const [From,setFrom] = useState('')
          const [To,setTo] = useState('')
          const [InspectionCountry,setInspectionCountry] = useState('')

          const [Category,setCategory] = useState('')
          const [Subject,setSubject] = useState('')

          

          const [count,setCount] = useState(0)


          

          
          // register ship
          const handleSubmitSale = async(e,id)=>{
            e.preventDefault();
           
            setLoading(true)
            const data={
              title:Title,
              vessel_type: vesselType,
              short_description: ShortDescription,
              flag: Flag,
              year_built: YearBuilt,
              capacity: Capacity,
              LOA: LOA,
              Class: Class,
              GRT_NRT: GRTNRT,
              Teu: Teu,
              Price: Price,
              main_engine: MainEngine,
              DWT: DWT,
              email: Email,
              phone: MobileNO,
              brief_description: BriefDescription,
              image: Image
            }
            try {
                const response = await axios.post(`${config.base_url}/api/HappyMarineShipping/AddShipForSale`,data,{
                  headers:{
                    'Content-Type':'multipart/form-data',
                    
                  }
                });
                if(response.data.status===200){
                  navigate('/')
                  console.log(response)
                  setLoading(false)
                  toast.success("Ship Registered Successfully!",{
                    autoClose:1500,
                    position:'top-right',
                    
                  });
                  setCount(id)
                 
                  setvesselType('')
                  setShortDescription('')
                  setFlag('')
                  setCapacity('')
                  setClass('')
                  setDWT('')
                  setEmail('')
                  setImage('')
                  setMobileNO('')
                  setMainEngine('')
                  setGRTNRT('')
                  setLOA('')
                  setPrice('')
                  setYearBuilt('')
                  setTeu('')
                  setGRTNRT('')
                  setBriefDescription('')
                  
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



        const handleSubmitCharter = async(e,id)=>{
          e.preventDefault();
         
          setLoading(true)
          const data={
            vessel_type: vesselType,
            short_description: ShortDescription,
            nationality: Nationality,
            year_built: YearBuilt,
            inspection_country:InspectionCountry,
            desirable_capacity: Capacity,
            Class: Class,
            from_price: From,
            to_price: To,
            buy_as_scrap:BuyAsScrap,
            email: Email,
            phone: MobileNO,
            brief_description: BriefDescription,
            image: Image
          }
          try {
              const response = await axios.post(`${config.base_url}/api/HappyMarineShipping/RegShipForCharter`,data,{
                headers:{
                  'Content-Type':'multipart/form-data',
                  
                }
              });
              if(response.data.status===200){
                navigate('/')
                console.log(response)
                setLoading(false)
                toast.success(" Registered Successfully!",{
                  autoClose:1500,
                  position:'top-right',
                  
                });
                setCount(id)
               
                setvesselType('')
                setShortDescription('')
                setNationality('')
                setCapacity('')
                setEmail('')
                setImage('')
                setMobileNO('')
                setFrom('')
                setTo('')
                setYearBuilt('')
                setBriefDescription('')
                
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

      const handleSubmitEqupment = async(e,id)=>{
        e.preventDefault();
       
        setLoading(true)
        const data={
          category: Category,
          subject: Subject,
          email: Email,
          phone: MobileNO,
          brief_description: BriefDescription,
        }
        try {
            const response = await axios.post(`${config.base_url}/api/HappyMarineShipping/RegShipForEquipments`,data,{
              headers:{
                'Content-Type':'multipart/form-data',
                
              }
            });
            if(response.data.status===200){
              navigate('/')
              console.log(response)
              setLoading(false)
              toast.success(" Registered Successfully!",{
                autoClose:1500,
                position:'top-right',
                
              });
              setCount(id)
             setCategory("")
             setSubject("")
             setEmail('')
             setMobileNO('')
             setBriefDescription("")
             
              
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

        const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
    
        
  return (
    <div className='bg-gradient-to-r from-[#2e5775] to-[#326e99] '>

        <RegisterPageNav/>

        <section className='mt-14 mb-10'>
        <div className="py-10 px-[30px] xm:px-[10px] w-[80%] lg:w-[90%] m-auto border rounded border-white">
      {/* Links for selecting form type */}
      <div className="flex justify-center gap-8 lg:flex-wrap lg:gap-5 items-center">
        <button
          onClick={() => setFormType("sale")}
          className={`${
            formType === "sale" ? "bg-[#d1a460] text-white" : "bg-white text-[#d1a460]"
          } rounded p-2 xm:w-[100%]  text-center`}
        >
          Register Ship For Sale
        </button>
        <button
          onClick={() => setFormType("charter")}
          className={`${
            formType === "charter" ? "bg-[#d1a460] text-white" : "bg-white text-[#d1a460]"
          } rounded p-2 xm:w-[100%]  text-center`}
        >
          Register Ship For Charter
        </button>
        <button
          onClick={() => setFormType("equipment")}
          className={`${
            formType === "equipment" ? "bg-[#d1a460] text-white" : "bg-white text-[#d1a460]"
          } rounded p-2 xm:w-[100%]  text-center`}
        >
          Register Supply Equipments
        </button>
      </div>

      {/* Conditional Form Rendering */}
      {formType === "sale" && (
        <form className="bg-white mt-10 rounded w-[100%]">
         <div className='p-5'>
                    <h1 className='text-black font-bold text-xl'>Register Ship For Sale</h1>
                </div>
                <hr className='text-gray-100 w-full' />
                {/*Title & vessel type */}
                <div className='p-5 flex gap-5 items-center xm:flex-wrap xm:gap-5'>
                <div className='flex flex-col gap-1 w-[50%] xm:w-[100%]'>
                    <label htmlFor="Title" className='font-semibold'>Title</label>
                    <input value={Title} onChange={(e)=>setTitle(e.target.value)} placeholder='Enter the Ship Title' className='w-full mt-2 rounded border border-gray-400  text-gray-500 p-2' name="" id="Title"  />
                </div>
                    <div className=' w-[50%] xm:w-[100%]'>
                      <label htmlFor="VesselType" className='font-semibold'>Vessel Type</label>
                      <select value={vesselType} onChange={(e)=>setvesselType(e.target.value)} className='w-full mt-2 rounded border border-gray-400 p-2 text-[#d1a460]' name="vesselType" id="VesselType">
                          <option  hidden selected value="">-Select-</option>
                          <option  disabled className='text-gray-500 font-semibold' value="">Catagories</option>
                          <option value="Barge" className='text-gray-500'>Barge</option>
                          <option value="Bulk" className='text-gray-500'>Bulk</option>
                          <option value="Cargo" className='text-gray-500'>cargo</option>
                          <option value="Container" className='text-gray-500'>Container</option>
                          <option value="Fishing" className='text-gray-500'>Fishing</option>
                          <option value="Multipurpose" className='text-gray-500'>Multipurpose</option>
                          <option value="Passenger" className='text-gray-500'>Passenger</option>
                          <option value="Reefer" className='text-gray-500'>Reefer</option>
                          <option value="Roro" className='text-gray-500'>Roro</option>
                          <option value="Tanker" className='text-gray-500'>Tanker</option>
                          <option value="Trug" className='text-gray-500'>Tug</option>
                          <option value="Dredger" className='text-gray-500'>Dredger</option>
                          <option value="Floating Crane" className='text-gray-500'>Floating Crane</option>
                          <option value="Landing Craft" className='text-gray-500'>Landing Craft</option>
                          <option value="Yatch" className='text-gray-500'>Yatch</option>
                          <option value="War Ship" className='text-gray-500'>War Ship</option>
                          <option value="Special Vessel" className='text-gray-500'>Special Vessel</option>
                          <option value="Other " className='text-gray-500'>Other</option>
  
      
                      </select>
                    </div>

                </div>
                

                {/* flag and Year Built*/}
                <div className='p-5 flex  xm:flex-wrap gap-5 items-center '>
                <div className='flex flex-col gap-1 w-[50%] xm:w-[100%]'>
                    <label htmlFor="Flag" className='font-semibold'>Flag</label>
                    <input placeholder='Enter the Country Name' value={Flag} onChange={(e)=>setFlag(e.target.value)} className='w-full mt-2 rounded border border-gray-400  text-gray-500 p-2' name="" id="Flag"  />
                </div>
                {/* Year Built */}
                <div className='w-[50%] xm:w-[100%]'>
                    <label htmlFor="Year Built" className='font-semibold'>Year Built</label>
                    <input placeholder='Enter the Year' value={YearBuilt} onChange={(e)=>setYearBuilt(e.target.value)} className='w-full mt-2 rounded border border-gray-400  text-gray-500 p-2' name="" id="Year Built"  />
                </div>
                </div>

                {/* Capacity and LOA */}
                <div className='p-5 flex gap-5 items-center xm:flex-wrap '>
                <div className='flex flex-col gap-1 w-[50%] xm:w-[100%]'>
                    <label htmlFor="Capacity" className='font-semibold'>Capacity</label>
                    <input value={Capacity} onChange={(e)=>setCapacity(e.target.value)} className='w-full mt-2 rounded border border-gray-400  text-gray-500 p-2' placeholder='Enter the Capacity' name="" id="Capacity"  />
                </div>
                <div className='flex flex-col gap-1 w-[50%] xm:w-[100%]'>
                    <label htmlFor="Length of all" className='font-semibold'>Length of all:LOA(m)</label>
                    <input value={LOA} onChange={(e)=>setLOA(e.target.value)} className='w-full mt-2 rounded border border-gray-400  text-gray-500 p-2' name="" id="Length of all"  placeholder='Enter LOA' />
                </div>
               
                </div>

               {/* class */}
                <div className='p-5 flex gap-5 items-center xm:flex-wrap xm:gap-5'>
                <div className='flex flex-col gap-1 w-[35%] xm:w-[100%]'>
                    <label htmlFor="Class" className='font-semibold'>Class</label>
                    <input value={Class} onChange={(e=>setClass(e.target.value))} className='w-full mt-2 rounded border border-gray-400  text-gray-500 p-2' placeholder='Enter the Class' name="" id="Class"  />
                </div>

                <div className='flex flex-col gap-1 w-[35%] xm:w-[100%]'>
                    <label htmlFor="GRT/NRT" className='font-semibold'>GRT/NRT</label>
                    <input value={GRTNRT} onChange={(e)=>setGRTNRT(e.target.value)} className='w-full mt-2 rounded border border-gray-400  text-gray-500 p-2' name="" id="GRT/NRT"  placeholder='Enter GRT/NRT' />
                </div>
 
                <div className='flex flex-col gap-1 w-[35%] xm:w-[100%]'>
                    <label htmlFor="Teu" className='font-semibold'>Teu</label>
                    <input value={Teu} onChange={(e)=>setTeu(e.target.value)} className='w-full mt-2 rounded border border-gray-400  text-gray-500 p-2' name="" id="Teu" placeholder='Enter Teu' />
                </div>

                
                </div>

                {/* main engine dwt */}
                <div className='p-5 flex gap-5 items-center xm:flex-wrap xm:gap-5'>
                <div className='flex flex-col gap-1 w-[50%] xm:w-[100%]'>
                    <label htmlFor="Main Engine" className='font-semibold'>Main Engine</label>
                    <input value={MainEngine} onChange={(e)=>setMainEngine(e.target.value)} className='w-full mt-2 rounded border border-gray-400  text-gray-500 p-2' name="" id="Main Engine" placeholder='Enter Main Engine' />
                </div>

                <div className='flex flex-col gap-1 w-[50%] xm:w-[100%]'>
                    <label htmlFor="DWT" className='font-semibold'>DWT</label>
                    <input value={DWT} onChange={(e)=>setDWT(e.target.value)} className='w-full mt-2 rounded border border-gray-400  text-gray-500 p-2' name="" id="DWT"  placeholder='Enter DWT'/>
                </div>
                
                </div>


                 {/* Price and scrap */}
                 <div className='p-5 '>
                <div className='flex flex-col gap-1 w-[50%] xm:w-[100%]'>
                    <label htmlFor="Price" className='font-semibold'>Price(USD)</label>
                    <input value={Price} onChange={(e)=>setPrice(e.target.value)} className='w-full mt-2 rounded border border-gray-400  text-gray-500 p-2' name="" id="Price" placeholder='Enter the Price' />
                </div>

               
                
                </div>

                 {/* Email Phone */}
                 <div className='p-5 flex gap-5 items-center xm:flex-wrap xm:gap-5'>
                <div className='flex flex-col gap-1 w-[50%] xm:w-[100%]'>
                    <label htmlFor="Email" className='font-semibold'>Email</label>
                    <input value={Email} onChange={(e)=>setEmail(e.target.value)} className='w-full mt-2 rounded border border-gray-400  text-gray-500 p-2' name="" id="Email" placeholder='Enter your Email' />
                </div>

                <div className='flex flex-col gap-1 w-[50%] xm:w-[100%]'>
                    <label htmlFor="Mobile No" className='font-semibold'>Mobile No</label>
                    <input value={MobileNO} onChange={(e)=>setMobileNO(e.target.value)} className='w-full mt-2 rounded border border-gray-400  text-gray-500 p-2' name="" id="Mobile No" placeholder='Enter Your Mobile No' />
                </div>
                
                </div>

                {/* short description */}
                <div className='p-5'>
                <label htmlFor="shortDescription" className='font-semibold'>Short Description</label>
                <textarea placeholder='Enter Ship Name/Country/Yr Built...' value={ShortDescription} onChange={(e)=>setShortDescription(e.target.value)} className='w-full mt-2 rounded border border-gray-400  text-gray-500 p-2' name="" id="shortDescription"  ></textarea>
                </div>

                {/* Brief Description */}
                <div className='p-5'>
                <label htmlFor="Brief Description" className='font-semibold'>Brief Description</label>
                <textarea value={BriefDescription} onChange={(e)=>setBriefDescription(e.target.value)} rows={5} className='w-full mt-2 rounded border border-gray-400  text-gray-500 p-2' name="" id="Brief Description"  placeholder='Write about your ship....'></textarea>
                </div>

               
                {/* upoad image */}
                <div className='p-5'>
                    <label htmlFor="Upload Image" className='font-semibold'>Upload Image</label>
                    <input  type='file'  onChange={(e)=>setImage(e.target.files[0])} className='imageInput w-full mt-2 rounded border border-gray-400  text-gray-500 p-2' name="" id="Upload Image"  />
                </div>


                <hr className='text-gray-500 w-full' />
        <div className='p-4'>
            <button onClick={(e) => handleSubmitSale(e)} type='submit' className='bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded'>{
            loading?(<span className='block w-[16px] h-[16px] border-2 border-b-0 border-white mt-[4px] mb-[4px] rounded-full m-auto animate-spin'></span>):("Submit")
          }</button>
            </div>

        </form>
      )}

      {formType === "charter" && (
        <form className="bg-white mt-10 rounded w-[100%]">
          <div className='p-5'>
                    <h1 className='text-black font-bold text-xl'>Register Ship For Charter</h1>
                </div>
                <hr className='text-gray-100 w-full' />
                {/* vessel type */}
                <div className='p-5'>
                    <label htmlFor="VesselType" className='font-semibold'>Vessel Type</label>
                    <select value={vesselType} onChange={(e)=>setvesselType(e.target.value)} className='w-full mt-2 rounded border border-gray-400 p-2 text-[#d1a460]' name="vesselType" id="VesselType">
                          <option  hidden selected value="">-Select-</option>
                          <option  disabled className='text-gray-500 font-semibold' value="">Catagories</option>
                          <option value="Barge" className='text-gray-500'>Barge</option>
                          <option value="Bulk" className='text-gray-500'>Bulk</option>
                          <option value="Cargo" className='text-gray-500'>cargo</option>
                          <option value="Container" className='text-gray-500'>Container</option>
                          <option value="Fishing" className='text-gray-500'>Fishing</option>
                          <option value="Multipurpose" className='text-gray-500'>Multipurpose</option>
                          <option value="Passenger" className='text-gray-500'>Passenger</option>
                          <option value="Reefer" className='text-gray-500'>Reefer</option>
                          <option value="Roro" className='text-gray-500'>Roro</option>
                          <option value="Tanker" className='text-gray-500'>Tanker</option>
                          <option value="Trug" className='text-gray-500'>Tug</option>
                          <option value="Dredger" className='text-gray-500'>Dredger</option>
                          <option value="Floating Crane" className='text-gray-500'>Floating Crane</option>
                          <option value="Landing Craft" className='text-gray-500'>Landing Craft</option>
                          <option value="Yatch" className='text-gray-500'>Yatch</option>
                          <option value="War Ship" className='text-gray-500'>War Ship</option>
                          <option value="Special Vessel" className='text-gray-500'>Special Vessel</option>
                          <option value="Other " className='text-gray-500'>Other</option>
  
      
                      </select>
                </div>
                {/* short description */}
                <div className='p-5'>
                <label htmlFor="shortDescription"   className='font-semibold'>Short Description</label>
                <textarea value={ShortDescription} onChange={(e)=>setShortDescription(e.target.value)} className='w-full mt-2 rounded border border-gray-400  text-gray-500 p-2' name="" id="shortDescription"  ></textarea>
                </div>

                {/* nationality and inspection */}
                <div className='p-5 flex justify-between xm:flex-wrap gap-5 items-center '>
                <div className='flex flex-col gap-1 w-[50%] xm:w-[100%]'>
                    <label htmlFor="Nationality"  className='font-semibold'>Nationality</label>
                    <input value={Nationality} onChange={(e)=>setNationality(e.target.value)} className='w-full mt-2 rounded border border-gray-400  text-gray-500 p-2' name="" id="Nationality"  />
                </div>
                {/* inspection country */}
                <div className='w-[50%] xm:w-[100%]'>
                    <label htmlFor="Inspection Country" className='font-semibold'>Inspection Country</label>
                    <input value={InspectionCountry} onChange={(e)=>setInspectionCountry(e.target.value)} className='w-full mt-2 rounded border border-gray-400  text-gray-500 p-2' name="" id="Inspection Country"  />
                </div>
                </div>

                {/* Year of Built */}
                <div className='p-5 flex justify-between xm:flex-wrap gap-5 items-center '>
                <div className='flex flex-col gap-1 w-[100%] '>
                    <label htmlFor="Year Of Built"  className='font-semibold'>Year Of Built</label>
                    <input value={YearBuilt} onChange={(e)=>setYearBuilt(e.target.value)} className='w-full mt-2 rounded border border-gray-400  text-gray-500 p-2' name="" id="Year Of Built"  />
                </div>
                
                
                </div>

                {/* Capacity and radio buttons */}
                <div className='p-5 flex gap-10 items-center xm:flex-wrap '>
                <div className='flex flex-col gap-1 w-[50%] xm:w-[100%]'>
                    <label htmlFor="Desirable Capacity" className='font-semibold'>Desirable Capacity</label>
                    <input value={Capacity} onChange={(e)=>setCapacity(e.target.value)} className='w-full mt-2 rounded border border-gray-400  text-gray-500 p-2' name="" id="Desirable Capacity"  />
                </div>
                <div className='flex flex-col gap-1 w-[50%] xm:w-[100%]'>
                    <label htmlFor="Buy as Scrap" className='font-semibold'>Buy as Scrap</label>
                    <input value={BuyAsScrap} onChange={(e)=>setBuyAsScrap(e.target.value)} className='w-full mt-2 rounded border border-gray-400  text-gray-500 p-2' name="" id="Buy as Scrap"  />
                </div>
               
                </div>

               {/* class */}
                

                {/* main engine dwt */}
                <div className='p-5 flex gap-16 items-center xm:flex-wrap xm:gap-5'>
                <div className='flex flex-col gap-1 w-[50%] xm:w-[100%]'>
                    <label htmlFor="From" className='font-semibold'>Desirable Price Range (USD)</label>
                    <div className='flex gap-2 items-center'>
                    <input value={From} onChange={(e)=>setFrom(e.target.value)}  type='number' placeholder='From' className='w-full mt-2 rounded border border-gray-400  text-gray-500 p-2' name="" id="From"  />
                    <input value={To} onChange={(e)=>setTo(e.target.value)} type='number' placeholder='To' className='w-full mt-2 rounded border border-gray-400  text-gray-500 p-2' name="" id="To"  />
                    </div>
                    
                </div>

                
                </div>                 

                 {/* Email Phone */}
                 <div className='p-5 flex gap-16 items-center xm:flex-wrap xm:gap-5'>
                <div className='flex flex-col gap-1 w-[50%] xm:w-[100%]'>
                    <label htmlFor="Email" className='font-semibold'>Email</label>
                    <input value={Email} onChange={(e)=>setEmail(e.target.value)} className='w-full mt-2 rounded border border-gray-400  text-gray-500 p-2' name="" id="Email"  />
                </div>

                <div className='flex flex-col gap-1 w-[50%] xm:w-[100%]'>
                    <label htmlFor="Mobile No" className='font-semibold'>Mobile No</label>
                    <input value={MobileNO} onChange={(e)=>setMobileNO(e.target.value)} className='w-full mt-2 rounded border border-gray-400  text-gray-500 p-2' name="" id="Mobile No"  />
                </div>
                
                </div>


                {/* Brief Description */}
                <div className='p-5'>
                <label htmlFor="Brief Description" className='font-semibold'>Brief Description</label>
                <textarea value={BriefDescription} onChange={(e)=>setBriefDescription(e.target.value)} rows={5} className='w-full mt-2 rounded border border-gray-400  text-gray-500 p-2' name="" id="Brief Description"  ></textarea>
                </div>

               
                {/* upoad image */}
                <div className='p-5'>
                    <label htmlFor="Upload Image" className='font-semibold'>Upload Image</label>
                    <input onChange={(e)=>setImage(e.target.files[0])} type='file' className='w-full mt-2 rounded border border-gray-400  text-gray-500 p-2' name="" id="Upload Image"  />
                </div>


                <hr className='text-gray-500 w-full' />
        <div className='p-4'>
            <button type='submit' onClick={(e) => handleSubmitCharter(e)} className='bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded'>Submit</button>
            </div>
        </form>
      )}

      {formType === "equipment" && (
        <form className="bg-white mt-10 rounded w-[100%]">
          <div className="p-5">
            <h1 className="text-black font-bold text-xl">Register Supply Equipments</h1>
          </div>
          <hr className="text-gray-100 w-full" />
          <div className="p-5">
            <label htmlFor="Category" className="font-semibold">
              Category 
            </label>
            <select
            value={Category}
            onChange={(e)=>setCategory(e.target.value)}
              className="w-full mt-2 rounded border border-gray-400 p-2 text-[#d1a460]"
              id="EquipmentType"
            >
              <option hidden selected value="">
                -Select-
              </option>
              <option value="Engine Stores">Engine Stores</option>
              <option value="Deck Stores">Deck Stores</option>
              <option value="Cabin Stores">Cabin Stores</option>
              <option value="Electrical Stores">Electrical Stores </option>
              <option value="Safety Stores">Safety Stores</option>
              <option value="Provision Stores">Provision Stores</option>
              {/* Additional options */}
            </select>
          </div>
          <div className="p-5">
            <label htmlFor="Subject" className="font-semibold">
              Subject 
            </label>
            <input
            value={Subject}
            onChange={(e)=>setSubject(e.target.value)}
              className="w-full mt-2 rounded border border-gray-400 p-2 text-gray-500"
              id="Subject"
            />
           
          </div>
          <div className="p-5">
            <label htmlFor="Description" className="font-semibold">
              Description
            </label>
            <textarea
            value={BriefDescription}
            onChange={(e)=>setBriefDescription(e.target.value)}
              rows={5}
              className="w-full mt-2 rounded border border-gray-400 p-2 text-gray-500"
              id="Description"
            ></textarea>
          </div>

          <div className='p-5 flex gap-16 items-center xm:flex-wrap xm:gap-5'>
                <div className='flex flex-col gap-1 w-[50%] xm:w-[100%]'>
                    <label htmlFor="Email" className='font-semibold'>Email</label>
                    <input value={Email} onChange={(e)=>setEmail(e.target.value)} className='w-full mt-2 rounded border border-gray-400  text-gray-500 p-2' name="" id="Email"  />
                </div>

                <div className='flex flex-col gap-1 w-[50%] xm:w-[100%]'>
                    <label htmlFor="Mobile No" className='font-semibold'>Mobile No</label>
                    <input value={MobileNO} onChange={(e)=>setMobileNO(e.target.value)} className='w-full mt-2 rounded border border-gray-400  text-gray-500 p-2' name="" id="Mobile No"  />
                </div>
                
                </div>


          <div className="p-4">
            <button 
            onClick={(e)=>handleSubmitEqupment(e)} className="bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded">
              Submit
            </button>
          </div>
        </form>
      )}
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
     
    <Footer/>
      
    </div>
  )
}
