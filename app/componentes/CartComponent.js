'use client';
import React, { useEffect, useState } from 'react'
import { useCartContext } from './context/cartContext'

const CartComponent = ({ data }) => {
  const { cart, setCart, setCount } = useCartContext()
  const [productCart, setProductCart] = useState([])

  useEffect(() => {
    try {
      setProductCart(data);
      console.log("data en useEffect: ", data)
    } catch (error) {
      console.error("Error en useEffect: ", error)
    }

  }, [data]);

  const handleRemove = (id) => {
    const updatedCart = cart.filter(item => item.id !== id)
    setCart(updatedCart)
    setCount(updatedCart.length)
  }

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
            productCart.map((item, index) => (
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
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default CartComponent;
