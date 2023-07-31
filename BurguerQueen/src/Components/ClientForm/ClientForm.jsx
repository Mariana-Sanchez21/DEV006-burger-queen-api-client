
function ClientForm({setOpenModal}) {
   
     const OnSubmit = (e) => {
        e.preventDefault();
        setOpenModal(false)
    }
    const onCancel = () => {
        setOpenModal(false)
    }
    return (
        <>
         <div className=" bg-tertiary lg:w-hForm lg:h-2/3 relative">
        <button className="absolute top-0 right-0 p-1 font-extrabold text-2xl bg-btn2 w-9"  type="button" onClick={onCancel}>X</button>
        <form className="flex flex-col" onSubmit={OnSubmit}>
       <label className="font-retro2 color-black text-center text-3xl font-extrabold mt-10" htmlFor="">Nombre del cliente:</label>
      <input className="lg:w-4/6 lg:h-14 lg:ml-32 lg:mt-4 text-center font-retro2 text-lg" type="text" id="nombreCliente" />
      <label className="font-retro2 color-black text-center text-3xl font-extrabold mt-10" htmlFor="">Número de mesa</label>
      <input className="lg:w-4/6 lg:h-14 lg:ml-32 lg:mt-4 text-center font-retro2 text-lg"  type="number" min={1} name="" id="numeroMesa" />
       <div className="Flex ">
        <button className=" border-4 border-black rounded-md lg:w-40 lg:h-12 text-2xl lg:mt-24 lg:ml-40 font-extrabold bg-btn1 hover:scale-125" type="submit">Crear Orden</button>
        <button className=" border-4 border-black rounded-md lg:w-40 lg:h-12 text-2xl lg:mt-24 font-extrabold lg:ml-40 bg-btn2 hover:scale-125" type="button" onClick={onCancel} >Cancelar</button>
        </div>
        </form>
        </div>
        </>
    );
}
export {ClientForm};