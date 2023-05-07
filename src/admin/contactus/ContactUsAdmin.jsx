import React, { useState, useEffect } from "react";
import "./contactUs.css";
import editImage from '../image/edit.png'
import deleteImage from '../image/delete.png'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function ContactUsAdmin() {
  const [userslist,setUserslist]=useState([])
  const [searchTerm, setSearchTerm] = useState("");
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
      .get("http://127.0.0.1:5000/contactus")
      .then((response) => {
        setUserslist(response.data);
      })
      .catch((error) => {
        toast.error('Error!', {
          position: toast.POSITION.TOP_RIGHT
      });
        console.log(error);
      });
  }
  const handleDeleteUser = async (id) => {
    const url = `http://localhost:5000/contactus/${id}`;
    try {
      await axios.delete(url);
  getUserData();
  toast.success(' Deleted successfully!', {
    position: toast.POSITION.TOP_RIGHT
});
      // setCategories(categories.filter(category => category._id !== id));
      console.log("Product deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.error('Error!', {
        position: toast.POSITION.TOP_RIGHT
    });
    }
  };

  return (
    <div className="home">
    <ToastContainer/>
    <div className="container">

    <div className="page_name">
      <h1 className="title_page_dashboard">Contact Us</h1>
    </div>
    <div className="table_container">
      <div className="search_table">
        <div className="search">
      
        </div>
        <table className="table">
          <thead className="head_table">
            <tr className="table_head_tr">
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody className="table_tbody">
            {userslist
            
              .map((userlist, key) => {
                return (
                  <tr className="table_tr" key={key}>
                    <td className="table_td">{userlist.fullName}</td>
                    <td className="table_td">{userlist.email}</td>
                    <td className="table_td">{userlist.Message}</td>
                 
                    <td className="table_td">
                      <button
                        onClick={() => handleDeleteUser(userlist._id)}
                      >
                        <img
                          src={
                            deleteImage
                          }
                          alt="delete"
                          className="delete"
                        />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        </div>
      </div>
        </div>
      </div>
  );
}

export default ContactUsAdmin;
