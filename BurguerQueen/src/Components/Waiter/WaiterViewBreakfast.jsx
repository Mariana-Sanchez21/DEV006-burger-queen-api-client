import LogoBQ from '../../assets/LogoBQ.png'
import papelera from '../../assets/papelera.png'
import { ProductList } from './ProductList'
import { useState } from 'react'
import { Modal } from '../Modal/Modal';
import { ClientForm } from '../ClientForm/ClientForm';



function WaiterViewBreakfast(){
  const[showBreakfast, setShowBreakfast] = useState(true);
  const[selectedProducts, setSelectedProducts] = useState([]);
  const[openModal, setOpenModal] = useState(false);
  const [clientInfo, setClientInfo] = useState('');
  const [clientTable, setClientTable] = useState('');
  
  
  const HandleShowBreakfast = () => {
    setShowBreakfast(true)
    console.log('Clic para desayuno')
  };
  const HandleShowLunch = () => {
    setShowBreakfast(false)
    console.log('Clic para Almuerzo')
  }
  const calculateTotal = () => {
    return selectedProducts.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  const onClientInformation=(name,table)=>{
    setClientInfo(name)
    setClientTable(table)
  }

  const clearOrder = () => {
    setSelectedProducts([]);
   
  };

  const clearClientInfo=()=>{
    setClientInfo('');
    setClientTable('');
  };

  const addToSelectedProducts = (product)=> {
    const updatedProducts = [...selectedProducts];
    const existingProduct = updatedProducts.find((p)=> p.id === product.id);
    if(existingProduct){
      const productQuantity=  existingProduct.quantity++
      localStorage.setItem('productQuantity', productQuantity)
    } else{ 
     updatedProducts.push({...product, quantity: 1})
     
    }
    setSelectedProducts(updatedProducts)
  };

  //Eliminar producto totalmente
  const removeFromSelectedProducts= (product)=>{
    const updatedProducts = selectedProducts.filter((p)=>p.id!==product.id);
   setSelectedProducts(updatedProducts)
    }
 
  const decreaseFromSelectedProducts = (product) => {
    const updatedProducts = [...selectedProducts];
    const existingProduct = updatedProducts.find((p) => p.id === product.id);
    if (existingProduct && existingProduct.quantity === 1) {
      removeFromSelectedProducts(product)
    } else if (existingProduct && existingProduct.quantity > 0) {
      existingProduct.quantity--;
      setSelectedProducts(updatedProducts)
  }

};

const handleOpenModal= () => {
  setOpenModal(true);
}

    return (
   <section className=' bg-black text-white '>
 <nav className=' bg-primary lg:h-28 flex justify-between text-black sm:w-full sm:h-20 font-bold'>
 <div className=' lg:h-24 lg:w-28 sm:h-16 sm:w-20 '>
   <img src={LogoBQ} alt="logo" />
 </div>
 <ul className=' flex lg:h-16 mt-8 lg:w-hForm mr-36 sm:h-9 sm:w-80 sm:ml-24 sm:justify-around bg-blue '> 
   <li className='lg:mb-20 sm:mb-24 border-red-600 lg:text-3xl font-retro2 lg:mr-20'>Ordenes Listas</li>
   <li className='lg:mb-20 sm:mb-24 border-red-600 lg:text-3xl font-retro2 lg:mr-20'>Historial de Ordenes</li>
 </ul>
 </nav> 
 <div className='Buttons border-black flex lg:justify-around lg:mt-6'>
   <button onClick={handleOpenModal} className='lg:mr-96 font-bold border-4 border-secondary rounded-sm shadow-lg hover:scale-125 lg:p-2 lg:text-xl font-retro1'>Nueva Orden</button>
   {openModal && (
    <Modal>
      <ClientForm setOpenModal={setOpenModal}  onClientInformation={onClientInformation}/>
    </Modal>
   )}
     <button onClick={HandleShowBreakfast} className='border-4 border-tertiary rounded-sm shadow-lg lg:-mr-20 lg:p-2 font-bold lg:text-xl font-retro1 hover:scale-125'>Desayuno</button>
    <button onClick={HandleShowLunch} className=' lg:mr-20 font-bold border-4 border-secondary rounded-sm shadow-lg lg:p-2 lg:text-xl font-retro1 hover:scale-125'>Almuerzo</button>
 </div>
 <section className='flex justify-between'> 
 <article className=' lg:w-3/5 '>
<ProductList showBreakfast={showBreakfast} addToSelectedProducts={addToSelectedProducts}  decreaseFromSelectedProducts={decreaseFromSelectedProducts} removeFromSelectedProducts={removeFromSelectedProducts}/>
</article>
<article className=' bg-primary h-auto  lg:w-h lg:mt-14 lg:mr-16 '>
  <div className='lg:w-1/4 '>
    <p className='font-retro1 lg:text-2xl whitespace-nowrap lg:ml-5 lg:mb-12 lg:mt-10 '>Resumen de la Orden</p>
    <div id='datosCliente flex'>
      <div>
      <p className=' whitespace-nowrap lg:text-xl lg:font-bold font-retro2 lg:ml-2' >Nombre del cliente: {clientInfo}</p>
      <p className=' whitespace-nowrap lg:text-xl lg:font-bold font-retro2 lg:ml-2'>Número de mesa: {clientTable}</p> 
      </div>
      <div className='lg:ml-96 lg:-mt-12 lg:mb-12'>
      <button className=" font-extrabold text-2xl bg-btn2 w-9" onClick={clearClientInfo} type="button">X</button>
      </div>
    </div>
    <table>
      <thead> 
        <tr>
          <th className='lg:pl-9 lg:mt-12 font-retro2 lg:text-xl'>Imagen</th>
          <th className='lg:pl-9 lg:mt-12 font-retro2 lg:text-xl'>Producto</th>
          <th className='lg:pl-9 lg:mt-12 font-retro2 lg:text-xl'>Cantidad</th>
          <th className='lg:pl-9 lg:mt-12 font-retro2 lg:text-xl'> Precio</th>
        </tr>
      </thead>
      <tbody className=' w-auto'>
       {selectedProducts.map((product, index)=>{
        return (
        <tr key={index}>
          <td className='lg:pl-9'>
            <img src={product.image} alt={product.name} className=' lg:p-2 lg:w-96 lg:h-20 lg:mt-5'/>
          </td>
          <td className='lg:pl-12 font-retro2 lg:text-lg'>{product.name}</td>
          <td className='lg:pl-16 font-retro2 lg:text-lg'>
            {product.quantity}
          </td>
          <td className='lg:pl-14 font-retro2 lg:text-lg'>${product.price * product.quantity}</td>  
          <td>
            <div className='bg-blue w-16 h-16'>
          <button onClick={()=> {removeFromSelectedProducts(product)}}>
            <img src={papelera} alt="papelera" className='   w-9 h-8 mt-3' />
          </button>
          </div>
          </td>

        </tr>
        );
       })}
      </tbody>
    </table>
  </div>
  <p className='font-retro2 lg:text-2xl lg:mt-12 lg:ml-9'>Total: ${calculateTotal()}</p>
  <div className='flex justify-between lg:w-96 lg: ml-20 lg:mt-10 lg:mb-5'>
<button className=" border-4 border-black rounded-md lg:w-44 lg:h-20 text-2xl  font-extrabold bg-btn1 hover:scale-125" type="submit">Mandar a cocina</button>
      <button className=" border-4 border-black rounded-md lg:w-44 lg:h-20 text-2xl  font-extrabold bg-btn2 hover:scale-125" type="button" onClick={clearOrder} >Cancelar Orden</button>
</div>
</article>

 </section>

   </section>

    )
}

export{WaiterViewBreakfast}