import './App.css'
// import {Logo} from './Components/Home/logo'
// import { ButtonWaiter } from './Components/Home/ButtonWaiter'
// import { ButtonKitchen } from './Components/Home/ButtonKitchen'
// import { ButtonAdmin } from './Components/Home/ButtonAdmin'
// import 'tailwindcss/tailwind.css'
import {Home} from './Components/Home/Home'
import {Form} from './Components/Login/Form'
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";

function App() {

  return (
    <Router>
      <div className='Contenedor'>
       
       <Routes>
        <Route path='/Login' Component={Form} /> 
        
        <Route path='/' Component={Home} />
       
       </Routes>
      </div>
    </Router>
  )
} 

export default App
