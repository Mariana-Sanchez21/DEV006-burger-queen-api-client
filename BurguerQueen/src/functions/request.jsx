import axios from 'axios'

async function requestGet(user,password){
    const loginData = {
        email: user, 
        password: password,
    };
    try{
        let response = await axios.post('http://localhost:8080/login',loginData,{
       headers: {
        "Content-Type": "application/json",
       },
        });

        if(response.status === 200){
            return response.data;
            
        }
        console.log(data.accessToken)
    }  catch (error) {
        if (error.response) {
         
          const status = error.response.status;
          if (status === 400) {
            throw new Error(error.response.data);
          } 
        }
      
        throw new Error('Error en la solicitud de inicio de sesión');
      }
    }
    

export {requestGet};