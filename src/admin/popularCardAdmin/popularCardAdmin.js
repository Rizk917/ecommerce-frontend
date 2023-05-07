import React, { useState, useEffect } from "react";
import "./popularCardAdmin.css";
import axios from "axios";
import editImage from "../image/edit.png";
import deleteImage from "../image/delete.png";

function PopularCardAdmin() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productsById, setProductsById] = useState([]);

  
const showPopular=() =>{
  axios
      .get("https://ecommerce-backend-5k4d.onrender.com/popular")
      .then((response) => {
        // console.log(response.data)

        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
}
  // get products using axios
  useEffect(() => {
    showPopular();
  }, []);

  // get categories using axios
  useEffect(() => {
    axios
      .get("https://ecommerce-backend-5k4d.onrender.com/products")
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // add products to database

  const [addProduct, setAddProduct] = useState({
    productId: "",
  });
  const handleChange = (event) => {
// console.log(event.target.value)
    setAddProduct({
      ...addProduct,
      productId: event.target.value,
      
    });
  };
 

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const { productId } = addProduct;
      const response = await axios.post("https://ecommerce-backend-5k4d.onrender.com/popular", { productId });
      const newPopularProduct = response.data;
  
      setProducts([...products, newPopularProduct]);
      setShowProduct(false);
    showPopular();

    } catch (error) {
      console.log(error);
    }
    handleShowProduct();
  };
  
  
  // Function for deleting  a product

  const handleDeleteProduct = async (id) => {
    const url = `https://ecommerce-backend-5k4d.onrender.com/popular/${id}`;
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this product?");
      if (confirmDelete) {
      await axios.delete(url);
      setProducts(products.filter((product) => product._id !== id));
      // console.log("Product deleted successfully!");
    }}
    catch (error) {
      console.log(error);
    }
  };

  //update products



  

  const [showProduct, setShowProduct] = useState(false);

  const handleShowProduct = () => {
    setShowProduct(!showProduct);
  };

  return (
    <div className="container">
      <div className="page_name">
        <h1 className="title_page_dashboard">Popular Cards</h1>
      </div>
      <div className="table_container">
        <div className="search_table">
          <div className="search">
            <input
              placeholder="Search By Product Name"
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            />
          </div>
          <table className="table">
            <thead className="head_table">
              <tr className="table_head_tr">
                <th>Product Name</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody className="table_tbody">
              {products
                
                .map((product, key) => {
                  return (
                    <tr className="table_tr" key={key}>
                      <td className="table_td">{product.productId.productName}</td>
                      
                      <td className="table_td">
                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                        >
                          <img
                            src={deleteImage}
                            alt="delete"
                            className="delete"
                          />
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>

        </div>

        <div className="add_product">
          <button className="add_product" onClick={() => handleShowProduct()}>
            + Add Product
          </button>
          {showProduct ? (
            <div className="add_product_form">
              <form className="product_form">
               
                <label className="product_label">Select product</label>
                <select
                  className="product"
                  name="productId"
                  onChange={handleChange}
                >
                  {categories.map((productIDlist, key) => (
                    <option className="option" key={key} value={productIDlist._id}>
                    
                      {productIDlist.productName}
                    </option>
                  ))}
                </select>

                <button className="submit" onClick={handleSubmit}>
                  Submit
                </button>
              </form>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default PopularCardAdmin;
