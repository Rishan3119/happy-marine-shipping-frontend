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
import SingleShip from './components/SingleShip';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import ShipReadyToChart from './components/ShipReadyToChart';
import ShipLocation from './components/ShipLocation';
import Signin from './components/Admin/Signin';
import AdminDashboard from './components/Admin/AdminDashboard';
import AddShip from './components/Admin/AddShip';
import ViewShip from './components/Admin/ViewShip';
import AddCategory from './components/Admin/AddCategory';
import ViewCategory from './components/Admin/ViewCategory';
import AddSubCategory from './components/Admin/AddSubCategory';
import ViewSubCat from './components/Admin/ViewSubCat';
import UpdateSubCategory from './components/Admin/UpdateSubCategory';
import UpdaetViewShip from './components/Admin/UpdateViewShip';
import VieRegisterShipForSale from './components/Admin/VieRegisterShipForSale';
import ViewShipForCharter from './components/Admin/ViewShipForCharter';
import ViewShipForEquipments from './components/Admin/ViewShipForEquipments';




function App() {

  
  
  return (
    <>
      <ToastContainer/>
      <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/shipforsale' element={<ShipForSale/>} />
        <Route path='/logistics' element={<Logistic/>} />
        <Route path='/shipreadytochart' element={<ShipReadyToChart/>} />
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
        <Route path='/singleShip/:id' element={<SingleShip/>} />
        <Route path='/about' element={<AboutUs/>} />
        <Route path='/contact' element={<ContactUs/>} />
        <Route path='/shipLoc/:id' element={<ShipLocation/>} />
        <Route path='/admin' element={<Signin/>} />
        <Route path='/admin/Dashboard' element={<AdminDashboard/>} />
        <Route path='/admin/addShip' element={<AddShip/>} />
        <Route path='/admin/viewShip' element={<ViewShip/>} />
        <Route path='/admin/addCategory' element={<AddCategory/>} />
        <Route path='/admin/viewCategory' element={<ViewCategory/>} />
        <Route path='/admin/addsubcategory' element={<AddSubCategory/>} />
        <Route path='/admin/viewSubCategory' element={<ViewSubCat/>} />
        <Route path='/admin/updateViewSubCat/:id' element={<UpdateSubCategory/>} />
        <Route path='/admin/updateViewShip/:id' element={<UpdaetViewShip/>} />
        <Route path='/admin/shipforsale' element={<VieRegisterShipForSale/>} />
        <Route path='/admin/shipforCharter' element={<ViewShipForCharter/>} />
        <Route path='/admin/shipforEq' element={<ViewShipForEquipments/>} />




        
      </Routes>
      


      </Router>
   
   </>
  );
}

export default App;
