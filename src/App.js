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
import Amenities from './components/Admin/Amenities';
import Profile from './components/Admin/Profile';
import ContainerList from './components/Type of ships List type/ContainerList';
import Bargelist from './components/Type of ships List type/BargeList';
import BulkList from './components/Type of ships List type/BulkList';
import CrewBoatList from './components/Type of ships List type/CrewBoatList';
import DredgerList from './components/Type of ships List type/DredgerList';
import FishingList from './components/Type of ships List type/FishingList';
import LandingCraftList from './components/Type of ships List type/LandingCraftList';
import MultipurposeList from './components/Type of ships List type/MultipurposeList';
import OthersList from './components/Type of ships List type/OthersList';
import PassengerFerryList from './components/Type of ships List type/PassengerFerryList';
import ReeferList from './components/Type of ships List type/ReeferList';
import RoroList from './components/Type of ships List type/RoroList';
import SupplyBoatList from './components/Type of ships List type/SupplyBoatList';
import TankerList from './components/Type of ships List type/TankerList';
import Tuglist from './components/Type of ships List type/TugList';
import Yachtlist from './components/Type of ships List type/YachtList';
import CargoList from './components/Type of ships List type/CargoList';
import FloatingCraneList from './components/Type of ships List type/FloatingCraneList';
import SingleShipHome from './components/SingleShipHome';
import ShipForSaleList from './components/Type of ships List type/ShipForSaleList';
import SingleShipCharter from './components/SingleShipCharter';
import SingleShipLogistic from './components/SingleShipLogistic';
import PageTransition from './components/PageTransition';




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
          {/* type of ship grid type */}
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
  
          {/* type of ships list type */}
          <Route path='/shipforsale/list' element={<ShipForSaleList/>} />
          <Route path='/Barge/list' element={<Bargelist/>} />
          <Route path='/Container/list' element={<ContainerList/>} />
          <Route path='/Bulk/list' element={<BulkList/>} />
          <Route path='/Cargo/list' element={<CargoList/>} />
          <Route path='/CrewBoat/list' element={<CrewBoatList/>} />
          <Route path='/Dredger/list' element={<DredgerList/>} />
          <Route path='/Fishing/list' element={<FishingList/>} />
          <Route path='/Floating-Crane/list' element={<FloatingCraneList/>} />
          <Route path='/Landing-Craft/list' element={<LandingCraftList/>} />
          <Route path='/Multipurpose/list' element={<MultipurposeList/>} />
          <Route path='/Others/list' element={<OthersList/>} />
          <Route path='/PassengerFerry/list' element={<PassengerFerryList/>} />
          <Route path='/Reefer/list' element={<ReeferList/>} />
          <Route path='/Roro/list' element={<RoroList/>} />
          <Route path='/SupplyBoat/list' element={<SupplyBoatList/>} />
          <Route path='/Tanker/list' element={<TankerList/>} />
          <Route path='/Tug/list' element={<Tuglist/>} />
          <Route path='/Yacht/list' element={<Yachtlist/>} />
  
          <Route path='/singleShip/:id' element={<SingleShip/>} />
          <Route path='/singleShiphome/:id' element={<SingleShipHome/>} />
          <Route path='/singleShipCharter/:id' element={<SingleShipCharter/>} />
          <Route path='/singleShiplogistic/:id' element={<SingleShipLogistic/>} />
          <Route path='/about' element={<AboutUs/>} />
          <Route path='/contact' element={<ContactUs/>} />
          <Route path='/shipLoc/:id' element={<ShipLocation/>} />
  
          {/* Admin Routes */}
          <Route
            path="/admin/*"
            element={
              <PageTransition>
                <Routes>
                  <Route path="/" element={<Signin />} />
                  <Route path="Dashboard" element={<AdminDashboard />} />
                  
                </Routes>
              </PageTransition>
            }
          />

                  <Route path="/admin/addShip" element={<AddShip />} />
                  <Route path="/admin/viewShip" element={<ViewShip />} />
                  <Route path="/admin/addCategory" element={<AddCategory />} />
                  <Route path="/admin/viewCategory" element={<ViewCategory />} />
                  <Route path="/admin/addsubcategory" element={<AddSubCategory />} />
                  <Route path="/admin/viewSubCategory" element={<ViewSubCat />} />
                  <Route path="/admin/updateViewSubCat/:id" element={<UpdateSubCategory />} />
                  <Route path="/admin/updateViewShip/:id" element={<UpdaetViewShip />} />
                  <Route path="/admin/shipforsale" element={<VieRegisterShipForSale />} />
                  <Route path="/admin/shipforCharter" element={<ViewShipForCharter />} />
                  <Route path="/admin/shipforEq" element={<ViewShipForEquipments />} />
                  <Route path="/admin/amenities" element={<Amenities />} />
                  <Route path="/admin/profile" element={<Profile />} />

        </Routes>
      </Router>
   
   </>
  );
}

export default App;
