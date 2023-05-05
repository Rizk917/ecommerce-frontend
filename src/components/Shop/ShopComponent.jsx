  import React, { useState, useEffect, useContext } from "react";
  import './shopComponent.css'
  import axios from "axios";
  import CartContext from "../Cart/CartContext";





  function ShopComponent() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState(true)




    const{ cart, handleAddProduct, setCart, UserId } = useContext(CartContext)

    //get all categories
    useEffect(() => {
      axios
        .get("http://localhost:5000/categories")
        .then((response) => {
          setCategories(response.data.data);

        })
        .catch((error) => {
          console.log(error);
        });
    }, [categories]);

  //get all products && products for each category using Id
    const handleShowProduct = async (id) => {
      if (id === "all") {

        try {
          const url = "http://localhost:5000/products/display";
          await axios.get(url).then((response) => {
            setProducts(response.data.products);
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        const url = `http://localhost:5000/products/display/${id}`;
        try {
          await axios.get(url).then((response) => {
            console.log(response)
            setProducts(response.data.products);
          
          });
        } catch (error) {
          console.log(error);
        }
      }
      setAllProducts(false)
    };

    useEffect(() => {
      if (allProducts) {
        handleShowProduct('all');
      }
    }, []);

    useEffect(() => {
      const data = localStorage.getItem("cart");
      if (data) {
        setCart(JSON.parse(data));
      }
    }, []);

    return (
      <div className="shop_product">
        <div className="hamburger">
            <div className="sideBar_products">
            <div className="select_categories">
              <select className="select_category" onChange={(e) => handleShowProduct(e.target.value)}>
                <option value='all'>
                  All Products
                  </option>
                {categories.map((category, key) => (
                <option key={key} value={category._id}>{category.categoryName}</option>
                ))}
              </select>
            </div>
          <div className="div_color">
            
          <div className="list_categories">
              <div className="list_category">
                <ul>
                  <li className="li_category" 
                  onClick={() => handleShowProduct('all')}
    
                  ><span>All Products</span></li>
                  {categories.map((category, key) => {
                    return(
                  <li className="li_category" key={key}
                  onClick={() => handleShowProduct(category._id)}
    
                  ><span>{category.categoryName}</span></li>
                    )
                })}
                  
                  
                </ul>
              </div>
            </div>
          </div>
            

          
          

  <div className="product_search">
      {products.map((product, key) => {
        return (
          <div className="card" key={key}>
            <img className="img_card" src={product.productImage} alt="chocolate" />
            <div className="product_name">
              <h2>{product.productName}</h2>
            </div>
            <div className="details_product">
              <div className="product_price">
                <h2>{product.productPrice} $</h2>
              </div>
              <div className="button_card">
                <button type="button" onClick={() => handleAddProduct(UserId, product._id, product.productName, 1, product.productPrice)}>
                  <p>Add Card</p>
                </button>
              </div>
            </div>
          </div>
        );
      })
  }
  </div>
          </div>
          </div>
      </div>
      
      
    )
  }

  export default ShopComponent


