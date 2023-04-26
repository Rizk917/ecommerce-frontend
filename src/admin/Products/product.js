import React, { useState, useEffect } from "react";
import "./product.css";
import axios from "axios";
import editImage from '../image/edit.png'
import deleteImage from '../image/delete.png'

function ProductsAdmin() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [productImage, setProductImage] = useState('');

  // get products using axios
  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [products]);

  // get categories using axios
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

  // add data to products

  const [addProduct, setAddProduct] = useState({
    productName: "",
    productDescription: "",
    productImage: "",
    productPrice: "",
    productQuantity: "",
    categoryId: "",
  });

  // add product
  const handleImageChange = async (event) => {
    event.preventDefault();
    setProductImage (event.target.files[0]);


  }

  const handleChange = async (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    let fieldValue = event.target.value;

    const newFormData = { ...addProduct };
    newFormData[fieldName] = fieldValue;

    setAddProduct(newFormData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('productImage',productImage)
    formData.append("productName", addProduct.productName);
    formData.append("productDescription", addProduct.productDescription);
    formData.append("productPrice", addProduct.productPrice);
    formData.append("productQuantity", addProduct.productQuantity);
    formData.append("categoryId", String(addProduct.categoryId));

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    axios
      .post("http://localhost:5000/products", formData, config)
      .then((response) => {
        setProducts([...products, response.data]);
      })
      .catch((error) => {
        console.log(error.response.data);
      });

    handleShowProduct();
  };

  // Function for deleting  a product

  const handleDeleteProduct = async (id) => {
    const url = `http://localhost:5000/products/${id}`;
    try {
      await axios.delete(url);
      setProducts(products.filter((product) => product._id !== id));
      console.log("Product deleted successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  const [productUpdateImage, setProductUpdateImage] = useState('')

  // update products

  const [updateProduct, setUpdateProduct] = useState({
    productName: "",
    productDescription: "",
    productImage: "",
    productPrice: "",
    productQuantity: "",
    categoryId: "",
  });

  const handleUpdateImageChange = async (event) => {
    event.preventDefault();
    setProductUpdateImage (event.target.files[0]);


  }

  const handleUpdateChange = async (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    
    if(!event.target.value){
      let fieldValue=event.target.defaultValue
      const newFormData = { ...updateProduct };
      newFormData[fieldName] = fieldValue;
      console.log(fieldValue)
      setUpdateProduct(newFormData);
    }else{
      let fieldValue = event.target.value;
      const newFormData = { ...updateProduct };
      newFormData[fieldName] = fieldValue;
      console.log(fieldValue)
      setUpdateProduct(newFormData);
    }
    
  };
  const handleUpdateProduct = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('productImage',productUpdateImage)
    formData.append("productName", updateProduct.productName);
    formData.append("productDescription", updateProduct.productDescription);
    formData.append("productPrice", updateProduct.productPrice);
    formData.append("productQuantity", updateProduct.productQuantity);
    formData.append("categoryId", String(updateProduct.categoryId));

    console.log(formData)
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    console.log(currentProduct._id)

    axios
      .put(`http://localhost:5000/products/${currentProduct._id}`, formData, config)
      .then(() => {
        console.log("product updated successfully");

      })
      .catch((error) => {
        console.log(error.response.data);
      });
    }

  const [currentProduct, setCurrentProduct] = useState("null");
  const [showProduct, setShowProduct] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const handleShowProduct = () => {
    setShowProduct(!showProduct);
  };

  return (
    <div className="container">
      <div className="page_name">
        <h1 className="title_page_dashboard">Products</h1>
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
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody className="table_tbody">
              {products
                .filter((product) => {
                  if (!searchTerm) {
                    return product;
                  } else if (
                    product.productName
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return product;
                  } else {
                    return null;
                  }
                })
                .map((product, key) => {
                  return (
                    <tr className="table_tr" key={key}>
                      <td className="table_td">{product.productName}</td>
                      <td className="table_td">
                        <button
                          onClick={() => {
                            setShowUpdateForm(!showUpdateForm);
                            setCurrentProduct(product);
                          }}
                        >
                          <img
                            src={editImage}
                            alt="edit"
                            className="edit"
                          />
                        </button>
                      </td>
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
          {showUpdateForm && currentProduct ? (
            <div className="update_product">
              <form className="product_form" onSubmit={handleUpdateProduct}>
                <label className="product_label">Product Name</label>
                <input
                  type="text"
                  className="product"
                  name="name"
                  onChange={handleUpdateChange}
                  defaultValue={currentProduct.productName}
                />
                <label className="product_label">Product Description</label>
                <input
                  type="text"
                  className="product"
                  name="description"
                  onChange={handleUpdateChange}
                  defaultValue={currentProduct.productDescription}
                />
                <label className="product_label">Product Image</label>
                <input
                  type="file"
                  className="product"
                  name="image"
                  onChange={handleUpdateImageChange}
                  defaultValue={currentProduct.productImage.file}
                />
                <label className="product_label">Product Price</label>
                <input
                  type="text"
                  className="product"
                  name="price"
                  onChange={handleUpdateChange}
                  defaultValue={currentProduct.productPrice}
                />
                <label className="product_label">Product Quantity</label>
                <input
                  type="text"
                  className="product"
                  name="quantity"
                  onChange={handleUpdateChange}
                  defaultValue={currentProduct.productQuantity}
                />
                <select
                  className="product"
                  name="categoryId"
                  onChange={handleUpdateChange}
                >
                  {categories.map((category, key) => (
                    <option
                      className="option"
                      key={key}
                      value={category._id}
                      defaultValue={category.categoryName}
                    >
                      {category.categoryName}
                    </option>
                  ))}
                </select>
                <button className="submit">Submit</button>
              </form>
            </div>
          ) : null}
        </div>

        <div className="add_product">
          <button className="add_product" onClick={() => handleShowProduct()}>
            + Add Product
          </button>
          {showProduct ? (
            <div className="add_product_form">
              <form className="product_form">
                <label className="product_label">Product Name</label>
                <input
                  type="text"
                  className="product"
                  name="productName"
                  autoComplete="off"
                  onChange={handleChange}
                />
                <label className="product_label">Product Description</label>
                <input
                  type="text"
                  className="product"
                  name="productDescription"
                  autoComplete="off"
                  onChange={handleChange}
                />
                <label className="product_label">Product Image</label>
                <input
                  type="file"
                  className="product"
                  name="productImage"
                  autoComplete="off"
                  onChange={handleImageChange}
                />
                <label className="product_label">Product Price</label>
                <input
                  type="text"
                  className="product"
                  name="productPrice"
                  autoComplete="off"
                  onChange={handleChange}
                />
                <label className="product_label">Product Quantity</label>
                <input
                  type="text"
                  className="product"
                  name="productQuantity"
                  autoComplete="off"
                  onChange={handleChange}
                />
                <label className="product_label">Select Category</label>
                <select
                  className="product"
                  name="categoryId"
                  onChange={handleChange}
                >
                  {categories.map((category, key) => (
                    <option className="option" key={key} value={category._id}>
                      {category.categoryName}
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

export default ProductsAdmin;
