'use client'
import React from 'react';
import CartComponent from '../componentes/CartComponent';
import { useAuthContext } from '../componentes/context/AuthContext';

const page = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_URL_LOCAL || process.env.NEXT_PUBLIC_URL_EXTERNA;
  const { user } = useAuthContext()
  const res = await fetch(`${baseUrl}api/cart/${user.uid}`, { cache: 'no-store' });
  const data = await res.json();

  const cartItems = data.products || [];
 

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4">Mi Carrito</h1>
      <CartComponent data={cartItems} />
    </div>
  );
}

export default page;
