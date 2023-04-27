import React, { useEffect, useState } from 'react';

export default function Order() {
  const [data, setData] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');

  const handlePhoneChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleAddressChange = (event) => {
    setShippingAddress(event.target.value);
  };

  const handleConfirmOrder = () => {
    const userId = "6437c07bd944ba122a2804a4";
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        phoneNumber,
        shippingAddress,
      }),
  };
    fetch('http://localhost:5000/order', requestOptions)
      .then((response) => {
        if (response.status === 200) {
          console.log('Order confirmed!');
        } else {
          console.log('Error confirming order:', response.status);
        }
        console.log(requestOptions)  })
      .catch((error) => {
        console.log('Error confirming order:', error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
     const userId= "6437c07bd944ba122a2804a4"
      try {
        const response = await fetch(`http://localhost:5000/cart/${userId}`);
        const dataFetched = await response.json();
        setData(dataFetched);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Order</h1>
      {data.map((order) => (
        <div key={order._id}>
         
          {order.products.map((product) => (
            <div key={product.product}>
              <p>Product Name: {product.productName}</p>
              <p>Quantity: {product.quantity}</p>
              <p>Price: {product.price}</p>
            </div>
          ))}
        </div>
      ))}
      <div>
        <label>Phone number:</label>
        <input type="text" value={phoneNumber} onChange={handlePhoneChange} />
      </div>
      <div>
        <label>Address:</label>
        <input type="text" value={shippingAddress} onChange={handleAddressChange} />
      </div>
      <button onClick={handleConfirmOrder}>Confirm Order</button>
    </div>
  );
}
