import React, { useState, useEffect } from "react";
import "./carouselimg.css";
import axios from "axios";
import editImage from '../image/edit.png'
import deleteImage from '../image/delete.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function ImageCarousleAdmin() {
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [uploadedImage, setUploadedImage] = useState({
    altText: "",
    image: "",
  });
  const [showProduct, setShowProduct] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

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
  }, []);


  // handle product deletion
  const handleDeleteProduct = async (id) => {
    const url = `http://127.0.0.1:5000/imageCarousel/${id}`;
    try {
      await axios.delete(url);
      setImages(images.filter((product) => product._id !== id));
      // console.log("image deleted successfully!");
      toast.success(' Image deleted successfully!', {
        position: toast.POSITION.TOP_RIGHT
    });
    } catch (error) {
      toast.error('Error!', {
        position: toast.POSITION.TOP_RIGHT
    });
      console.log(error);
    }
  };

  // toggle show product form
  const handleShowProduct = () => {
    setShowProduct(!showProduct);
  };

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("altText", uploadedImage.altText);
    formData.append("image", uploadedImage.image);
    try {
      const res = await axios.post("http://127.0.0.1:5000/imageCarousel", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setImages([...images, res.data.data]);
      setShowProduct(false);
      setUploadedImage({ altText: "", image: "" });
      // console.log("Image added successfully!");
      toast.success(' Image added successfully!', {
        position: toast.POSITION.TOP_RIGHT
    });
    } catch (error) {
    <ToastContainer/>

      console.log(error);
    }
  };

  // handle input change
  const handleChange = (e) => {
    setUploadedImage({ ...uploadedImage, [e.target.name]: e.target.value });
  };

  // handle image change
  const handleImageChange = (e) => {
    setUploadedImage({ ...uploadedImage, image: e.target.files[0] });
  };

  return (
    <div className="container">
    <ToastContainer/>

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
       
        </div>

        <div className="add_product">
          <button className="add_product" onClick={() => handleShowProduct()}>
            + Add image
          </button>
          {showProduct ? (
            <div className="add_product_form">
              <form className="product_form">
              
                <label className="product_label">Carousel Image</label>
                <input
                  type="file"
                  className="product"
                  name="image"
                  autoComplete="off"
                  onChange={handleImageChange}
                />
                <label className="product_label">Image Name</label>
                <input
                  type="text"
                  className="product"
                  name="altText"
                  autoComplete="off"
                  onChange={handleChange}
                />
             
      

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

export default ImageCarousleAdmin;
