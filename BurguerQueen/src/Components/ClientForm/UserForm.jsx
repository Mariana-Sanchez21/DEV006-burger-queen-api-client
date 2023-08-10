function UserForm({setUserOpenModal, onUserInformation}) {

   
    const OnSubmit = (e) => {
       e.preventDefault();
       setUserOpenModal(false)
       const name = e.target.emailUsuario.value;
       const password = e.target.contraseñaUsuario.value;
       const role = e.target.roleUsuario.value;
       onUserInformation(name,password,role)       
   }

   const onCancel = () => {
    setUserOpenModal(false)
   }
   return (
       <>
        <div className=" bg-tertiary lg:w-hForm lg:h-2/3 relative md:w-h md:h-1/3">
       <button className="absolute top-0 right-0 p-1 font-extrabold text-2xl bg-btn2 w-9"  type="button" onClick={onCancel}>X</button>
       <form className="flex flex-col" onSubmit={OnSubmit}>
      <label className="font-retro2 color-black text-center text-3xl font-extrabold mt-10" htmlFor="">Email del Usuario:</label>
     <input className="lg:w-4/6 lg:h-14 lg:ml-32 lg:mt-4 text-center font-retro2 text-lg md:w-5/6 md:h-14 md:ml-14" type="text" id="emailUsuario"  />
     <label className="font-retro2 color-black text-center text-3xl font-extrabold mt-10" htmlFor="">Contraseña</label>
     <input className="lg:w-4/6 lg:h-14 lg:ml-32 lg:mt-4 text-center font-retro2 text-lg md:w-5/6 md:h-14 md:ml-14"  type="text" name="" id="contraseñaUsuario" />
     <label className="font-retro2 color-black text-center text-3xl font-extrabold mt-10" htmlFor="">Role asignado</label>
     <input className="lg:w-4/6 lg:h-14 lg:ml-32 lg:mt-4 text-center font-retro2 text-lg md:w-5/6 md:h-14 md:ml-14"  type="text" name="" id="roleUsuario" />
      
      <div className="Flex md:mt-5 ">
       <button className=" border-4 border-black rounded-md lg:w-40 lg:h-12 text-2xl lg:mt-24 lg:ml-40 font-extrabold bg-btn1 hover:scale-125 md:w-44 md:h-14 md:ml-14" type="submit">Crear Usuario</button>
       <button className=" border-4 border-black rounded-md lg:w-40 lg:h-12 text-2xl lg:mt-24 font-extrabold lg:ml-40 bg-btn2 hover:scale-125 md:w-44 md:h-14 md:ml-20" type="button" onClick={onCancel} >Cancelar</button>

       </div>
       </form>
       </div>
       </>
   );
}
export {UserForm};