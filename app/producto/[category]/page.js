import React from 'react'
import ProductList from '@/app/componentes/ProductList'

const page = ({params}) => {
    const {category} = params 
    return (
        <>
            <ProductList category={category} />
        </>
    )
}

export default page
