import React, { useState, useEffect } from 'react';
import'./product.css'
import axios from 'axios';


function Product() {

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm,setSearchTerm] = useState("");

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
  const [addProduct,setAddProduct] = useState({
    productName:"",
    productDescription:"",
    productImage:"",
    productPrice:"",
    productQuantity:"",
    categoryId:""
  })
    

  // add product
  const handleChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute('name')  
    const fieldValue = event.target.value; 

    const newFormData = { ...addProduct};
    newFormData[fieldName] = fieldValue;

    setAddProduct(newFormData)

    
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const newProduct = {
      productName:addProduct.productName,
      productDescription:addProduct.productDescription,
      productImage:addProduct.productImage,
      productPrice:addProduct.productPrice,
      productQuantity:addProduct.productQuantity,
      categoryId:addProduct.categoryId
    };

    console.log(newProduct)
    
    axios
    .post('http://localhost:5000/products', newProduct)
    .then((response) => {
      setProducts([...products, response.data])
      console.log(products)
    })
    .catch((error) => {
      console.log(error)
    })

  
  }  


  // Function for deleting  a product
  const handleDeleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };




  // update products


  
  const [showProduct, setShowProduct] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);



  const handleShowProduct = () =>{
    setShowProduct(!showProduct)
  }

  return (
    <div className='container'>
      <div className='table_container'>
        <div className='search_table'>
        <div className="search">
        <input
            placeholder="Search By Product Name"
            onChange={(event) => {
              setSearchTerm(event.target.value)
            }}

        />
        </div>
        <table className='table'>
        <thead className='head_table'>
          <tr className='table_head_tr'>
            <th>Product Name</th>
            <th>Update</th>
            <th>Delete</th>


          </tr>
        </thead>
        
        <tbody className='table_tbody'>
          {
          products.filter((product) => {
            if(!searchTerm){
              return product
            }else if (product.productName.toLowerCase().includes(searchTerm.toLowerCase())){
              return product
            }else{
              return null
            }
          }).map((product, key) => {
            return (
              <tr  className='table_tr' key={key}>
              <td className='table_td'>{product.productName}</td>
              <td className='table_td'>
                <button onClick={() => {
                  setShowUpdateForm(!showUpdateForm);

                }}>
                <img src={process.env.PUBLIC_URL + '/pictures/edit.png'} alt='edit' className='edit' />

                </button>
              </td>
              <td className='table_td'>
                <button onClick={() => handleDeleteProduct(product.id)}>
                <img src={process.env.PUBLIC_URL + '/pictures/delete.png'} alt='delete' className='delete' />

                </button>
              </td>
            </tr>
            );
          })}
        
            
        </tbody>
      </table>
      {showUpdateForm ?(
        <div className='update_product'>
      <form className='product_form' >
            <label className='product_label'>Product Name</label>
            <input   type="text" className="product" name="name" />
            <label className='product_label'>Product Description</label>
            <input   type="text" className="product" name="description"/>
            <label className='product_label'>Product Image</label>
            <input   type="file" className="product" name="image" />
            <label className='product_label'>Product Price</label>
            <input   type="text" className="product" name="price"/>
            <label className='product_label'>Product Quantity</label>
            <input   type="text" className="product" name="quantity"/>
            <button className='submit'>Submit</button>
            
          </form>
      </div>
      ) : null}
      
        </div>
      
      <div className='add_product'>
      <button className='add_product' onClick={() => handleShowProduct()}>+ Add Product</button>
      {showProduct ? (
          <div className="add_product_form" >
          <form  className='product_form'>
            <label className='product_label'>Product Name</label>
            <input   type="text" className="product" name="productName"  autoComplete='off' onChange={handleChange}/>
            <label className='product_label'>Product Description</label>
            <input   type="text" className="product" name="productDescription"   autoComplete='off' onChange={handleChange} />
            <label className='product_label'>Product Image</label>
            <input   type="file" className="product" name="productImage"  autoComplete='off' onChange={handleChange} />
            <label className='product_label'>Product Price</label>
            <input   type="text" className="product" name="productPrice"  autoComplete='off' onChange={handleChange} />
            <label className='product_label'>Product Quantity</label>
            <input   type="text" className="product" name="productQuantity" autoComplete='off' onChange={handleChange}/>
            <label className='product_label'>Select Category</label>
            <select className='product' name='categoryId' onChange={handleChange}>
            {categories.map((category, key) => (
            <option className='option' key={key} value={category._id}>{category.categoryName}</option>
  ))}
</select>

            <button className='submit' onClick={handleSubmit}>Submit</button>
        
          </form>
        </div> 
      ): null}
  

      </div>
    
    </div>
    </div>
    
  );
}

export default Product;
