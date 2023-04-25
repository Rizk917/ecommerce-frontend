import React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";

function SideBar({ isSidebarOpen }) {
  return (
    <div>
      {isSidebarOpen ? (
        <div className="sidebar">
          <div className="image_products">
            <img
              src={process.env.PUBLIC_URL + "/pictures/homepage.png"}
              alt="edit"
              className="edit"
            />
            <img
              src={process.env.PUBLIC_URL + "/pictures/category.png"}
              alt="edit"
              className="edit"
            />
            <img
              src={process.env.PUBLIC_URL + "/pictures/product.png"}
              alt="edit"
              className="edit"
            />
            <img
              src={process.env.PUBLIC_URL + "/pictures/order.png"}
              alt="edit"
              className="edit"
            />
            <img
              src={process.env.PUBLIC_URL + "/pictures/socialmedia.png"}
              alt="edit"
              className="edit"
            />
          </div>

          <div className="products">
            <button type="button" className="button_sidebar">
              <Link className="link_button" key={1} to="/Dashboard">
                <p>Home</p>
              </Link>
            </button>
            <button type="button" className="button_sidebar">
              <Link className="link_button" key={2} to="/categories">
                <p>Categories</p>
              </Link>
            </button>
            <button type="button" className="button_sidebar">
              <Link className="link_button" key={3} to="/products">
                <p>Products</p>
              </Link>
            </button>
            <button type="button" className="button_sidebar">
              <Link className="link_button" key={4} to="/orders">
                <p>Orders</p>
              </Link>
            </button>
            <button type="button" className="button_sidebar">
              <Link className="link_button" key={5} to="/social">
                <p>Social Media</p>
              </Link>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default SideBar;

// import React from 'react'
// import "./sidebar.css"

// function sidebar(clicked) {

// return (
//     <div>
//     <div className='sidebar'>
//     <ul className='ul_sidebar'>
//         <li className='li_sidebar'><a href='#'>Home</a></li>
//         <li className='li_sidebar'>Categories</li>
//         <li className='li_sidebar'>Products</li>
//     </ul>
//     </div>
//     </div>
// )
// }

// export default sidebar
