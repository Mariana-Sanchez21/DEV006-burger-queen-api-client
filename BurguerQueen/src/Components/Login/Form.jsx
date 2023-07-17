import sanduche from '../../assets/sanduche_final.png'
import {requestGet} from '../../functions/request'
import { useState } from 'react';
import { useNavigate } from 'react-router';
function Form(){
 const[user,setUser] = useState('');
 const[password,setPassword]= useState('');
 const[authData,setAuthData] = useState(null);

 const navigate = useNavigate();

  const HandleSubmit= e =>{
    e.preventDefault()
  };

  const HandleChangeEmail = e =>{
   setUser(e.target.value)
  
  }
 

  const HandleChangePassword = e =>{
    setPassword(e.target.value)
    
  }

  const HandleLogin = async (e) => {
e.preventDefault();
try {
  const data = await requestGet(user,password);
  setAuthData(data)
  console.log(data)
  const token = data.accessToken;
  localStorage.setItem("token", JSON.stringify({ accessToken: token }));
  const role = data.user.role;
  localStorage.setItem("role", role)

  switch(role){
    case 'admin':
    navigate('/AdminView')
      break;
    case 'waiter':
      navigate('/WaiterView') 
      break;
    case 'kitchen':
      navigate('/KitchenView')
      break;
      default:
        console.log('default case')
        break;
  }
}catch (error) {
  console.log('Error:', error);
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

       <button type="submit" onClick={HandleLogin}> INGRESAR</button><br/>
  </form>
    </div>
   
    )
}

export {Form}