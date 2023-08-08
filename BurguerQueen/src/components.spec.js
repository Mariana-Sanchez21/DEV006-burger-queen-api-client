import  {Home, logo, ButtonWaiter, ButtonKitchen, ButtonAdmin}  from "./Components/Home/Home";
import {render, screen} from '@testing-library/react'

describe('HomeComponent', ()=>{
    it(' Se renderizan los componentes',()=>{
        
        const {getByTitle}= render(<Home/>);
        const containerElement= getByTitle('contenedor botones')
     expect(containerElement).toBeInTheDocument();
    });
});