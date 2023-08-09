import { requestGetOrders } from "../../functions/request";
import { useState } from "react";
function KitchenView() {
  const [ordersData, setOrdersData] = useState([]);
  const handleShowOrders = async () => {
    try {
      const response = await requestGetOrders();
      setOrdersData(response);
      console.log(response);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div>
      <p> Vista Cocina</p>
      <button onClick={handleShowOrders}>click para ver ordenes</button>
      {ordersData.map((order, index) => (
        <div key={index} className="order-card">
          <h2>Order #{order.id}</h2>
          <p>Client Name: {order.clientName.clientName}</p>
          <p>Table Number: {order.tableNumber}</p>
          <h3>Products:</h3>
          <ul>
            {order.products.map((product, productIndex) => (
              <li key={productIndex}>
                {product.name} - ${product.price}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
export { KitchenView };