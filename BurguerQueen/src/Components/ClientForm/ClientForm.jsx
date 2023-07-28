
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
        <button  type="button" onClick={onCancel}>X</button>
        <form onSubmit={OnSubmit}>
     <label htmlFor="">Nombre del cliente:</label>
     <input type="text" id="nombreCliente" />
      <label htmlFor="">Número de mesa</label>
      <input type="number" min={1} name="" id="numeroMesa" />
        <button type="submit">Crear Orden</button>
        <button type="button" onClick={onCancel} >Cancelar</button>
        </form>
        </>
    );
}
export {ClientForm};