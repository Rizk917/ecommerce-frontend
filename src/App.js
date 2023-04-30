import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/navBar/Navbar';
import Checkout from './pages/Checkout';
import ContactUs from './pages/ContactUs';
function App() {
  return (
    <div className="main-wrap">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/about-us" element={<Home />}></Route>
        <Route exact path="/cart" element={<Home />}></Route>
        <Route exact path="/checkout" element={<Checkout/>}></Route>

        <Route exact path="/contactus" element={<ContactUs />}></Route>
      </Routes>
    </div>
  );
}

export default App;
