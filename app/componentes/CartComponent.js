'use client'
import React, { useEffect, useState } from 'react'
import { useCartContext } from './context/cartContext'

const CartComponent = ({ data }) => {
   
    const { cart, setCart, count, setCount } = useCartContext();
    const [productCart , setProductCart] = useState([])
    

   
    const handleRemove = (id) => {
        // Filtrar los items para remover el item con el id seleccionado
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        setCount(updatedCart.length);
    }

    const handleEdit = (id) => {
        // Lógica para editar el item con el id seleccionado
        // Puedes redirigir a una página de edición o abrir un modal
        console.log("Editar item con id:", id);
    }

    useEffect(() => {
        try {
            setProductCart(data);
            console.log("data en useEffect: ", data);
        } catch (error) {
            console.error("Error en useEffect: ", error);
        }
    }, [data]);
   
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">ID</th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">Producto</th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">Precio</th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">Cantidad</th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">Categoría</th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productCart.map((item,index) => {
                            return (
                                
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-gray-600">{item.id}</td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-gray-600">{item.title}</td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-gray-600">{item.price}</td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-gray-600">{item.quantity}</td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-gray-600">{item.category}</td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-gray-600">
                                            <button
                                                onClick={() => handleRemove(item.id)}
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default CartComponent
