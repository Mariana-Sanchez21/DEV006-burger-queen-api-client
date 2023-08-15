import React, { useState } from 'react';
import { useEffect } from 'react';
import { requestProduct, requestDeleteProduct,requestUpdateProduct } from '../../functions/request';
import papelera from '../../assets/papelera.png';
import editar from '../../assets/editar.jpg'

function ViewProducts({productData, setProductData}){
    const[editProductId,setEditProductId]= useState(null);
    const [editName, setEditName] = useState('');
    const [editPrice, setEditPrice ]=useState('');
    const[editType,setEditType]= useState('');

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

   const handleEditProduct = (product)=>{
    setEditProductId(product.id);
    setEditName(product.name);
    setEditPrice(product.price);
    setEditType(product.type);
   };

   const handleSaveProduct = async()=>{
    try{
        await requestUpdateProduct(editProductId, {
            name: editName,
            price: editPrice,
            type : editType,
        });
        const updatedProductData = productData.map((product)=> {
            if(product.id === editProductId ){
                return {
                    ...product,
                    name: editName,
                    price: editPrice,
                    type: editType,
                };
            }
            return product;
        });
        setProductData(updatedProductData);
        setEditProductId(null);
        setEditName('');
        setEditPrice('');
        setEditType('');
        console.log('Producto actualizado correctamente')
    }catch(error){
        console.log('Error al actualizar producto', error)
    }
   };

   const handleCancelEdit = () => {
    setEditProductId(null);
    setEditName('');
    setEditPrice('');
    setEditType('');
};


    function renderProductList(){
        if(!productData){
            return null;
         }
         return productData.map((product) => (
            <div className='border border-secondary' key={product.id}>
                {editProductId === product.id ? (
                    <div className='flex lg:mt-5'>
                        <input
                            className='lg:w-4/6 lg:h-14 lg:ml-32 lg:mt-4 text-center text-black font-retro2 text-lg md:w-5/6 md:h-14 md:ml-14'
                            type='text'
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                        />
                        <input
                            className='lg:w-4/6 lg:h-14 lg:ml-32 lg:mt-4 text-center text-black font-retro2 text-lg md:w-5/6 md:h-14 md:ml-14'
                            type='text'
                            value={editPrice}
                            onChange={(e) => setEditPrice(e.target.value)}
                        />
                        <input
                            className='lg:w-4/6 lg:h-14 lg:ml-32 lg:mt-4 text-center text-black font-retro2 text-lg md:w-5/6 md:h-14 md:ml-14'
                            type='text'
                            value={editType}
                            onChange={(e) => setEditType(e.target.value)}
                        />
                        <div>
                            <button onClick={handleSaveProduct}>
                                <img src={editar} alt='editar' className='w-9 h-8 mt-3' />
                            </button>
                            <button onClick={handleCancelEdit}>
                                <img src={papelera} alt='papelera' className='w-9 h-8 mt-3' />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className='flex lg:mt-5'>
                        <p className='lg:text-3xl text-white font-retro2 lg:mr-6 md:text-xl md:ml-3'>{product.name}</p>
                        <p className='lg:text-3xl text-white font-retro2 md:text-xl md:ml-2'>${product.price}</p>
                        <div>
                            <button onClick={() => handleEditProduct(product)}>
                                <img src={editar} alt='editar' className='w-9 h-8 mt-3' />
                            </button>
                            <button onClick={() => handleDeleteProduct(product.id)}>
                                <img src={papelera} alt='papelera' className='w-9 h-8 mt-3' />
                            </button>
                        </div>
                    </div>
                )}
                <p className='lg:text-3xl text-white font-retro2 md:text-xl md:ml-2'>{product.type}</p>
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