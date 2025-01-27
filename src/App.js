import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Logistic from './components/Logistic';
import ShipForSale from './components/ShipForSale';
import RegisterShip from './components/RegisterShip';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Cargo from './components/Types of ships/Cargo';
import Barge from './components/Types of ships/Barge';
import Bulk from './components/Types of ships/Bulk';
import Container from './components/Types of ships/Container';
import Fishing from './components/Types of ships/Fishing';
import Multipurpose from './components/Types of ships/Multipurpose';
import PassengerFerry from './components/Types of ships/PassengerFerry';
import Reefer from './components/Types of ships/Reefer';
import Roro from './components/Types of ships/Roro';
import Tanker from './components/Types of ships/Tanker';
import Tug from './components/Types of ships/Tug';
import Dredger from './components/Types of ships/Dredger';
import FloatingCrane from './components/Types of ships/FloatingCrane';
import LandingCraft from './components/Types of ships/LandingCraft';
import Yacht from './components/Types of ships/Yacht';
import SupplyBoat from './components/Types of ships/SupplyBoat';
import CrewBoat from './components/Types of ships/CrewBoat';
import Others from './components/Types of ships/Others';



function App() {
  
  return (
    <>
      <ToastContainer/>
      <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/shipforsale' element={<ShipForSale/>} />
        <Route path='/logistics' element={<Logistic/>} />
        <Route path='/regShip' element={<RegisterShip/>} />
        <Route path='/cargo' element={<Cargo/>} />
        <Route path='/Barge' element={<Barge/>} />
        <Route path='/Bulk' element={<Bulk/>} />
        <Route path='/Container' element={<Container/>} />
        <Route path='/Fishing' element={<Fishing/>} />
        <Route path='/Multipurpose' element={<Multipurpose/>} />
        <Route path='/PassengerFerry' element={<PassengerFerry/>} />
        <Route path='/Reefer' element={<Reefer/>} />
        <Route path='/Roro' element={<Roro/>} />
        <Route path='/Tanker' element={<Tanker/>} />
        <Route path='/Tug' element={<Tug/>} />
        <Route path='/Dredger' element={<Dredger/>} />
        <Route path='/Floating-Crane' element={<FloatingCrane/>} />
        <Route path='/Landing-Craft' element={<LandingCraft/>} />
        <Route path='/Yacht' element={<Yacht/>} />
        <Route path='/SupplyBoat' element={<SupplyBoat/>} />
        <Route path='/CrewBoat' element={<CrewBoat/>} />
        <Route path='/Others' element={<Others/>} />

      </Routes>

      
      </Router>
   
   </>
  );
}

export default App;
