
import ProfilePage from "../components/Profile/ProfilePage.jsx";
import UserComponent from "../components/User/UserComponent.jsx";
import Footer from "../components/footer/Footer.js";

import React from 'react'

export default function User() {
  return (
    <div className="page-start">
      <ProfilePage />
        {/* <UserComponent /> */}
        <Footer />
    </div>
  )
}
