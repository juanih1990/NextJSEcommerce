'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { useAuthContext } from './AuthContext'

const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const { user } = useAuthContext();
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [count , setCount ] = useState(0)

    
    const fetchCart = useCallback(async () => {
        if (!user || !user.uid) return
        setLoading(true)
        try {
            const baseUrl = process.env.NEXT_PUBLIC_URL_LOCAL || process.env.NEXT_PUBLIC_URL_EXTERNA
            const res = await fetch(`${baseUrl}api/cart/${user.uid}`)
            if (!res.ok) throw new Error('Error al obtener el carrito')
            const data = await res.json()
            setCart(data.products || [])
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }, [user]);

    const deleteToCartItem = async (productCart) => {
        if (!user || !user.uid) {
            setError('Debes estar autenticado para agregar productos al carrito.')
            return;
        }
        setLoading(true)
        const baseUrl = process.env.NEXT_PUBLIC_URL_LOCAL || process.env.NEXT_PUBLIC_URL_EXTERNA;
        console.log(productCart)
        try{
            const res = await fetch(`${baseUrl}api/cart/${user.uid}` , {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    id: productCart // Asegúrate de que envías la propiedad "id"
                }),
            })
        }
        catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const addToCart = async (product, quantity) => {
        if (!user || !user.uid) {
            setError('Debes estar autenticado para agregar productos al carrito.')
            return;
        }

        setLoading(true)
        const baseUrl = process.env.NEXT_PUBLIC_URL_LOCAL || process.env.NEXT_PUBLIC_URL_EXTERNA;
        try {
            const res = await fetch(`${baseUrl}api/cart/${user.uid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    quantity,
                    image: product.image,
                    category: product.category,
                }),
            })

            if (!res.ok) throw new Error('Error al agregar producto al carrito')
            const data = await res.json()
            setCart((prev) => {
                const productExists = prev.find((item) => item.id === product.id);
                if (productExists) {
                    return prev.map((item) =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity + quantity }
                            : item
                    );
                } else {
                    return [...prev, { ...product, quantity }]
                }
            });
            
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const totalQuantity = cart.reduce((total, product) => total + product.quantity, 0);
        setCount(totalQuantity);
    }, [cart])
    
    useEffect(() => {
        if (user && user.uid) {
            fetchCart();
        }
    }, [user, fetchCart])

    return (
        <CartContext.Provider value={{ cart, addToCart, loading, error , count , setCart , setCount , deleteToCartItem  }}>
            {children}
        </CartContext.Provider>
    )
}
