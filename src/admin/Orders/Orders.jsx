// import React, { useEffect, useState } from "react";
// const DashboardOrders = () => {
//   const [orders, setOrders] = useState([]);

//   const getOrders = async () => {
//     const response = await fetch("http://localhost:5000/order/");
//     const orders = await response.json();
//     setOrders(orders);
//   };
//   useEffect(()=>{
//     getOrders(), []
//   })

//   return (
//     <div>
//       <h1>Dashboard Orders</h1>
//       <table className="orders-table">
//         <thead>
//           <tr>
//             <th className="order-id">Order ID</th>
//             <th className="user-id">User ID</th>
//             <th className="user-name">User Name</th>
//             <th className="status">Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((order) => (
//             <tr key={order.id}>
//               <td className="order-id">{order.id}</td>
//               <td className="user-id">{order.userId}</td>
//               <td className="user-name">{order.userName}</td>
//               <td className="status">{order.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default DashboardOrders

