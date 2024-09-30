import ProductList from '@/app/componentes/ProductList'
import React from 'react'


const page = async ({ params }) => {
    const { category } = params
   
    const baseUrl = process.env.NEXT_PUBLIC_URL_LOCAL || process.env.NEXT_PUBLIC_URL_EXTERNA
    const product = await fetch(`${baseUrl}api/producto/${category}`, { cache: 'no-store' }).then(r => r.json());
    console.log("PRODUCTOS DESDE CATEGORY " + JSON.stringify(product))
    return (
        <>
            <ProductList data={product} />
        </>
    )
}

export default page
