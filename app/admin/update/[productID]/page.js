'use client'
import CreateProduct from '@/app/componentes/CreateProduct'
import React, { useEffect, useState } from 'react'

const Page = ({ params }) => {
    const { productID } = params;
    const [product, setProduct] = useState(null);  // Iniciar como null, para diferenciar de cuando se cargan los datos.
    const [error, setError] = useState(null);

    useEffect(() => {
       

        const fetchData = async () => {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_URL_LOCAL || process.env.NEXT_PUBLIC_URL_EXTERNA
                const res = await fetch(`${baseUrl}api/productById/${productID}`, { cache: 'no-store' })

                if (!res.ok) {
                    throw new Error(`Error al obtener el producto: ${res.statusText}`)
                }

                const data = await res.json()
                setProduct(data)
                console.log("data:", data)
            } catch (error) {
                console.error("Error en fetchData:", error)
                setError(error.message || 'Hubo un error al cargar el producto')
            }
        };

        fetchData();
    }, [productID]);  

 

    return (
        <div>
            {error ? (
                <div>Error: {error}</div>
            ) : (
                <CreateProduct product={product} />
            )}
        </div>
    );
}

export default Page;
