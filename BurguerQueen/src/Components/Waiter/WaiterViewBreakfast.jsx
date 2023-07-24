import LogoBQ from '../../assets/LogoBQ.png'
import { ProductList } from './ProductList'
function WaiterViewBreakfast(){
    return (
   <section>
 <nav>
 <div className='logoContainer'>
   <img src={LogoBQ} alt="logo" />
 </div>
 <ul>
   <li>Ordenes Listas</li>
   <li>Historial de Ordenes</li>
 </ul>
 </nav>
 <div className='Buttons'>
   <button>Nueva Orden</button>
    <button>Desayuno</button>
    <button>Almuerzo</button>
 </div>
<article>
<ProductList/>
</article>
   </section>

    )
}

export{WaiterViewBreakfast}