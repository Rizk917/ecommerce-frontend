
import React,{useEffect, useState} from 'react'
import './CartComponent.css'
export default function CartComponent() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Item 1', price: 10, quantity: 1 },
    { id: 2, name: 'Item 2', price: 15, quantity: 1 },
    { id: 3, name: 'Item 3', price: 20, quantity: 1 },
  ]);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:5000/acart');
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  console.log(data)

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.productPrice * item.productQuantity, 0);
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  return (
    <div className="cart-page">
      <h1 className="cart-page__title">Cart</h1>
      <table className="cart-page__table">
        <thead>
          <tr>
            <th className="cart-page__table-header">Name</th>
            <th className="cart-page__table-header">Price</th>
            <th className="cart-page__table-header">Quantity</th>
            <th className="cart-page__table-header">Total</th>
            <th className="cart-page__table-header"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) =>  (
            <tr key={item._id} className="cart-page__table-row">
             { item.products.forEach((product) => {
              <td className="cart-page__table-cell">{product.product}</td>
              {/* <td className="cart-page__table-cell">${parseFloat(item.productPrice.$numberDecimal).toFixed(2)}</td> */}
              <td className="cart-page__table-cell">
                <input
                  type="number"
                  min="1"
                  value={product.quantity}
                  onChange={(event) => handleQuantityChange(item.id, parseInt(event.target.value))}
                  className="cart-page__quantity-input"
                />
              </td>
              {/* <td className="cart-page__table-cell">${parseFloat(item.productPrice.$numberDecimal).toFixed(2)* item.productQuantity}</td> */}
              <td className="cart-page__table-cell">
                <button className="cart-page__remove-button" onClick={() => handleRemoveItem(item.id)}>Remove</button>
              </td>})}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="cart-page__table-cell cart-page__table-cell--total">Total</td>
            <td className="cart-page__table-cell cart-page__table-cell--total"></td>
            <td className="cart-page__table-cell cart-page__table-cell--total"></td>
            <td className="cart-page__table-cell cart-page__table-cell--total">${getTotalPrice()}</td>
            <td className="cart-page__table-cell cart-page__table-cell--total"></td>
          </tr>
          <tr>
            <td className="cart-page__table-cell" colSpan="5">
              <button className="cart-page__checkout-button">Proceed to Checkout</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}


