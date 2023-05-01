import React, { useState, useEffect } from "react";
import "./product.css";
import axios from "axios";
import editImage from "../image/edit.png";
import deleteImage from "../image/delete.png";

function ProductsAdmin() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productsById, setProductsById] = useState([]);

  //get products by id
  const editProduct = async (id) => {
    try {
      const url = `http://localhost:5000/products/${id}`;
      await axios.get(url).then((response) => {
        setProductsById(response.data.data);
        setUpdateProduct(response.data.data);
        setShowUpdateForm(true);
        console.log(productsById);
      });
    } catch (error) {
      console.log(error);
    }
  };

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
  }, []);

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
  }, []);

  // add products to database

  const [addProduct, setAddProduct] = useState({
    productName: "",
    productDescription: "",
    productImage: "",
    productPrice: "",
    productQuantity: "",
    categoryId: "",
  });

  const handleImageChange = async (event) => {
    event.preventDefault();
    setProductImage(event.target.files[0]);
  };

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
    formData.append("productImage", productImage);
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

  //update products

  const [productUpdateImage, setProductUpdateImage] = useState("");

  const [updateProduct, setUpdateProduct] = useState({
    productName: "",
    productDescription: "",
    productImage: "",
    productPrice: "",
    productQuantity: "",
    categoryId: "",
  });

  const handleUpdateChange = async (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    let fieldValue = event.target.value;
    const newFormData = { ...updateProduct };
    newFormData[fieldName] = fieldValue;
    setUpdateProduct(newFormData);
  };
  const handleUpdateProduct = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("productImage", productUpdateImage);
    formData.append("productName", updateProduct.productName);
    formData.append("productDescription", updateProduct.productDescription);
    formData.append("productPrice", updateProduct.productPrice);
    formData.append("productQuantity", updateProduct.productQuantity);
    formData.append("categoryId", String(updateProduct.categoryId));

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    axios
      .put(
        `http://localhost:5000/products/${productsById._id}`,
        formData,
        config
      )
      .then(() => {
        console.log("product updated successfully");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
    setShowUpdateForm(false);
  };

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
                            editProduct(product._id);
                          }}
                        >
                          <img src={editImage} alt="edit" className="edit" />
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
          {showUpdateForm && updateProduct ? (
            <div className="update_product">
              <form className="product_form" onSubmit={handleUpdateProduct}>
                <label className="product_label">Product Name</label>
                <input
                  type="text"
                  className="product"
                  name="productName"
                  onChange={(e) => handleUpdateChange(e)}
                  value={updateProduct.productName}
                />
                <label className="product_label">Product Description</label>
                <input
                  type="text"
                  className="product"
                  name="productDescription"
                  onChange={(e) => handleUpdateChange(e)}
                  value={updateProduct.productDescription}
                />
                <label className="product_label">Product Image</label>
                <input
                  type="file"
                  className="product"
                  name="productImage"
                  onChange={(e) => handleImageChange(e)}
                  value={updateProduct.productImage.files}
                />
                <label className="product_label">Product Price</label>
                <input
                  type="text"
                  className="product"
                  name="productPrice"
                  onChange={(e) => handleUpdateChange(e)}
                  value={updateProduct.productPrice}
                />
                <label className="product_label">Product Quantity</label>
                <input
                  type="text"
                  className="product"
                  name="productQuantity"
                  onChange={(e) => handleUpdateChange(e)}
                  value={updateProduct.productQuantity}
                />
                <select
                  className="product"
                  name="categoryId"
                  onChange={(e) => handleUpdateChange(e)}
                >
                  {categories.map((category, key) => (
                    <option className="option" key={key} value={category._id}>
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
