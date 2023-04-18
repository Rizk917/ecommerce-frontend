import React from 'react';
import { Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import "../App.css"

function Checkout() {
  return (
    <>
      <div className="checkout-wrapper py-5 home-wrapper-2 ">
        <div className="container">
          <div className="container-xxl">
            <div className="row">
              <div className="col-7">
                <div className="checkout-left-data">
                  <h3 className="website-name">Dev Corner</h3>

                  <nav
                    style={{ '--bs-breadcrumb-divider': '>' }}
                    aria-label="breadcrumb"
                  >
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="#">Cart</a>
                      </li>
                      &nbsp;/
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Checkout
                      </li>
                    </ol>
                  </nav>
                  <h4 className="title my-3">Contact Information</h4>
                  <p className="user-details">checkout Page</p>

                  {/* ***********form********* */}
                  <form
                    action=""
                    className="d-flex gap-15 flex-wrap justify-content-between"
                  >
                    <div className="w-100 py-2">
                      <input
                        type="text"
                        placeholder="Name"
                        className="form-control"
                      />
                    </div>
                    <div className="w-100 py-2">
                      <input
                        type="text"
                        placeholder="Phone Number"
                        className="form-control"
                      />
                    </div>
                    <div className="w-100 py-2">
                      <input
                        type="text"
                        placeholder="Address"
                        className="form-control"
                      />
                    </div>
                    <div className="w-100">
                      <div className="d-flex justify-content-between align-items-center">
                        <Link to="/cart" className="text-dark">
                          <BiArrowBack className="me-2" />  Return To Cart
                          
                        </Link>
                        <Link to="/cart" className="button">
                          Continue to shipping
                        </Link>
                      </div>
                    </div>
                  </form>
                  {/* ************end /form************** */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
