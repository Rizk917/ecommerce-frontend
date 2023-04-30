import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';

import '../App.css';
import TruckButton from '../components/placeorderbutton/placeorderbutton.jsx';

function Checkout() {
  const [alldata, setAlldata] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const handlePhoneChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleAddressChange = (event) => {
    setShippingAddress(event.target.value);
  };

  const handleConfirmOrder = () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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
          console.log(response);
        }
      })
      .catch((error) => {
        console.log('Error confirming order:', error);
      });
  };

  const fetchData = async () => {
    const userId = '6437c07bd944ba122a2804a4';
    try {
      const response = await axios.get(`http://localhost:5000/cart/${userId}`);
      const dataFetched = response.data[0].products;
      // console.log(dataFetched, 'batikh');
      setAlldata(dataFetched);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="container mb-100 p-5 rounded cart">
        <div className="row no-gutters">
          <div className="d-flex flex-row align-items-center order">
            <span className="font-[500] text-[40px] fs ">Your Order</span>
          </div>
          <hr className="line" />

          <div className="col-md-8">
            <div className="product-details mt-5">
              <span>
                You have&nbsp;
                <span className="allqty">
                  {alldata.reduce((acc, product) => acc + product.quantity, 0)}
                </span>
                &nbsp;items in your cart.
              </span>
              {alldata.map((product, index) => (
                <div className="d-flex mt-4 p-4 items rounded" key={index}>
                  <div className="d-flex align-items-center justify-content-between flex-grow-1">
                    <span className="colorName mr-2">
                      Product Name:{' '}
                      <span className="span2">{product.productName}</span>
                    </span>
                    <div className="d-flex flex-Row ">
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
          </div>

          <div className="col-md-4">
            <div className="order-info mt-20 ">
              <span className="font-[500] text-[30px] d-block pb-2 fs2  ">
                Order Details
              </span>
              <hr className="line mb-10" />

              <form className="d-flex gap-15  flex-wrap justify-content-between ">
                <label className="radio  ">Phone Number</label>

                <div className="w-100 py-2">
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    required
                  />
                </div>

                <label className="radio ">Shipping Address</label>
                <div className="w-100 py-2">
                  <textarea
                    className="form-control"
                    placeholder="Enter shipping address"
                    value={shippingAddress}
                    onChange={handleAddressChange}
                    required
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
                    {alldata.reduce(
                      (acc, product) => acc + product.quantity * product.price,
                      0
                    )}
                    <strong className="p-1 ttl">$</strong>
                  </span>
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between  ">
                    <Link to="/cart">
                      <i className="fa fa-long-arrow-left"></i>

                      <button className="btn"> Continue Shopping</button>
                    </Link>
                    <Link to="/cart" onClick={handleConfirmOrder}>
                      <TruckButton />
                    </Link>
                    {/* <button onClick={handleConfirmOrder} >confirm</button> */}
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
export default Checkout;
