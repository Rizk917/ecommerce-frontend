import React, { useState, useEffect } from "react";
import "./carouselimg.css";
import axios from "axios";
import editImage from '../image/edit.png'
import deleteImage from '../image/delete.png'

function ImageCarousleAdmin() {
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [image, setProductImage] = useState('');

  // get images using axios
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/imageCarousel")
      .then((response) => {
        setImages(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [images]);

 

  const [uloadedImages, setAddProduct] = useState({
    altText: "",
    image: "",
  });

  // add product
  const handleImageChange = async (event) => {
    event.preventDefault();
    const image = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      setAddProduct({ ...uloadedImages, image: reader.result });
    };
  };
  

  const handleChange = async (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    let fieldValue = event.target.value;

    const newFormData = { ...uloadedImages };
    newFormData[fieldName] = fieldValue;

    setAddProduct(newFormData);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('image',image)
    formData.append("altText", uloadedImages.altText);
  
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
  
    try {
      const response = await axios.post("http://127.0.0.1:5000/imageCarousel", formData, config);
      setImages([...images, response.data]);
      setAddProduct({ altText: "", image: "" });
      setShowProduct(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  

  // Function for deleting  a product

  const handleDeleteProduct = async (id) => {
    const url = `http://127.0.0.1:5000/imageCarousel/${id}`;
    try {
      await axios.delete(url);
      setImages(images.filter((product) => product._id !== id));
      console.log("image deleted successfully!");
    } catch (error) {
      console.log(error);
    }
  };

 

  const [showProduct, setShowProduct] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);



  const handleShowProduct = () => {
    setShowProduct(!showProduct);
  };

  
  const handleUpdate = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('image', image || uloadedImages.image)
    formData.append("altText", uloadedImages.altText);
  
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
  
    try {
      const response = await axios.put(`http://127.0.0.1:5000/imageCarousel/${uloadedImages._id}`, formData, config);
      setImages(
        images.map((image) => (image._id === response.data._id ? response.data : image))
      );
      setAddProduct({ altText: "", image: "" });
      setShowUpdateForm(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };
    
  

  return (
    <div className="container2">
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
                <th>Images Name</th>
                <th>Images</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody className="table_tbody">
              {images
                .filter((imagesList) => {
                  if (!searchTerm) {
                    return imagesList;
                  } else if (
                    imagesList.altText
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return imagesList;
                  } else {
                    return null;
                  }
                })
                .map((imagesList, key) => {
                  return (
                    <tr className="table_tr" key={key}>
                      <td className="table_td">{imagesList.altText}</td>
                      <td className="table_td"><img src={imagesList.imageCarouselItem} alt="" /></td>
                      <td className="table_td">
                        <button
                          onClick={() => {
                            setShowUpdateForm(!showUpdateForm);
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
                          onClick={() => handleDeleteProduct(imagesList._id)}
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
          {/* {showUpdateForm ?  (
            <div className="update_product">
              <form className="product_form" >
                <label className="product_label">Product Name</label>
                <input
                  type="text"
                  className="product"
                  name="altText"
                />
                <label className="product_label">Product Description</label>
                <input
                  type="text"
                  className="product"
                  name="productDescription"
                />
                <label className="product_label">Product Image</label>
                <input
                  type="file"
                  className="product"
                  name="image"
                />
                <label className="product_label">Product Price</label>
                <input
                  type="text"
                  className="product"
                  name="productPrice"
                />
                <label className="product_label">Product Quantity</label>
                <input
                  type="text"
                  className="product"
                  name="productQuantity"
                  />
                <select
                  className="product"
                  name="categoryId"
                >
                  {categories.map((category, key) => (
                    <option
                      className="option"
                      key={key}
                      value={category._id}
                    >
                      {category.categoryName}
                    </option>
                  ))}
                </select>
                <button className="submit">Submit</button>
              </form>
            </div>
          ) : null} */}
        </div>

        <div className="add_product">
          <button className="add_product" onClick={() => handleShowProduct()}>
            + Add Product
          </button>
          {/* {showProduct ? (
            <div className="add_product_form">
              <form className="product_form">
                <label className="product_label">Product Name</label>
                <input
                  type="text"
                  className="product"
                  name="altText"
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
                  name="image"
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
          ) : null} */}
        </div>
      </div>
    </div>
  );
}

export default ImageCarousleAdmin;
