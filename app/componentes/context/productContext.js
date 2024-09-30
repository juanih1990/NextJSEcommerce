'use client'

import { createContext, useContext, useEffect, useState , useCallback  } from 'react'
import { useAuthContext } from './AuthContext'

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
    const { user } = useAuthContext();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProduct = useCallback(async () => {
        console.log("ENTRO AL FETCH" , JSON.stringify(user))
        if (!user || !user.uid) return
        setLoading(true)
        try {
            const baseUrl = process.env.NEXT_PUBLIC_URL_LOCAL || process.env.NEXT_PUBLIC_URL_EXTERNA
            const res = await fetch(`${baseUrl}api/producto`)
            if (!res.ok) throw new Error('Error el producto')
            const data = await res.json()
            
            setProduct(data.products || [])
            console.log(data)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }, [user]);

    useEffect(() => {
        if (user && user.uid) {
            fetchProduct();
        }
    }, [user, fetchProduct])
    return (
        <ProductContext.Provider value={{product , setProduct , fetchProduct}}>
            {children}
        </ProductContext.Provider>
    )
}