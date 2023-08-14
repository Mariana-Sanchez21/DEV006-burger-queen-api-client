import React from 'react';
import { useState, useEffect } from 'react';
import { requestProduct, requestDeleteProduct } from '../../functions/request';
import papelera from '../../assets/papelera.png';
import editar from '../../assets/editar.jpg'

function ViewProducts({productData, setProductData}){
    
    useEffect(()=>{
        async function fetchData() {
            try{
                const ViewProducts = await requestProduct();

                setProductData([...productData,...ViewProducts]);
            } catch(error){
                console.log('Error al obtener los datos', error)
            }
            
        }
        fetchData();
    }, []);
    const handleDeleteProduct = async(productId)=>{
        try{
            await requestDeleteProduct(productId);
            setProductData(productData.filter((product)=> product.id !== productId));
            console.log('Producto eliminado correctamente ')
        }catch(error){
            console.log('Error al eliminar producto', error)
        }
    };

    function renderProductList(){
         
        return productData.map(product => (
       <div className='border border-secondary'>
        <div key={product.id}>
           <div className='flex lg:mt-5'> 
            <p className='lg:text-3xl text-white font-retro2  lg:mr-6 md:text-xl md:ml-3'>{product.name}</p>
            <p className='lg:text-3xl text-white font-retro2 md:text-xl md:ml-2'>${product.price}</p>
            <div>
            <button >
            <img src={editar} alt="editar" className=' w-9 h-8 mt-3' />
          </button>
            <button onClick={()=> handleDeleteProduct(product.id)} >
            <img src={papelera} alt="papelera" className=' w-9 h-8 mt-3' />
          </button>
            </div>
            </div>
            <p className='lg:text-3xl text-white font-retro2 md:text-xl md:ml-2'>{product.type}</p>
            
        </div>
        </div>
        ));
    }
   
    return (
        <div className='lg:grid lg:grid-cols-1 lg:mt-10'>
            {renderProductList()}
        </div>
        
    );
}

export {ViewProducts};