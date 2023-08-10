import React from 'react';
import { useState, useEffect } from 'react';
import { requestGetUser } from '../../functions/request';

function ViewUsers(){
    const [UsersData, setUsersData] = useState([]);
    
    useEffect(()=>{
        async function fetchData() {
            try{
                const ViewUsers = await requestGetUser();

                setUsersData(ViewUsers);
            } catch(error){
                console.log('Error al obtener los datos', error)
            }
            
        }
        fetchData();
    }, []);

    function renderUserList(){
         
        return UsersData.map(user => (

        <div key={user.id}>
           <div className='flex lg:mt-5'> 
            <p className='lg:text-3xl font-retro2 lg:mr-6 md:text-xl md:ml-3'>{user.email}</p>
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