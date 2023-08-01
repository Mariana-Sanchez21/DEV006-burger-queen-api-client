import LogoBQ from '../../assets/LogoBQ.png'
import { ProductList } from './ProductList'
import { useState } from 'react'
import { Modal } from '../Modal/Modal';
import { ClientForm } from '../ClientForm/ClientForm';



function WaiterViewBreakfast(){
  const[showBreakfast, setShowBreakfast] = useState(true);
  const[selectedProducts, setSelectedProducts] = useState([]);
  const[openModal, setOpenModal] = useState(false);
  
  
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
 <div className=' lg:h-24 lg:w-28 sm:h-16 sm:w-20 fixed'>
   <img src={LogoBQ} alt="logo" />
 </div>
 <ul className=' flex lg:justify-between lg:h-16 mt-8 lg:w-h  lg:ml-96  sm:h-9 sm:w-80 sm:ml-24 sm:justify-around'> 
   <li className='lg:mb-20 sm:mb-24 border-red-600 lg:text-3xl'>Ordenes Listas</li>
   <li className='lg:mb-20 sm:mb-24 border-red-600 lg:text-xl'>Historial de Ordenes</li>
 </ul>
 </nav>
 <div className='Buttons border-black flex lg:justify-around lg:mt-6'>
   <button onClick={handleOpenModal} className='lg:mr-96 font-bold border-2 border-secondary rounded-sm shadow-lg lg:p-2 lg:text-3xl'>Nueva Orden</button>
   {openModal && (
    <Modal>
      <ClientForm setOpenModal={setOpenModal}/>
    </Modal>
   )}
    <button onClick={HandleShowBreakfast} className='border-2 border-tertiary rounded-sm shadow-lg lg:-mr-20 lg:p-2 font-bold lg:text-3xl'>Desayuno</button>
    <button onClick={HandleShowLunch} className=' lg:mr-20 font-bold border-2 border-secondary rounded-sm shadow-lg lg:p-2 lg:text-3xl'>Almuerzo</button>
 </div>
<article className=' lg:w-3/5 '>
<ProductList showBreakfast={showBreakfast} addToSelectedProducts={addToSelectedProducts}  decreaseFromSelectedProducts={decreaseFromSelectedProducts} removeFromSelectedProducts={removeFromSelectedProducts}/>
</article>
<article className='flex'>
  <div className='lg:w-1/4'>
    <p>Resumen de la Orden</p>
    <table>
      <thead>
        <tr>
          <th>Imagen</th>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Precio</th>
        </tr>
      </thead>
      <tbody>
       {selectedProducts.map((product, index)=>{
        return (
        <tr key={index}>
          <td>
            <img src={product.image} alt={product.name} className=' border-secondary rounded-sm shadow-lg lg:p-2 lg:w-36 lg:h-36 border-2'/>
          </td>
          <td>{product.name}</td>
          <td>
            {product.quantity}
          </td>
          <td>${product.price * product.quantity}</td>
          <td>
          <button onClick={()=> {removeFromSelectedProducts(product)}}>X</button>
          </td>

        </tr>
        );
       })};
      </tbody>
    </table>
  </div>
  <p>Total: ${calculateTotal()}</p>
</article>
   </section>

    )
}

export{WaiterViewBreakfast}