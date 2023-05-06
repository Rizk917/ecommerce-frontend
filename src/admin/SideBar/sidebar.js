import React, { useState } from "react";
import { Outlet } from "react-router-dom";
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
  AiOutlinePicColors,
} from "react-icons/ai";
import { GrCatalog } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="dashboard-logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo">BC</span>
            <span className="lg-logo">Ba Co</span>
            </h2>
        </div>
        <Menu
          theme="dark"
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
              key: "imagesC",
              icon: <BiCategoryAlt className="fs-4" />,
              label: "Image Carousel",
            },
            
            {
              key: "users",
              icon: < AiOutlineUser className="fs-4" />,
              label: "Users",
            },

            {
              key: "social-media",
              icon: <SlSocialFacebook className="fs-4" />,
              label: "Social Media",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
        className="d-flex justify-content-between ps-1 pe-5"
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
          <div className="d-flex gap-3 align-items-center">
           <div></div>
           <div className="d-flex gap-3 align-items-center">
           

           </div>
           <div>
            <h5 className="text-darks"></h5>
            <p></p>
           </div>

          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        > 
          <Outlet/>
          
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;