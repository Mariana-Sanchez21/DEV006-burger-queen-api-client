import React, { useState, useEffect, useRef } from "react";
import LogoBQ from '../../assets/LogoBQ.png';
import { requestGetOrders, sendOrderToDatabase } from "../../functions/request";
import warning from '../../assets/warning.png';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import { useNavigate} from "react-router-dom";

function KitchenView() {
  const history = useNavigate();
  const [ordersData, setOrdersData] = useState([]);
  const [completedOrders, setCompletedOrders] = useState({});

  function orderDone(orderId, clientInfo, clientTable, selectedProducts) {
    const token = localStorage.getItem('token');
    const completionTime = Date.now() / 1000; 
    history.push(`/ReadyToServe?completionTime=${completionTime}`);
    sendOrderToDatabase(orderId, clientInfo, clientTable, selectedProducts, token)
      .then(() => {
        Swal.fire({
          title: 'Estás seguro que deseas completar esta orden?',
          text: "No podrás deshacer esta acción!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#4ABC78',
          cancelButtonColor: '#D64550',
          confirmButtonText: 'Si, completar orden!',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            setOrdersData(prevOrders => prevOrders.filter(order => order.id !== orderId));
            console.log('Setting completion time:', orderId, completionTime);
            setCompletedOrders(prevCompletedOrders => ({
              ...prevCompletedOrders,
              [orderId]: completionTime,
            }));
            Swal.fire(
              'Enviado!',
              'Orden completada.',
              'success'
            );
          }
        });
      })
      .catch(error => {
        console.error('Error al completar la orden:', error.message);
      });
  }

  const showOrders = async () => {
    try {
      const response = await requestGetOrders();
      const incompleteOrders = response.filter(order => order.status !== 'delivered' && !completedOrders[order.id]);
      setOrdersData(incompleteOrders);
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

  const OrderTimer = ({ order }) => {
    console.log("Current Order:", order); 
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

    const completionTime = completedOrders[order.id]; 
    const elapsedTimeWithCompletion = completionTime ? completionTime - startTime : elapsedTime;

    return (
      <p className="font-retro2 lg:ml-64 md:ml-44">Tiempo transcurrido: {formatTime(Math.floor(elapsedTimeWithCompletion))}</p>
    );
  };

  return (
    <>
      <nav className='bg-primary lg:h-28 md:h-20'>
        <div className='lg:h-24 lg:w-28 md:h-14 md:w-20 sm:h-32 sm:w-44'>
          <img className='' src={LogoBQ} alt="logo" />
        </div>
        <ul className='bg-gray lg:flex lg:items-center md:flex md:items-center'>
          <li className='lg:ml-mtboton lg:pl-36 lg:-mt-16 lg:text-xl md:ml-72 md:-mt-6 md:text-2xl font-retro2'>
            <Link to='/ReadyToServe'>Ordenes listas</Link>
          </li>
        </ul>
      </nav>
      <main className="bg-black flex flex-col items-center">
        {ordersData.map((order, index) => (
          <article key={index} className="lg:mt-4 lg:w-hForm md:mt-3 md:w-h relative md:mb-7 lg:">
            <div className="order-card rounded-2xl bg-primary md:pb-2 lg:p-3">
              <div className="lg:mt-3 md:mt-3">
                <h2 className="lg:ml-80 lg:mt-10 md:ml-60 lg:text-3xl md:text-2xl md:mt-10 font-retro2">Orden #{order.id}</h2>
              </div>
              <OrderTimer order={order} />
              <div className="flex flex-row lg:mt-3 md:mt-5 justify-between">
                <p className="font-retro2 lg:text-xl md:text-lg">Nombre del cliente: {order.clientName.clientName}</p>
                <p className="font-retro2 lg:mr-4 md:mr-4 lg:text-xl md:text-lg">Numero de mesa: {order.tableNumber}</p>
              </div>
              <div className="lg:ml-4 md:ml-5">
                <h3 className="font-retro2 lg:text-xl md:text-lg">Productos:</h3>
                <ul className="">
                  {order.products.map((product, productIndex) => (
                    <li className="font-retro2" key={productIndex}>
                      {product.quantity} {product.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <button
              className="lg:h-20 lg:w-16 md:h-12 md:w-10 md:-mb-28 md:mt-6 absolute top-4 right-4"
              onClick={() => {
                orderDone(order.id, order.clientInfo, order.clientTable, order.selectedProducts);
              }}
            >
              <img className="md:w-10" src={warning} alt="warning" />
            </button>
          </article>
        ))}
      </main>
    </>
  );
}

export { KitchenView };
