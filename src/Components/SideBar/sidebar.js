import React from 'react'
import "./sidebar.css"
import { Link } from 'react-router-dom'

function sidebar({isSidebarOpen}) {

return (
    <div>
      {isSidebarOpen ? <div className='sidebar'>
        <button type='button' className='button_sidebar'><p>HOME</p></button>
        <button type='button' className='button_sidebar'><p>Categories</p></button>
        <button type='button' className='button_sidebar'><Link to='/products'><p>Products</p></Link></button>
        <button type='button' className='button_sidebar'><p>Orders</p></button>
        <button type='button' className='button_sidebar'><p>Social Media</p></button>





    </div> :null  }
  
    </div>
)
}

export default sidebar



// import React from 'react'
// import "./sidebar.css"

// function sidebar(clicked) {


// return (
//     <div>
//     <div className='sidebar'>
//     <ul className='ul_sidebar'>
//         <li className='li_sidebar'><a href='#'>Home</a></li>
//         <li className='li_sidebar'>Categories</li>
//         <li className='li_sidebar'>Products</li>
//     </ul>
//     </div>
//     </div>
// )
// }

// export default sidebar