import React from 'react';
import {  useEffect } from 'react';
import { requestGetUser, requestDeleteUser } from '../../functions/request';
import papelera from '../../assets/papelera.png';
import editar from '../../assets/editar.jpg'

function ViewUsers({userData, setUsersData}){
    
    useEffect(()=>{
        async function fetchData() {
            try{
                const ViewUsers = await requestGetUser();

                setUsersData([...userData,...ViewUsers]);
            } catch(error){
                console.log('Error al obtener los datos', error)
            }
            
        }
        fetchData();
    }, []);

    const handleDeleteUser = async(userId)=>{
        try{
            await requestDeleteUser(userId);
            setUsersData(userData.filter((user)=> user.id !== userId));
            console.log('Usuario eliminado correctamente ')
        }catch(error){
            console.log('Error al eliminar usuario', error)
        }
    };

    function renderUserList(){
         if(!userData){
            return null;
         }
        return userData.map(user => (

        <div key={user.id}>
           <div className='flex lg:mt-5'> 
            <p className='lg:text-3xl font-retro2 lg:mr-6 md:text-xl md:ml-3'>{user.email}</p>
            <div>
            <button >
            <img src={editar} alt="editar" className=' w-9 h-8 mt-3' />
          </button>
            <button onClick={()=> handleDeleteUser(user.id)} >
            <img src={papelera} alt="papelera" className=' w-9 h-8 mt-3' />
          </button>
            </div>
            </div>
            <p className='lg:text-3xl font-retro2 md:text-xl md:ml-2'>{user.role}</p>
            
        </div>
        
        ));
    }
   
    return (
        <div className='lg:grid lg:grid-cols-1 lg:gap-10 lg:mt-10'>
            {renderUserList()}
        </div>
        
    );
}

export {ViewUsers};