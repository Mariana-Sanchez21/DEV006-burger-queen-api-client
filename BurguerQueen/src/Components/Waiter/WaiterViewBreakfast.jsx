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
   <section className=' bg-black'>
 <nav className=' bg-primary lg:h-28 flex justify-between'>
 <div className=' lg:h-24 lg:w-28 fixed'>
   <img src={LogoBQ} alt="logo" />
 </div>
 <ul className=' flex justify-between lg:h-16 mt-8 lg:w-h   ml-h  bg-white'> 
   <li className='lg:mb-20 border-red-600'>Ordenes Listas</li>
   <li className='lg:mb-20 border-red-600'>Historial de Ordenes</li>
 </ul>
 </nav>
 <div className='Buttons border-black bg-red-400'>
   <button onClick={handleOpenModal}>Nueva Orden</button>
   {openModal && (
    <Modal>
      <ClientForm setOpenModal={setOpenModal}/>
    </Modal>
   )}
    <button onClick={HandleShowBreakfast}>Desayuno</button>
    <button onClick={HandleShowLunch}>Almuerzo</button>
 </div>
<article>
<ProductList showBreakfast={showBreakfast} addToSelectedProducts={addToSelectedProducts}  decreaseFromSelectedProducts={decreaseFromSelectedProducts} removeFromSelectedProducts={removeFromSelectedProducts}/>
</article>
<article>
  <div>
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
            <img src={product.image} alt={product.name} className='lg:w-36 lg:h-36'/>
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