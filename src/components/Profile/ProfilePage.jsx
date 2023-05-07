import React, { useEffect, useState } from "react";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [orders, setOrders] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [searchOrder, setSearchOrder] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const UserId = localStorage.getItem("id");
  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "#5cb85c"; 
      case "Shipped":
        return "#f0ad4e";
      case "Confirmed":
        return "#5bc0de";
      case "Pending":
        return "#d9534f";
      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch(`https://ecommerce-backend-5k4d.onrender.com/order/user/${UserId}`);
      const data = await res.json();
      setOrders(data);
    };
    fetchOrders();
  }, [UserId]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`https://ecommerce-backend-5k4d.onrender.com/user/${UserId}`);
      const data = await res.json();
      setFirstName(data.User.name);
    };
    fetchUser();
  }, [UserId]);

  const initials = firstName.split(" ").map((name) => name[0]).join("").toUpperCase();
  const handleSearch = async () => {
    const res = await fetch(`https://ecommerce-backend-5k4d.onrender.com/order/${searchOrder}`);
    if (res.ok) {
      const data = await res.json();
      setOrderDetails(data);
      setShowDetails(true);
    } else {
      // alert("Order Id not found");
    }
  };

  const handleBack = () => {
    setShowDetails(false);
    setOrderDetails(null);
  };

  return (
    <div className="profile-container">
        <div className="greeting-container">
        <div className="profile-pic">
        <div className="profile-initials">{initials}</div>
        </div>
        <p className="greeting-p">Hello, {firstName}</p>
      </div>
      <div className="group-cotainer">
    

      

      <div className="search-container">
  <input
    type="text"
    placeholder="Enter Order ID"
    value={searchOrder}
    onChange={(e) => setSearchOrder(e.target.value)}
  />
  <button
    className="button_card"
    onClick={handleSearch}
    disabled={!searchOrder.trim()} 
  >
    Search
  </button>
</div>

      {showDetails && (
        <div className="back-container">
          <button className="button_card" onClick={handleBack}>Back</button>
        </div>
      )}

      <table className="orders-table">
        <thead>
          <tr>
            <th className="order-id-header">Order Id</th>
            <th className="order-date-header">Date</th>
            <th className="order-status-header">Shipping Address</th>
            <th className="order-bill-header">Total Bill</th>
            <th className="order-shipping-header">Status</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails ? (
            <tr>
              <td colSpan="5">
                <table>
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderDetails.products.map((product) => (
                      <tr key={product._id}>
                        <td>{product.productName}</td>
                        <td>{product.quantity}</td>
                        <td>{product.price} USD</td>
                        <td>{product.total_price} USD</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order._id}>
                <td className="orderID">{order._id}</td>
                <td className="order-date">{order.createdAt}</td>
                <td className="order-status">{order.shippingAddress}</td>
                <td className="order-bill">{order.totalBill} USD</td>
                <td className="order-shipping" style={{ backgroundColor: getStatusColor(order.status) }}>
  {order.status}
</td>              </tr>
            ))
               )}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default ProfilePage;

