import React, { useState } from "react";
import { Outlet } from "react-router";
import Navbar from "../components/navBar/Navbar";
import Login from "../components/login/Login";
function UserLayout(){
  const [showPopUp, setShowPopUp] = useState(false);

  function handleButtonClick() {
    console.log('hello')
    setShowPopUp(true);
  }

  function handleCloseButtonClick() {
    setShowPopUp(false);
  }

    return(
        <>
                {showPopUp ? (
        <div className="popup">
          <Login />
        </div>
      ) : null}
      <Navbar onButtonClick={handleButtonClick} />
      
        <Outlet/>
        </>
    )

}





export default UserLayout;