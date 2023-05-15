import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  secureLocalStorage  from  "react-secure-storage";
import './UserComponent.css'
function UserComponent() {
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    const UserId = secureLocalStorage.getItem("id");
    if (UserId) {
      axios.get(`https://ecommerce-backend-5k4d.onrender.com/user/${UserId}`).then((res) => {
        setUser(res.data.User);
        setName(res.data.User.name);
        setEmail(res.data.User.email);
      });
    }
  }, []);

  const handleSave = () => {
    // Send updated user data to the server
    axios
      .put(`https://ecommerce-backend-5k4d.onrender.com/user/edit/${user._id}`, { name, password })
      .then((res) => {
        setUser(res.data.data);
        setName(res.data.data.name);
        setEmail(res.data.data.email);
        setPassword("");
        // alert("User data saved successfully");
        toast.success('User data saved successfully!', {
          position: toast.POSITION.TOP_RIGHT
      });
      })
      .catch((err) =>
       alert(err.response.data.message));
      toast.error('Error!', {
        position: toast.POSITION.TOP_RIGHT
    });
  };

  return (
    <div className="containerform ">
      <ToastContainer/>
        <div className="userform">
       <label className="userlabel">
        Name:
        <input className="userinput"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
       <label className="userlabel">
        Email:
        <input className="userinput"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          readOnly
          disabled
        />
      </label>
       <label className="userlabel">
        Password:
        <input className="userinput"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button className="button_card" onClick={handleSave}>Save</button>
    </div>
    </div>
  );
}

export default UserComponent;
