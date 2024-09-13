import React from 'react'
import CartComponent from '../componentes/CartComponent'

const page = async() => {
  const baseUrl = process.env.NEXT_PUBLIC_URL_LOCAL || process.env.NEXT_PUBLIC_URL_EXTERNA
  const data = await fetch(baseUrl +'/api/cart/cartList',
    { cache: 'no-store' }).then(r => r.json())

    console.log("PASA POR AWAIT")
    const cartItems = data[0]?.cart || []
    console.log(cartItems)
  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4">Mi Carrito</h1>
      <CartComponent  data = {cartItems}/>
    </div>
  )
}

export default page
