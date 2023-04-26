import React from "react";
import Select from "react-select";
import './shopComponent.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Chocolate from "../../images/chocolate1.png";


const data = [
  {value:"jack", label:"jabbbck"},
  {value:"jjjjjjj", label:"jabbbbck"},
  {value:"jayyyyck", label:"jahjhck"},
]

const colorStyles = {
  control: (styles) => ({...styles, backgroundColor: "white"}),
  option: (styles, {data, isDisabled, isFocused, isSelected,}) => {
    return {...styles, color: 'red',
    ':hover': {
      backgroundColor: 'blue',
      color:'white' // replace with your desired background color
    },
  
  };
  },
  
}


function ShopComponent() {
  

  return (
    <div className="shop_product">
      <div className="select">
      <Select options={data} className='select_categories' placeholder='All Categories' styles={colorStyles}/>
    </div>

    <div className="product_search">
      <div className="search"></div>
      <div className="container">
  <div className="row">
    <div className="col-md-2">
      <div class="card" style={{width: '16rem'}}>
        <img src={Chocolate} class="card-img-top" alt="..."/>
        <div class="card-body">
          <h5 class="card-title">Balik</h5>
          <p class="card-text">Balik Kraker </p>
          <a href="#" class="btn btn-primary">Add To Kart</a>
        </div>
      </div> 
    </div>
    <div className="col-md-2">
      <div class="card" style={{width: '16rem'}}>
        <img src={Chocolate} class="card-img-top" alt="..."/>
        <div class="card-body">
          <h5 class="card-title">Balik</h5>
          <p class="card-text">Balik Kraker </p>
          <a href="#" class="btn btn-primary">Add To Kart</a>
        </div>
      </div> 
    </div>
    <div className="col-md-2">
      <div class="card" style={{width: '16rem'}}>
        <img src={Chocolate} class="card-img-top" alt="..."/>
        <div class="card-body">
          <h5 class="card-title">Balik</h5>
          <p class="card-text">Balik Kraker </p>
          <a href="#" class="btn btn-primary">Add To Kart</a>
        </div>
      </div> 
    </div>
    <div className="col-md-2">
      <div class="card" style={{width: '16rem'}}>
        <img src={Chocolate} class="card-img-top" alt="..."/>
        <div class="card-body">
          <h5 class="card-title">Balik</h5>
          <p class="card-text">Balik Kraker </p>
          <a href="#" class="btn btn-primary">Add To Kart</a>
        </div>
      </div> 
    </div>
    <div className="col-md-2">
      <div class="card" style={{width: '16rem'}}>
        <img src={Chocolate} class="card-img-top" alt="..."/>
        <div class="card-body">
          <h5 class="card-title">Balik</h5>
          <p class="card-text">Balik Kraker </p>
          <a href="#" class="btn btn-primary">Add To Kart</a>
        </div>
      </div> 
    </div>
    
  </div>
</div>
      
    </div>
    </div>
    
    
  )
}

export default ShopComponent


