import React from 'react';
import { useState, useEffect } from 'react';
import { requestProduct } from '../../functions/request';

function ProductList({showBreakfast,addToSelectedProducts, removeFromSelectedProducts}){
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
        
            <div key={product.id}>
            <img src={product.image} alt={product.name}  className='lg:w-36  lg:h-36'/>
            <p>{product.name}</p>
            <p>$ {product.price}</p>
            <button onClick={()=> {addToSelectedProducts(product)}}>+</button>
            <span>{product.quantity}</span>
            <button onClick={()=> {removeFromSelectedProducts(product)}}>-</button>
            
        </div>
        
        ));
    }
   
    return (
        <div>
            {renderProductList()}
        </div>
        
    );
}

export {ProductList};