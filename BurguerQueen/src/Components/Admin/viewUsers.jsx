import React from 'react';
import {  useEffect, useState } from 'react';
import { requestGetUser, requestDeleteUser, requestUpdateUser } from '../../functions/request';
import papelera from '../../assets/papelera.png';
import editar from '../../assets/editar.jpg';
import eliminar from '../../assets/eliminar.png'
import check from '../../assets/check2.png'

function ViewUsers({userData, setUsersData}){
    const[editUserId,setEditUserId]= useState(null);
    const [editEmail, setEditEmail] = useState('');
    const [editPassword, setEditPassword ]=useState('');
    const[editRole,setEditRole]= useState('');

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

    const handleEditUser = (user)=>{
        setEditUserId(user.id);
        setEditEmail(user.email);
        setEditPassword(user.password);
        setEditRole(user.role);
       };

       const handleSaveUser = async()=>{
        try{
            await requestUpdateUser(editUserId, {
                email: editEmail,
                password: editPassword,
                role : editRole,
            });
            const updateUserData = userData.map((user)=> {
                if(user.id === editUserId ){
                    return {
                        ...user,
                        email: editEmail,
                        password: editPassword,
                        role : editRole,
                    };
                }
                return user;
            });
            setUsersData(updateUserData);
            setEditUserId(null);
            setEditEmail('');
            setEditPassword('');
            setEditRole('');
            console.log('Usuario actualizado correctamente')

        }catch(error){
            console.log('Error al actualizar usuario', error)
        }
       };
    
       const handleCancelEdit = () => {
        setEditUserId(null);
        setEditEmail('');
        setEditPassword('');
        setEditRole('');
    };



    function renderUserList(){
         if(!userData){
            return null;
         }
         return userData.map((user) => (
            <div className='border border-secondary' key={user.id}>
                {editUserId === user.id ? (
                    <div className='flex lg:mt-5'>
                        <input
                            className='lg:w-64 lg:h-14 lg:ml-9 lg:mt-2 lg:mb-3 text-center text-black font-retro2 text-lg md:w-5/6 md:h-14 md:ml-14'
                            type='text'
                            value={editEmail}
                            onChange={(e) => setEditEmail(e.target.value)}
                        />
                        <input
                            className='lg:w-20 lg:h-14 lg:ml-10 lg:mt-2 lg:mb-3 text-center text-black font-retro2 text-lg md:w-5/6 md:h-14 md:ml-14'
                            type='text'
                            value={editRole}
                            onChange={(e) => setEditRole(e.target.value)}
                        />
                        <div className='flex flex-col'>
                            <button onClick={handleSaveUser}>
                                <img src={check} alt='editar' className='w-9 h-8 mt-3' />
                            </button>
                            <button onClick={handleCancelEdit}>
                                <img src={eliminar} alt='papelera' className='w-9 h-8 mt-3' />
                            </button>
                        </div>
                    </div>
                ): (
                    <div className='flex lg:mt-5'>
                        <p className='lg:text-3xl font-retro2 lg:mr-6 md:text-xl md:ml-3'>{user.email}</p>
                        <div>
                            <button onClick={() => handleEditUser(user)}>
                                <img src={editar} alt='editar' className='w-9 h-8 mt-3' />
                            </button>
                            <button onClick={() => handleDeleteUser(user.id)}>
                                <img src={papelera} alt='papelera' className='w-9 h-8 mt-3' />
                            </button>
                        </div>
                    </div>
                )}
                <p className='lg:text-3xl text-white font-retro2 md:text-xl md:ml-2'>{user.Role}</p>
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


