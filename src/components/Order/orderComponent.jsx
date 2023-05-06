import React, { useEffect, useState, useContext } from 'react';
import './order.css';
import CartContext from '../Cart/CartContext';

export default function Order() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [cartData, setCartData] = useState([]);
  const { UserId, data,fetchData } = useContext(CartContext);

  // useEffect(() => {
  //   if (window.location.pathname === '/order') {
  //     fetchData();
  //   }
  // }, [window.location.pathname]);

  useEffect(() => {
    fetchData();

    setCartData(data);
  }, [data]);

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
      {/* <hr className='line'/> */}
      <span className="spn">
        You have&nbsp;
        <span className="allqty">
          {cartData.reduce(
            (acc, order) =>
              acc +
              order.products.reduce(
                (acc, product) => acc + product.quantity,
                0
              ),
            0
          )}
        </span>
        &nbsp;items in your cart.
      </span>
      <div className="container_order">
        <div className="left-side">
          <div className="product-details">
            {cartData.map((order) => (
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
            <span className="order-info_title">Order Details</span>
            <hr className="line-right" />
            <div className="form-group">
              <div className="phn">
                <label className="radio">Phone number :</label>{' '}
                <input
                  type="text"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  className="form-control"
                />
              </div>
              <div className="adrs">
                <label className="radio">Address :</label>{' '}
                <input
                  type="text"
                  placeholder="Enter shipping address"
                  value={shippingAddress}
                  onChange={handleAddressChange}
                  className="form-control"
                />
              </div>
            </div>
            <hr className="line" />
            <div className="payment ">
              <span>Cache on Delivery </span>
            </div>
            <div className="order-page__bill">
              <p>Total: {calculateTotal()}&nbsp; $</p>
            </div>
            <hr className="line" />
            <div className="btn_dev">
              <button onClick={handleConfirmOrder} className="confirm-button">
                Confirm Order
              </button>
              <button
                onClick={() => {
                  handleDeleteACart();
                  fetchData();
                }}
                className="cancel-button"
              >
                Cancel Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
