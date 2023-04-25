import React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";

function sidebar({ isSidebarOpen }) {
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
              <Link className="link_button" key={1} to="/Dashboard">
              {/* <button type="button" className="button_sidebar">            </button> */}
              <p>Home</p>
              </Link>
              <Link className="link_button" key={1} to="/categories">
              {/* <button type="button" className="button_sidebar">            </button> */}
              <p>Categories</p>
              </Link>
              <Link className="link_button" key={1} to="/products">
              {/* <button type="button" className="button_sidebar">            </button> */}
              <p>Products</p>
              </Link>
              <Link className="link_button" key={1} to="/orders">
              {/* <button type="button" className="button_sidebar">            </button> */}
              <p>Orders</p>
              </Link>
              <Link className="link_button" key={1} to="/socialmedia">
              {/* <button type="button" className="button_sidebar">            </button> */}
              <p>Social Media</p>
              </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default sidebar;

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
