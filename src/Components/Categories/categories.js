import React, { useState, useEffect } from 'react';
import './categories.css'
import axios from 'axios';

function Category() {

  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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


  
// add category
const [addCategory,setAddCategory] = useState({
    categoryName:"",
    })
  const handleChangeCategory = async (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute('name');
    let fieldValue = event.target.value;
    const newFormData = {...addCategory};
    newFormData[fieldName] = fieldValue;

    setAddCategory(newFormData)

  };

  const handleSubmitCategory = (event) => {
    event.preventDefault();

    const data = {
      categoryName: addCategory.categoryName
    };
      

    const config = {
      headers:{'content-type':"application/json"}
    };
    axios
    .post(`http://localhost:5000/categories`, data, config)
    .then((response) => {
      setCategories([...categories, response.data])
      console.log(categories)
    })
    .catch((error) => {
      console.log(error.response.data)
    })
    handleShowCategory();

  }


  // Function for deleting  a product

  
  const handleDeleteCategory = async (id) => {
    const url = `http://localhost:5000/categories/${id}`;
    try{
      await axios.delete(url);
      setCategories(categories.filter(category => category._id !== id));
      console.log('Product deleted successfully!');
    }
    catch(error){
      console.log(error)
    }
    
  };


    



  

  
  const [showCategory, setShowCategory] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);



  const handleShowCategory = () =>{
    setShowCategory(!showCategory)
  }

  return (
    <div className='container'>
      <div className='table_container'>
        <div className='search_table'>
        <div className="search">
        <input
            placeholder="Search By Category Name"
            onChange={(event) => {
              setSearchTerm(event.target.value)
            }}

        />
        </div>
        <table className='table'>
        <thead className='head_table'>
          <tr className='table_head_tr'>
            <th>Category Name</th>
            <th>Update</th>
            <th>Delete</th>


          </tr>
        </thead>
        
        <tbody className='table_tbody'>
          {
          categories.filter((category) => {
            if(!searchTerm){
              return category
            }else if (category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())){
              return category
            }else{
              return null
            }
          }).map((category, key) => {
            return (
              <tr  className='table_tr' key={key}>
              <td className='table_td'>{category.categoryName}</td>
              <td className='table_td'>
                <button onClick={() => {
                  setShowUpdateForm(!showUpdateForm);

                }}>
                <img src={process.env.PUBLIC_URL + '/pictures/edit.png'} alt='edit' className='edit' />

                </button>
              </td>
              <td className='table_td'>
                <button onClick={() => handleDeleteCategory(category._id)}>
                <img src={process.env.PUBLIC_URL + '/pictures/delete.png'} alt='delete' className='delete' />

                </button>
              </td>
            </tr>
            );
          })}
        
            
        </tbody>
      </table>
      {showUpdateForm ?(
        <div className='update_category'>
      <form className='category_form' >
            <label className='category_label'>Category Name</label>
            <input   type="text" className="category" name="name" />
            <button className='submit'>Submit</button>
            
          </form>
      </div>
      ) : null}
      
        </div>
      
      <div className='add_category'>
      <button className='add_category' onClick={() => handleShowCategory()}>+ Add category</button>
      {showCategory ? (
          <div className="add_category_form" >
          <form  className='category_form' onSubmit={handleSubmitCategory}>
            <label className='category_label'>category Name</label>
            <input   type="text" className="category" name="categoryName"  autoComplete='off' onChange={handleChangeCategory}/>
            <button className='submit'>Submit</button>
        
          </form>
        </div> 
      ): null}
  

      </div>
    
    </div>
    </div>
    
  );

      }
export default Category;


