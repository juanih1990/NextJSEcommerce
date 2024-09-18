'use client';

import React, { useState, useEffect } from 'react';
import CartComponent from '../componentes/CartComponent';
import { useAuthContext } from '../componentes/context/AuthContext';

const Page = () => {
  const { user } = useAuthContext()
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCartItems = async () => {
      const baseUrl = process.env.NEXT_PUBLIC_URL_LOCAL || process.env.NEXT_PUBLIC_URL_EXTERNA

      try {
        const res = await fetch(`${baseUrl}api/cart/${user.uid}`, { cache: 'no-store' })
        if (!res.ok) {
          throw new Error('Error al obtener el carrito')
        }
        const data = await res.json()
        setCartItems(data.products || [])
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    };

    if (user) {
      fetchCartItems()
    }
  }, [user])

  if (loading) {
    return <div>Cargando...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4">Mi Carrito</h1>
      <CartComponent data={cartItems} />
    </div>
  );
};

export default Page