import LogoBQ from '../../assets/LogoBQ.png'
import { ProductList } from './ProductList'
import { useState } from 'react'



function WaiterViewBreakfast(){
  const[showBreakfast, setShowBreakfast] = useState(true);
  const[selectedProducts, setSelectedProducts] = useState([]);
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
 
  const removeFromSelectedProducts = (product) => {
    const updatedProducts = [...selectedProducts];
    const existingProduct = updatedProducts.find((p) => p.id === product.id);
    if (existingProduct && existingProduct.quantity > 0) {
      existingProduct.quantity--;
    }
    setSelectedProducts(updatedProducts);
  };


  //Eliminar producto totalmente
  // const removeFromSelectedProducts= (product)=>{
  //   const updatedProducts = selectedProducts.filter((p)=>p.id!==product.id);
  //   setSelectedProducts(updatedProducts)
  // }

    return (
   <section>
 <nav>
 <div className='logoContainer'>
   <img src={LogoBQ} alt="logo" />
 </div>
 <ul>
   <li>Ordenes Listas</li>
   <li>Historial de Ordenes</li>
 </ul>
 </nav>
 <div className='Buttons'>
   <button>Nueva Orden</button>
    <button onClick={HandleShowBreakfast}>Desayuno</button>
    <button onClick={HandleShowLunch}>Almuerzo</button>
 </div>
<article>
<ProductList showBreakfast={showBreakfast} addToSelectedProducts={addToSelectedProducts}  removeFromSelectedProducts={removeFromSelectedProducts} />
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