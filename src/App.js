import './App.css';
import {  Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Navbar from './components/navBar/Navbar';
import ContactUs from './pages/ContactUs';
import Login from './components/login/Login';
import AboutUs from './components/AboutUs/AboutUsComponent';
function App() {
  const [showPopUp, setShowPopUp] = useState(false);

  function handleButtonClick() {
    setShowPopUp(!showPopUp);
  }

  function handleCloseButtonClick() {
    setShowPopUp(false);
  }

  return (
    <>
    {showPopUp ? <div className='popup'>
      <Login />
    </div>: null}
    <Navbar onButtonClick={handleButtonClick}/>
    <div className={showPopUp ? "none" : "main-wrap" }>
    <Routes>
      <Route exact path='/' element={< Home/>}></Route>
      <Route exact path='/about' element={< AboutUs/>}></Route>
      <Route exact path='/cart' element={< Home/>}></Route>
      <Route exact path='/contactus' element={< ContactUs/>}></Route>
    </Routes>
    </div>
  </>
  );
}

export default App;
