import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SingleShipNav from './Navbars/SingleShipNav';
import Footer from './Footer';

const ShipLocation = () => {
  const [shipData, setShipData] = useState(null);
  const [loading, setLoading] = useState(true);

  const id = useParams()

  useEffect(() => {
    const fetchShipData = async () => {
      try {
        // Replace with your AIS data API endpoint
        const response = await axios.get(`https://services.marinetraffic.com/api/exportvessel/v:3/{API_KEY}/timespan:10/protocol:json
`);
        setShipData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ship data:", error);
        setLoading(false);
      }
    };

    fetchShipData();
  }, [id]);

  

  return (
    <div className='bg-gray-100'>
      <SingleShipNav/>
     <div className='py-[50px] text-center '>
       {!shipData?(
        <div>No data Availabe...</div>
       ):(
        <div >
          <h3>Ship Location</h3>
          <p>Latitude: {shipData.latitude}</p>
          <p>Longitude: {shipData.longitude}</p>
          <p>Speed: {shipData.speed} knots</p>
          {/* You can use a map component to show the location */}
       </div>
       )}
     </div>

     <div className='mt-[155px]'><Footer/></div>

     
    </div>
    
  );
};

export default ShipLocation;