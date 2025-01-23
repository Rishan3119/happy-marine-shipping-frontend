import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Logistic from './components/Logistic';
import ShipForSale from './components/ShipForSale';
import RegisterShip from './components/RegisterShip';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";



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

      </Routes>

      
      </Router>
   
   </>
  );
}

export default App;
