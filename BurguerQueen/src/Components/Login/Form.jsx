import sanduche from '../../assets/sanduche_final.png'
import axios from 'axios'
import { useState } from 'react';
function Form(){
 const[email,setEmail] = useState('');
 const[password,setPassword]= useState('');


  const HandleSubmit= e =>{
    e.preventDefault()
  };

  const HandleChangeEmail = e =>{
   setEmail(e.target.value)
  
  }
 

  const HandleChangePassword = e =>{
    setPassword(e.target.value)
    
  }

   const HandleButton = async (user,password)=>{
    try{
      const response= await axios.post('http://localhost:8080/orders',{email,password})
      const {data}=response;
      const accessToken= data;
      console.log(accessToken)

return {accessToken}
    }catch(error){
      console.error('Error en la solicitud:', error);
      throw error;
    }
      
      
    }
    
    
   

    return (
        <div>
      <form onSubmit={HandleSubmit}>
        <div>
            <img src={sanduche} alt="sanduche" />
        <label htmlFor="email">Correo Electrónico</label>
        </div>
       <input type="text" name="email" id="email" onChange={HandleChangeEmail} /> <br />
         <div>
         <img src={sanduche} alt="sanduche" />
         <label htmlFor='password'>Contraseña</label>
         </div>
       <input type="password" name="contraseña" id="password" onChange={HandleChangePassword} />

       <button type="submit" onClick={HandleButton}> INGRESAR</button><br/>

  </form>
    </div>
    )
}

export {Form}