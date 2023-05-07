import { useState, useEffect,useContext } from "react";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [statusUpdate, setStatusUpdate] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/order')
      .then(response => response.json())
      .then(data => setOrders(data))
      .catch(error => console.error(error));
  }, [statusUpdate]);

  useEffect(() => {
    if (!searchInput) {
      setSearchResults([]);
     
      return;
    }

    const results = orders.filter(order => {
      if (order._id === searchInput) {
        return true;
      }

      if (order.userId === searchInput) {
        return true;
      }

      return false;
    });

    setSearchResults(results);
  }, [searchInput, orders]);

  function handleSearch(event) {
    setSearchInput(event.target.value);
  }

  function handleStatusUpdate(orderId, newStatus) {
    fetch(`http://localhost:5000/order/${orderId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: newStatus })
    })
      .then(() => setStatusUpdate(!statusUpdate))
      .catch(error => console.error(error));
      }

  return (
<div className="FW-dashboard">
<div className="page_name">
        <h1 className="title_page_dashboard">Orders</h1>
      </div>  <input className="FW-search-input" type="text" placeholder="Search by order ID or user ID" value={searchInput} onChange={handleSearch} />
  <ul className="FW-order-list">
    {searchResults.length > 0 ? searchResults.map(order => (
      <li key={order._id} className="FW-order-item">
        <p className="FW-order-info">Order ID: {order._id}</p>
        <p className="FW-order-info">User ID: {order.userId}</p>
        <p className="FW-order-info">Status: {order.status}</p>
        <p className="FW-order-info">Total Bill: {order.totalBill}</p>
        <ul className="FW-products-list">
          {order.products.map(product => (
            <li key={product._id} className="FW-product-item">
              <p className="FW-product-info">{product.productName}: {product.quantity}</p>
            </li>
          ))}
        </ul>
        <button className="FW-order-btn" onClick={() => handleStatusUpdate(order._id, 'Pending')}>Pending</button>
        <button className="FW-order-btn" onClick={() => handleStatusUpdate(order._id, 'Confirmed')}>Confirmed</button>
        <button className="FW-order-btn" onClick={() => handleStatusUpdate(order._id, 'Shipped')}>Shipped</button>
        <button className="FW-order-btn" onClick={() => handleStatusUpdate(order._id, 'Delivered')}>Delivered</button>
      </li>
    )) : orders.map(order => (
      <li key={order._id} className="FW-order-item">
        <p className="FW-order-info">Order ID: {order._id}</p>
        <p className="FW-order-info">User ID: {order.userId}</p>
        <p className="FW-order-info">Status: {order.status}</p>
        <p className="FW-order-info">Total Bill: {order.totalBill}</p>
        <ul className="FW-products-list">
          {order.products.map(product => (
            <li key={product._id} className="FW-product-item">
              <p className="FW-product-info">{product.productName}: {product.quantity}</p>
            </li>
          ))}
        </ul>
        <button className="FW-order-btn" onClick={() => handleStatusUpdate(order._id, 'Pending')}>Pending</button>
        <button className="FW-order-btn" onClick={() => handleStatusUpdate(order._id, 'Confirmed')}>Confirmed</button>
        <button className="FW-order-btn" onClick={() => handleStatusUpdate(order._id, 'Shipped')}>Shipped</button>
        <button className="FW-order-btn" onClick={() => handleStatusUpdate(order._id, 'Delivered')}>Delivered</button>
      </li>
    ))}
  </ul>
</div>

  );
}



export default Orders;
