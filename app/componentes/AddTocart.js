'use client'
import React from 'react'
import Boton from './Boton'
import { useCartContext } from './context/cartContext'

const AddTocart = ({ title, description, price, category, id }) => {
    const { addToCart , increase ,saveCartToFirebase} = useCartContext()
    
    const handleAdd = () => {
        const item = { title, description, price, category, id , quantity: 0};
        addToCart(item);
        increase(1)
    };
 
    return (
        <div className='flex justify-end mt-3'>
            <Boton onClick={handleAdd} className='bg-blue-400'>Agregar al carrito</Boton>
        </div>
    )
}

export default AddTocart
