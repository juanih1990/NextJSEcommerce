import React from 'react'
import ProductCard from './ProductCard'

const ProductList = async ({ category }) => {
    
    const isLocal = process.env.NEXT_PUBLIC_URL_LOCAL; 
    const baseUrl = isLocal ? process.env.NEXT_PUBLIC_URL_LOCAL : process.env.NEXT_PUBLIC_URL_EXTERNA;

    const data = await fetch(`${baseUrl}/api/producto/${category}`,
        { cache: 'no-store' }).then(r => r.json())
    return (
        <div className='flex flex-wrap justify-center item-center text-white my-4'>
            {
                data.map((product, index) => {
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
