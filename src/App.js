import './App.css';
import {  Route, Routes  } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/navBar/Navbar';
import ContactUs from './pages/ContactUs';
import Cart from './pages/Cart';
import Footer from './components/footer/Footer';
function App() {
  return (
    <div className='main-wrap'>
   ` <Navbar />
    <Routes>
    <Route exact path='/' element={< Home/>}></Route>
    <Route exact path='/about-us' element={< Home/>}></Route>
    <Route exact path='/contactus' element={< ContactUs/>}> </Route>
    <Route exact path='/cart' element={< Cart />}> </Route>


   

  </Routes>
  <Footer />
  </div>
  );
}

export default App;
