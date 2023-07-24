import React from 'react';
import { useState, useEffect } from 'react';
import { requestProduct } from '../../functions/request';

function ProductList(){
    const [productsData, setProductsData] = useState([]);

    useEffect(()=>{
        async function fetchData() {
            const productsList = await requestProduct();

            setProductsData(productsList);
        }
        fetchData();
    }, []);

    function renderProductList(){
        const filteredProducts = productsData.filter(product => product.type === 'Desayuno');
        return filteredProducts.map(product => (
            <>
            <div key={product.id}>
            <img src={product.image} alt={product.name} />
            <p>{product.name}</p>
            <p>{product.price}</p>
            
        </div>
            </>
        ));
    }
    return (
        <div>
            {renderProductList()}
        </div>
        
    );
}

export {ProductList};