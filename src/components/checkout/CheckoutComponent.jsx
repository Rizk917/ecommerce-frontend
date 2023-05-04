import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Footer from '../../components/footer/Footer';
import CartContext from '../Cart/CartContext';

import { Link } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
import '../checkout/CheckoutComponent.css';
// import TruckButton from '../placeorderbutton/placeorderbutton.jsx';

function CheckoutComponent() {
  const [data, setData] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { cart, handleAddProduct, setCart, UserId } = useContext(CartContext);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const handlePhoneChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleAddressChange = (event) => {
    setShippingAddress(event.target.value);
  };

  const handleConfirmOrder = () => {
    // console.log('erorrhgfxkjhgvcxdfrrrrrrrrrrrr');
    // const userId = UserId;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: UserId,
        phoneNumber: phoneNumber,
        shippingAddress: shippingAddress,
      }),
    };
    fetch('http://localhost:5000/order', requestOptions)
      .then((response) => {
        if (response.status === 200) {
          console.log('Order confirmed!');
        } else {
          console.log('Error confirming order:', response.status);
        }
        console.log('outer', requestOptions);
      })
      .catch((error) => {
        console.log('Error confirming order:', error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      const userId = UserId;
      try {
        const response = await fetch(`http://localhost:5000/cart/${userId}`);
        // const dataFetched = await response.data[0].products;

        const dataFetched = await response.json();
        setData(dataFetched);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="container  p-5 rounded cart">
        <div className="row no-gutters">
          <div className="d-flex flex-row flex-wrap align-items-center order">
            <span className="font-[500] text-[40px] fs ">Your Order</span>
          </div>
          <hr className="line" />

          <div className="col-md-8">
            <div className="product-details mt-5">
              <span>
                You have&nbsp;
                <span className="allqty">
                  {data.reduce(
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

              {data.map((order, index) => (
                <div className="mt-4 " key={index}>
                  {order.products.map((product, index) => (
                    <div
                      className="d-flex flex-wrap mt-4 p-4 items rounded"
                      key={index}
                    >
                      <div className="d-flex flex-wrap align-items-center justify-content-between flex-grow-1">
                        <span className="colorName mr-2">
                          Product Name:{' '}
                          <span className="span2">{product.product}</span>
                        </span>
                        <div className="d-flex flex-Row align-items-center justify-content-between flex-wrap ">
                          <span className="colorName mr-20">
                            Quantity:{' '}
                            <span className="span2">{product.quantity}</span>
                          </span>
                          <span className="colorName mr-2">
                            Price:&nbsp;
                            <span className="span2">
                              {product.total_price}&nbsp;$
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-4">
            <div className="order-info mt-20 ">
              <span className="font-[500] text-[30px] d-block pb-2 fs2  ">
                Order Details
              </span>
              <hr className="line mb-10" />

              <form onSubmit={handleConfirmOrder} className="d-flex gap-15  flex-wrap justify-content-between ">
                <label className="radio  ">Phone Number</label>

                <div className="w-100 py-2">
                  <input
                    type="tel"
                    className="form-control mb-3"
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    // required
                  />
                </div>

                <label className="radio ">Shipping Address</label>
                <div className="w-100 py-2">
                  <textarea
                    className="form-control"
                    placeholder="Enter shipping address"
                    value={shippingAddress}
                    onChange={handleAddressChange}
                    // required
                  />
                </div>

                <div className=" w-full text-left">
                  <div className="payment ">
                    <span>Cache on Delivery </span>
                  </div>
                  <hr className="line" />
                </div>
                <div className=" d-flex flex-row align-items-center  justify-content-between ">
                  <span className="font-mono font-[600] text-[17px] ttl mt-10 mb-10 ">
                    Total Price:
                  </span>
                  <span className="font-mono font-[600] text-[17px] ttl ">
                    {' '}
                    {data.reduce(
                      (acc, order) =>
                        acc +
                        order.products.reduce(
                          (acc, product) =>
                            acc + product.quantity * product.price,
                          0
                        ),
                      0
                    )}
                    <strong className="p-1 ttl">$</strong>
                  </span>
                </div>
                <div className="w-100">
                  <div className="d-flex flex-row flex-wrap justify-content-between  ">
                    <Link to="/cart">
                      <i className="fa fa-long-arrow-left"></i>

                      <button className="btn"> Continue Shopping</button>
                    </Link>

                    <button className="btn" onClick={handleConfirmOrder}>
                      Confirm Orderrrr
                    </button>
                    {/* <div>
                      <TruckButton
                        //  disabled={isLoading}
                        onClick={handleConfirmOrder}
                      >
                        {isLoading ? 'Loading...' : 'Confirm Order'}
                      </TruckButton>
                    </div> */}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default CheckoutComponent;
