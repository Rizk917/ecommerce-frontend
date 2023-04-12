import './App.css';
import { Link, Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <div>

    <Routes>
    <Route exact path='/' element={< Home/>}></Route>

  </Routes>
  </div>
  );
}

export default App;
