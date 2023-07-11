// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import {Logo} from './Logo/logo'
import { ButtonWaiter } from './ButtonWaiter/ButtonWaiter'
import { ButtonKitchen } from './ButtonKitchen/ButtonKitchen'
import { ButtonAdmin } from './ButtonAdmin/ButtonAdmin'
import './buttons.css'

function App() {

  return (
    <>
    <Logo  />
<div className='containerButtons'>
   <ButtonWaiter />
    <ButtonKitchen />
    <ButtonAdmin /> 
    </div>
    </>
  )
}

export default App
