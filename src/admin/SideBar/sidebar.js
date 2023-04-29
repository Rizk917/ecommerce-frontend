// import React from "react";
// import "./sidebar.css";
// import { Link } from "react-router-dom";
// import homepage from '../image/homepage.png'
// import product from '../image/product.png'
// import category from '../image/category.png'
// import order from '../image/order.png'
// import socialmedia from '../image/socialmedia.png'



// function SideBar({ isSidebarOpen }) {
//   return (
//     <div>
//       {isSidebarOpen ? (
//         <div className="sidebar">
//           <div className="image_products">
//             <img
//               src={homepage}
//               alt="edit"
//               className="edit"
//             />
//             <img
//               src={category}
//               alt="edit"
//               className="edit"
//             />
//             <img
//               src={product}
//               alt="edit"
//               className="edit"
//             />
//             <img
//               src={order}
//               alt="edit"
//               className="edit"
//             />
//             <img
//               src={socialmedia}
//               alt="edit"
//               className="edit"
//             />
//           </div>

//           <div className="products">
//             <button type="button" className="button_sidebar">
//               <Link className="link_button" key={1} to="/Dashboard">
//                 <p>Home</p>
//               </Link>
//             </button>
//             <button type="button" className="button_sidebar">
//               <Link className="link_button" key={2} to="/categories">
//                 <p>Categories</p>
//               </Link>
//             </button>
//             <button type="button" className="button_sidebar">
//               <Link className="link_button" key={3} to="/products">
//                 <p>Products</p>
//               </Link>
//             </button>
//             <button type="button" className="button_sidebar">
//               <Link className="link_button" key={4} to="/orders">
//                 <p>Orders</p>
//               </Link>
//             </button>
//             <button type="button" className="button_sidebar">
//               <Link className="link_button" key={5} to="/social">
//                 <p>Social Media</p>
//               </Link>
//             </button>
//           </div>
//         </div>
//       ) : null}
//     </div>
//   );
// }

// export default SideBar;

// // import React from 'react'
// // import "./sidebar.css"

// // function sidebar(clicked) {

// // return (
// //     <div>
// //     <div className='sidebar'>
// //     <ul className='ul_sidebar'>
// //         <li className='li_sidebar'><a href='#'>Home</a></li>
// //         <li className='li_sidebar'>Categories</li>
// //         <li className='li_sidebar'>Products</li>
// //     </ul>
// //     </div>
// //     </div>
// // )
// // }

// // export default sidebar
import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";

import { SiBrandfolder } from "react-icons/si";
import { BiCategoryAlt } from "react-icons/bi";
import {FaClipboardList} from "react-icons/fa";
import{SlSocialFacebook} from "react-icons/sl";

import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { GrCatalog } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key == "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "Dashboard",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Dashboard",
            },
            
            {
              key: "Catalog",
              icon: <GrCatalog className="fs-4" />,
              label: "Catalog",
              children: [
                {
                  key: "products",
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: "Edit Product",
                },

               
   
                {
                  key: "categories",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Categories",
                },
                
              ],
            },
            {
              key: "orders",
              icon: <FaClipboardList className="fs-4" />,
              label: "Orders",
            },
            {
              key: "social-media",
              icon: <SlSocialFacebook className="fs-4" />,
              label: "Social Media",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        
      </Layout>
    </Layout>
  );
};
export default SideBar;
