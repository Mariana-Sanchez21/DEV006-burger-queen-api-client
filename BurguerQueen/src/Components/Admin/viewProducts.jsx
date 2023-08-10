import React from 'react';
import { useState, useEffect } from 'react';
import { requestProduct } from '../../functions/request';

function ViewProducts(){
    const [productsData, setProductsData] = useState([]);
    
    useEffect(()=>{
        async function fetchData() {
            try{
                const ViewProducts = await requestProduct();

                setProductsData(ViewProducts);
            } catch(error){
                console.log('Error al obtener los datos', error)
            }
            
        }
        fetchData();
    }, []);

    function renderProductList(){
         
        return productsData.map(product => (

        <div key={product.id}>
           <div className='flex lg:mt-5'> 
            <p className='lg:text-3xl font-retro2 lg:mr-6 md:text-xl md:ml-3'>{product.name}</p>
            <p className='lg:text-3xl font-retro2 md:text-xl md:ml-2'>${product.price}</p>
            </div>
            <p className='lg:text-3xl font-retro2 md:text-xl md:ml-2'>{product.type}</p>
            
        </div>
        
        ));
    }
   
    return (
        <div className='lg:grid lg:grid-cols-1 lg:gap-10 lg:mt-10'>
            {renderProductList()}
        </div>
        
    );
}

export {ViewProducts};