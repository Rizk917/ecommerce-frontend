import React, { useState, useEffect } from "react";
import "./categories.css";
import axios from "axios";
import editImage from '../image/edit.png'
import deleteImage from '../image/delete.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function CategoriesAdmin() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // get categories using axios
  useEffect(() => {
    axios
      .get("https://ecommerce-backend-5k4d.onrender.com/categories")
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [categories]);

  // add category
  const [addCategory, setAddCategory] = useState({
    categoryName: "",
  });
  const handleChangeCategory = async (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    let fieldValue = event.target.value;
    const newFormData = { ...addCategory };
    newFormData[fieldName] = fieldValue;

    setAddCategory(newFormData);
  };

  const handleSubmitCategory = (event) => {
    event.preventDefault();

    const data = {
      categoryName: addCategory.categoryName,
    };

    const config = {
      headers: { "content-type": "application/json" },
    };
    axios
      .post(`https://ecommerce-backend-5k4d.onrender.com/categories`, data, config)
      .then((response) => {
        setCategories([...categories, response.data]);
        // window.alert("category created successfully!");
        
        toast.success(' category created successfully!', {
          position: toast.POSITION.TOP_RIGHT
      });
      })
      .catch((error) => {
        toast.error('Error!', {
          position: toast.POSITION.TOP_RIGHT
      });
        console.log(error.response.data);
      });
    handleShowCategory();
  };

  // Function for deleting  a product

  const handleDeleteCategory = async (id) => {
    const url = `https://ecommerce-backend-5k4d.onrender.com/categories/${id}`;
    
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this category?");
      if(confirmDelete){
      await axios.delete(url);
      // setCategories(categories.filter(category => category._id !== id));
      console.log("Product deleted successfully!");
      toast.success(' Deleted successfully!', {
        position: toast.POSITION.TOP_RIGHT
    });
    } }
    catch (error) {
      toast.error('Error!', {
        position: toast.POSITION.TOP_RIGHT
    });
      console.log(error);
    }
  };
  //update category
  const handleUpdateCategory = (event) => {
    event.preventDefault();

    const updateCategory = {
      categoryName: event.target.categoryName.value,
    };
    axios
      .put(
        `https://ecommerce-backend-5k4d.onrender.com/categories/${currentCategory._id}`,
        updateCategory
      )
      .then(() => {
        console.log("product updated successfully");
        // window.alert("category updated successfully!");
        toast.success(' category updated successfully!', {
          position: toast.POSITION.TOP_RIGHT
      });

      })
      .catch((error) => {
        console.log(error);
      });
    handleShowUpdateCategory();
  };

  const [currentCategory, setCurrentCategory] = useState(null);
  const [showCategory, setShowCategory] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const handleShowCategory = () => {
    setShowCategory(!showCategory);
  };

  const handleShowUpdateCategory = () => {
    setShowUpdateForm(!showUpdateForm);
  };

  return (
    <div className="container">
      <ToastContainer/>
      <div className="page_name">
        <h1>Categories</h1>
      </div>
      <div className="table_container">
        <div className="search_table">
          <div className="search">
            <input
              placeholder="Search By Category Name"
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            />
          </div>
          <table className="table">
            <thead className="head_table">
              <tr className="table_head_tr">
                <th>Category Name</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody className="table_tbody">
              {categories
                .filter((category) => {
                  if (!searchTerm) {
                    return category;
                  } else if (
                    category.categoryName
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return category;
                  } else {
                    return null;
                  }
                })
                .map((category, key) => {
                  return (
                    <tr className="table_tr" key={key}>
                      <td className="table_td">{category.categoryName}</td>
                      <td className="table_td">
                        <button
                          onClick={() => {
                            setShowUpdateForm(!showUpdateForm);
                            setCurrentCategory(category);
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
                          onClick={() => handleDeleteCategory(category._id)}
                        >
                          <img
                            src={
                              deleteImage
                            }
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
          {showUpdateForm && currentCategory ? (
            <div className="update_category">
              <form className="category_form" onSubmit={handleUpdateCategory}>
                <label className="category_label">Category Name</label>
                <input
                  type="text"
                  className="category"
                  name="categoryName"
                  defaultValue={currentCategory.categoryName}
                />
                <button className="submit">Submit</button>
              </form>
            </div>
          ) : null}
        </div>

        <div className="add_category">
          <button className="add_category" onClick={() => handleShowCategory()}>
            + Add category
          </button>
          {showCategory ? (
            <div className="add_category_form">
              <form className="category_form" onSubmit={handleSubmitCategory}>
                <label className="category_label">category Name</label>
                <input
                  type="text"
                  className="category"
                  name="categoryName"
                  autoComplete="off"
                  onChange={handleChangeCategory}
                />
                <button className="submit">Submit</button>
              </form>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
export default CategoriesAdmin;
