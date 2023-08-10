import LogoBQ from '../../assets/LogoBQ.png'
import papelera from '../../assets/papelera.png'
import { useState } from 'react'
import { Modal } from '../Modal/Modal';
import { UserForm } from '../ClientForm/UserForm';
import { ProductForm } from '../ClientForm/ProductForm';
import {ViewProducts} from './viewProducts'
import{ViewUsers} from './viewUsers'


function AdminView(){
//     // const[showProduct, setShowProduct] = useState(true);
//   const[selectedProducts, setSelectedProducts] = useState([]);
    const [ openUserModal, setUserOpenModal ] =useState(false);
    const [ openProductModal, setProductOpenModal ] =useState(false);
    const [UserInfo, setUserInfo] = useState('');
    const [UserPassword, setUserPassword] = useState('');
    const [UserRole, setUserRole] = useState('');
    const [ProductName, setProductName] = useState('');
    const [ProductPice, setProductPrice] = useState('');
    const [CategoryName, setCategoryName]= useState('')

    const onUserInformation=(name,password,role)=>{
        setUserInfo(name)
        setUserPassword(password)
        setUserRole(role)
      }
      const onProductInformation = (product,price, category)=>{
        setProductName(product)
        setProductPrice(price)
        setCategoryName(category)

      }
     
   
   return (
<section className=' bg-black text-white '>
 <nav className=' bg-primary lg:h-28 flex justify-between text-black sm:w-full sm:h-20 font-bold'>
 <div className='  lg:h-24 lg:w-28 sm:h-32  sm:w-44   '>
   <img className='' src={LogoBQ} alt="logo" />
 </div>

 <ul className=' flex lg:h-16 mt-8 lg:w-hForm mr-36 sm:h-9 sm:w-80 sm:ml-24 sm:justify-around bg-blue '> 
   <li className='lg:mb-20 sm:mb-24 border-red-600 lg:text-3xl font-retro2 lg:mr-20 md:text-lg md:-ml-36'>Ordenes Listas</li>
   <li className='lg:mb-20 sm:mb-24 border-red-600 lg:text-3xl font-retro2 lg:mr-20 md:text-lg'>Historial de Ordenes</li>
 </ul>
 </nav> 
 <div className='Buttons border-black flex lg:justify-around lg:mt-6 md:mt-10 md:justify-between'>
   <button onClick={()=>setUserOpenModal(true)} className='lg:mr-96 font-bold border-4 border-secondary rounded-sm shadow-lg hover:scale-125 lg:p-2 lg:text-xl font-retro1 md:ml-3'>Nuevo Usuario</button>
   {openUserModal && (
    <Modal>
      <UserForm setUserOpenModal={setUserOpenModal}  onUserInformation={onUserInformation}  />
    </Modal>
   )}
     <button onClick={()=>setProductOpenModal(true)}  className='border-4 border-tertiary rounded-sm shadow-lg lg:-mr-20 lg:p-2 font-bold lg:text-xl font-retro1 hover:scale-125'>Nuevo Producto</button>
     {openProductModal && (
    <Modal>
      <ProductForm setProductOpenModal={setProductOpenModal} onProductInformation={onProductInformation} />
    </Modal>
   )}
 </div>
 <section className='lg:grid lg:grid-cols-2 lg:gap-20 lg:mt-10'>  
    <article>
      <ViewProducts />
  </article>
  <article className='lg:mt-14 lg:mr-16'>
    <ViewUsers />
  </article>
 </section>

 </section >

    )
}
export{AdminView};