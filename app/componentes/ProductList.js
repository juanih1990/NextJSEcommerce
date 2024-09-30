'use client'
import React, { useEffect } from 'react'
import ProductCard from './ProductCard'
import { useProductContext } from './context/productContext'

const ProductList =  ({ data }) => {
    const { product, setProduct} =  useProductContext()

    //faltara hacer un setProduct pero desde product/category
    useEffect(()=>{
        if(product){
            setProduct(data)
        }
       
    }, [product])
    return (
        <div className='flex flex-wrap justify-center item-center text-white my-4'>
            {
                product.map((product, index) => {
                    return (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            image={product.image}
                            description={product.description}
                            price={product.price}
                            category={product.category}
                        />
                    )

                })
            }
        </div>
    )
}

export default ProductList
