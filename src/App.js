import './App.css';
import {  Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/navBar/Navbar';

function App() {
  return (
    <div className='main-wrap'>
    <Navbar />
    <Routes>
    <Route exact path='/' element={< Home/>}></Route>
    <Route exact path='/about-us' element={< Home/>}></Route>
    <Route exact path='/cart' element={< Home/>}></Route>
    <Route exact path='/contact-us' element={< Home/>}></Route>

  </Routes>
  </div>
  );
}

export default App;
