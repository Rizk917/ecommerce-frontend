
import React from 'react'
import { Link } from 'react-router-dom'

const Cart = () => {
  return (
    <div>
      <Link to= "/checkout" className= "button">
        Checkout
      </Link>
    </div>
  )
}

export default Cart
