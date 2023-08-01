import React from 'react';
import { useState, useEffect } from 'react';
import { requestProduct } from '../../functions/request';

function ProductList({showBreakfast,addToSelectedProducts, decreaseFromSelectedProducts}){
    const [productsData, setProductsData] = useState([]);
    
    useEffect(()=>{
        async function fetchData() {
            const productsList = await requestProduct();

            setProductsData(productsList);
        }
        fetchData();
    }, []);

    function renderProductList(){
        let filteredProducts 
        if(showBreakfast){
            filteredProducts= productsData.filter(product => product.type === 'Desayuno');
           
        } else{
            filteredProducts= productsData.filter(product => product.type === 'Almuerzo');
           
        }
        return filteredProducts.map(product => (
        
            <div className='lg:p-5' key={product.id}>
            <img src={product.image} alt={product.name}  className=' lg:w-44   lg:h-44 border-2 border-secondary rounded-sm shadow-lg lg:p-2 '/>
            <p className='lg:text-3xl'>{product.name}</p>
            <p className='lg:text-3xl'>$ {product.price}</p>
            <button onClick={()=> {addToSelectedProducts(product)}}>+</button>
            <span>{product.quantity}</span>
            <button onClick={()=> {decreaseFromSelectedProducts(product)}}>-</button>
            
        </div>
        
        ));
    }
   
    return (
        <div className='lg:grid lg:grid-cols-2 lg:gap-20 lg:mt-10'>
            {renderProductList()}
        </div>
        
    );
}

export {ProductList};