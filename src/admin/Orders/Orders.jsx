import React, { useState, useEffect } from "react";
import "./Orders.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Orders() {
  const [Orderslist, setOrderslist] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getOrderData();
  }, []);

  const getOrderData = () => {
    axios
      .get("https://ecommerce-backend-5k4d.onrender.com/order")
      .then((response) => {
        console.log(response.data);
        setOrderslist(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleUpdate = (orderId, status) => {
    axios
      .patch(`https://ecommerce-backend-5k4d.onrender.com/order/${orderId}`, { status })
      .then((response) => {
        toast.success(`Order status updated to ${status}`);
        getOrderData();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to update order status");
      });
  };
  return (
    <div className="home">
      <div className="container">
        <ToastContainer />

        <div className="page_name">
          <h1 className="title_page_dashboard">Orders</h1>
        </div>
        <div className="table_container">
          <div className="search_table">
            <div className="search">
              <input
                placeholder="Search By User Name"
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
              />
            </div>
            <table className="">
              <thead className="head_table">
                <tr className="table_head_tr">
                  <th>Order ID</th>
                  <th>User Name</th>
                  <th>User address</th>
                  <th>User Email</th>
                  <th>totalBill</th>
                  <th>Items</th>
                  <th style={{ width: "100px" }}>Status</th>

                  <th style={{ width: "100px" }}>Update</th>
                </tr>
              </thead>

              <tbody className="table_tbody">
                {Orderslist.filter((listOrders) => {
                  if (!searchTerm) {
                    return listOrders;
                  } else if (
                    listOrders.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return listOrders;
                  } else {
                    return null;
                  }
                }).map((listOrders, key) => {
                  return (
                    <tr className="table_tr" key={key}>
                      <td className="table_td">{listOrders._id}</td>
                      <td className="table_td">{listOrders.userId.name}</td>
                      <td className="table_td">{listOrders.shippingAddress}</td>
                      <td className="table_td">{listOrders.userId.email}</td>
                      <td className="table_td">{listOrders.totalBill}$</td>
                      <td className="table_td smallerfont">
                        {listOrders.products
                          .map(
                            (product) =>
                              `${product.productName} (${product.quantity})`
                          )
                          .join("\n")}
                      </td>
                      <td className="table_td">{listOrders.status}</td>
                      <td className="table_td">
                        <select
                          value={listOrders.status}
                          onChange={(event) =>
                            handleUpdate(listOrders._id, event.target.value)
                          }
                        >
                          {["Pending", "Confirmed", "Shipped", "Delivered"].map(
                            (option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            )
                          )}
                        </select>
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

export default Orders;
