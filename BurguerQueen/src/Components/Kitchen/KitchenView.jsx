import { useState, useEffect, useRef } from "react";
import LogoBQ from '../../assets/LogoBQ.png';
import { requestGetOrders } from "../../functions/request";

function KitchenView() {
  const [ordersData, setOrdersData] = useState([]);

  const showOrders = async () => {
    try {
      const response = await requestGetOrders();
      setOrdersData(response);
      console.log(response);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    showOrders();
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsRemaining = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secondsRemaining.toString().padStart(2, '0')}`;
  };

  function orderDone(orderId) {
    setOrdersData(prevOrders => prevOrders.filter(order => order.id !== orderId));
  }

  const OrderTimer = ({ order }) => {
    
    const localStorageKey = `orderStartTime_${order.id}`;
    const [startTime, setStartTime] = useState(() => {
      const storedStartTime = parseFloat(localStorage.getItem(localStorageKey));
      return !isNaN(storedStartTime) ? storedStartTime : Date.now() / 1000;
    });

    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
      intervalRef.current = setInterval(() => {
        const currentTime = Date.now() / 1000;
        setElapsedTime(currentTime - startTime);
      }, 1000);

      return () => clearInterval(intervalRef.current);
    }, [startTime]);

    useEffect(() => {
      localStorage.setItem(localStorageKey, startTime.toString());
    }, [localStorageKey, startTime]);

    return (
      <p>Tiempo transcurrido: {formatTime(Math.floor(elapsedTime))}</p>
    );
  };

  return (
    <>
       <nav className='bg-primary lg:h-28 md:h-20 '>
        <div className='  lg:h-24 lg:w-28 md:h-14 md:w-20 sm:h-32  sm:w-44  '>
   <img className='' src={LogoBQ} alt="logo" />
 </div>
          <ul className='bg-gray lg:flex lg:items-center md:flex md:items-center'> 
            <li className='lg:ml-mtboton lg:pl-36 lg:-mt-16 lg:text-xl md:ml-72 md:-mt-6 md:text-2xl font-retro2'>Historial de Ordenes</li>
          </ul>
        </nav> 
      <main className="flex flex-col items-center">

        {ordersData.map((order, index) => (
      
          <article key={index} className="lg:mt-4 lg:w-40 md:mt-3  md:w-28">
            <div className="order-card bg-primary">
              <h2>Orden #{order.id}</h2>
              <p>Nombre del cliente: {order.clientName.clientName}</p>
              <p>Numero de mesa: {order.tableNumber}</p>
              <h3>Productos:</h3>
              <OrderTimer order={order} />
              <ul>
                {order.products.map((product, productIndex) => (
                  <li key={productIndex}>
                   {product.quantity} {product.name} 
                  </li>
                ))}
              </ul>
              <button onClick={() => orderDone(order.id)}>V</button>
            </div>
          </article>
         
        ))}
    
         
      </main>
     
    </>
  );
}

export { KitchenView };