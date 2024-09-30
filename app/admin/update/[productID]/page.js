'use client'
import CreateProduct from '@/app/componentes/CreateProduct'
import React, { useEffect, useState } from 'react'

const page = ({ params }) => {
    const { productID } = params
    const [product , setProduct] = useState([])
    const [error, setError] = useState(null)

    useEffect( () => {
        const fetchData = async () => {
            try {   
                const baseUrl = process.env.NEXT_PUBLIC_URL_LOCAL || process.env.NEXT_PUBLIC_URL_EXTERNA
                const data = await fetch(`${baseUrl}api/productById/${productID}`, { cache: 'no-store' }).then(r => r.json())
                setProduct(data)
            } catch (error) {
                setError(error)
            }
        }
        fetchData()
    }, [] )
    return (
        <div>
            <CreateProduct product={product} />
        </div>
    )
}

export default page
