import axios from "axios";
import { requestGet } from "./functions/request";

 jest.mock("axios");

// describe('requestGet function', ()=>{
//     it('should return data when status is 200', async ()=>{
//         const dataReturn = {
//             data: {
//                 accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZhbGVudGluYS5wcnVlYmFAZ21haWwuY29tIiwiaWF0IjoxNjkxMTY2ODMzLCJleHAiOjE2OTExNzA0MzMsInN1YiI6IjQifQ.HrbEKrGwsrQfylEqlyDYPH9_3NqRpNA3wt3a8jg-acY",
//                 user: "valentina.prueba@gmail.com",
//                 role: "waiter",
//                 id: "4"
//             }
//         };
//         const loginData = {
//             email: "valentina.prueba@gmail.com", 
//             password: "valentina123",
//         };

//         axios.post.mockResolvedValueOnce(dataReturn);

//         const result = await requestGet(loginData.email,loginData.password);
        
//         expect (result).toEqual(dataReturn)
//     }) 
// })
describe('requestGet function', ()=>{
    it('debe enviar una solicitud de inicio de sesión y devolver los datos de respuesta', async ()=>{
        //Defino los datos de prueba 
        const user= 'valentina.prueba@gmail.com';
        const password= 'valentina123';

        const loginData = {
            email: user, 
            password: password,
        };
        const dataReturn = {
         responseData: {
         accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZhbGVudGluYS5wcnVlYmFAZ21haWwuY29tIiwiaWF0IjoxNjkxMTY2ODMzLCJleHAiOjE2OTExNzA0MzMsInN1YiI6IjQifQ.HrbEKrGwsrQfylEqlyDYPH9_3NqRpNA3wt3a8jg-acY",
         user: "valentina.prueba@gmail.com",
         role: "waiter",
         id: "4"
          }
          };
          //Configurar mock de axios que simule una respuesta exitosa
          axios.post.mockResolvedValueOnce({data:dataReturn,status:200});

          //Llamar a la función que se testea
          const result = await requestGet(user,password);
          //Verficar que se haya llamado a axios.post con los parámetros esperados
          expect(axios.post).toHaveBeenCalledWith(
            'http://localhost:8080/login',
            loginData,
            {
                headers: {
                    "Content-Type": "application/json",
                   },
            }
          );
         expect(result).toEqual(dataReturn)
    });

    //Test para error 400
    it('debe lanzar un error "cannot find user" cuando el estado de respuesta es 400 y corresponde a ese mensaje', async ()=>{
       axios.post = jest.fn().mockRejectedValueOnce({
        response: {
            status: 400,
            data: 'cannot find user',
        },
       });
       await expect(requestGet('usuario','contraseña')).rejects.toThrow('cannot find user');
    });

    it('debe lanzar un error "Email and password are required" cuando el estado de respuesta es 400 y corresponde a ese mensaje', async ()=>{
        axios.post = jest.fn().mockRejectedValueOnce({
         response: {
             status: 400,
             data: "Email and password are required",
         },
        });
        await expect(requestGet('usuario','contraseña')).rejects.toThrow("Email and password are required");
     });
     it('debe lanzar un error "Incorrect password" cuando el estado de respuesta es 400 y corresponde a ese mensaje', async ()=>{
        axios.post = jest.fn().mockRejectedValueOnce({
         response: {
             status: 400,
             data: "Incorrect password",
         },
        });
        await expect(requestGet('usuario','contraseña')).rejects.toThrow("Incorrect password");
     });
     it('debe lanzar un error "Email and password are required" cuando el estado de respuesta es 400 y corresponde a ese mensaje', async ()=>{
        axios.post = jest.fn().mockRejectedValueOnce({
         response: {
             status: 400,
             data: "Email and password are required",
         },
        });
        await expect(requestGet('usuario','contraseña')).rejects.toThrow("Email and password are required");
     });
     it('debe lanzar un error "Error en la solicitud de inicio de sesión" cuando ocurre un error no controlado', async ()=>{
        axios.post = jest.fn().mockRejectedValueOnce(new Error('Network error'));

        await expect(requestGet('usuario','contraseña')).rejects.toThrow("Error en la solicitud de inicio de sesión");
     });
})


