import React, { useEffect, useState } from "react";
import "./home.css";
import axios from "axios";
import  secureLocalStorage  from  "react-secure-storage";
import editImage from '../image/edit.png'
import deleteImage from '../image/delete.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router";
function Dashboard() {
const [userslist,setUserslist]=useState([])
const [searchTerm, setSearchTerm] = useState("");

const navigate=useNavigate();
useEffect(() => {
  if (!secureLocalStorage.getItem('token') || secureLocalStorage.getItem('Role')!=='admin') {
    navigate('/');
  }
}, []);

 useEffect(() => {
  getUserData();
  }, []);
  const [currentUser, setCurrentUser] = useState(null);
  const [showUser, setShowUser] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const handleShowUser = () => {
    setShowUser(!showUser);
  };
  const getUserData =()=>{
    axios
      .get("https://ecommerce-backend-5k4d.onrender.com/user")
      .then((response) => {
        setUserslist(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const handleDeleteUser = async (id) => {
    const url = `https://ecommerce-backend-5k4d.onrender.com/user/${id}`;
    try {
      await axios.delete(url);
  getUserData();
  toast.success(' Deleted successfully!', {
    position: toast.POSITION.TOP_RIGHT
});
      // setCategories(categories.filter(category => category._id !== id));
      // console.log("Product deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.error('Error!', {
        position: toast.POSITION.TOP_RIGHT
    });
    }
  };

  const handleShowUpdateUser = () => {
    setShowUpdateForm(!showUpdateForm);
  };
  return (
    <div className="home">
    <ToastContainer/>

      <div className="container">
      <h1 className="admin-home-h">Welcome To BaCo Dashboard</h1>
          </div>
        </div>
  );
}

export default Dashboard;
