import React, { useEffect, useState, useContext } from 'react';
import './order.css';
import CartContext from '../Cart/CartContext';

export default function Order() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const { UserId, data } = useContext(CartContext);
  const handleDeleteACart = () => {
    fetch(`http://localhost:5000/cart/${UserId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete cart');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Cart deleted:', data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handlePhoneChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleAddressChange = (event) => {
    setShippingAddress(event.target.value);
  };

  const handleConfirmOrder = () => {
    const userId = UserId;
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
        console.log(requestOptions);
      })
      .catch((error) => {
        console.log('Error confirming order:', error);
      });
  };

  const calculateTotal = () => {
    const total = data.reduce((acc, order) => {
      return (
        acc +
        order.products.reduce((acc, product) => {
          return acc + product.total_price;
        }, 0)
      );
    }, 0);

    return total;
  };

  return (
    <div className="order-page">
      <h1 className="order-page__title">Order</h1>
      <div className="container_order">
        <div className="left-side">
          <div className="product-details">
            {data.map((order) => (
              <div key={order._id} className="order-page__orderleft">
                {order.products.map((product) => (
                  <div key={product.product} className="items">
                    <p className="order-page__product-name">
                      Product Name: {product.productName}
                    </p>
                    <p className="order-page__product-quantity">
                      Quantity: {product.quantity}
                    </p>
                    <p className="order-page__product-price">
                      Price: {product.total_price}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="right-side">
          <div className="order-info">
            <div className="form">
              <label className="radio">Phone number:</label>
              <input
                type="text"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={handlePhoneChange}
                className="form-control"
              />
            </div>
            <div>
              <label className="radio">Address:</label>
              <textarea
                type="text"
                placeholder="Enter shipping address"
                value={shippingAddress}
                onChange={handleAddressChange}
                className="form-control"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="order-page__bill">
        <p>Total: ${calculateTotal()}</p>
      </div>
      <button
        onClick={handleConfirmOrder}
        className="order-page__confirm-button"
      >
        Confirm Order
      </button>
      <button
        onClick={() => {
          handleDeleteACart();
        }}
        className="order-page__cancel-button"
      >
        Cancel Order
      </button>
    </div>
  );
}
