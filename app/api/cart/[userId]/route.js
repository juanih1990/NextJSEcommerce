import { db } from '@/app/firebase/config'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { NextResponse } from 'next/server'


export async function GET(req, { params }) {
  const { userId } = params;

  try {
    const cartRef = doc(db, 'carts', userId)
    const cartSnapshot = await getDoc(cartRef)

    if (!cartSnapshot.exists()) {
      return NextResponse.json({ products: [] }, { status: 200 })
    }

    const cartData = cartSnapshot.data()
    return NextResponse.json(cartData, { status: 200 })

  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    return NextResponse.json({ error: 'Error al obtener el carrito' }, { status: 500 })
  }
}


export async function POST(req, { params }) {
  const { userId } = params
  const body = await req.json()

  try {
    const cartRef = doc(db, 'carts', userId)
    const cartSnapshot = await getDoc(cartRef)

    let existingProducts = [];

    if (cartSnapshot.exists()) {
      const cartData = cartSnapshot.data()
      existingProducts = cartData.products || []
    }

    const productIndex = existingProducts.findIndex(p => p.id === body.id)

    if (productIndex > -1) {
      existingProducts[productIndex].quantity += body.quantity
    } else {
      existingProducts.push(body)
    }

    await setDoc(cartRef, { products: existingProducts })

    return NextResponse.json({ message: 'Producto agregado o actualizado' }, { status: 200 })

  } catch (error) {
    console.error('Error al actualizar el carrito:', error)
    return NextResponse.json({ error: 'Error al actualizar el carrito' }, { status: 500 })
  }
}


export async function DELETE(req, { params }) {
  const { userId } = params
  const body = await req.json()
  console.log("ENTRO AL DELETE" + JSON.stringify(body))

  try {
    const cartRef = doc(db, 'carts', userId)
    const cartSnapshot = await getDoc(cartRef)

    if (!cartSnapshot.exists()) {
      return NextResponse.json({ message: 'Carrito no encontrado' }, { status: 404 })
    }

    const cartData = cartSnapshot.data();
    console.log(JSON.stringify(cartData))
    const updatedProducts = cartData.products.filter(product => product.id !== body.id)

    await setDoc(cartRef, { products: updatedProducts })

    return NextResponse.json({ message: 'Producto eliminado' }, { status: 200 })

  } catch (error) {
    console.error('Error al eliminar el producto:', error)
    return NextResponse.json({ error: 'Error al eliminar el producto' }, { status: 500 })
  }
}
