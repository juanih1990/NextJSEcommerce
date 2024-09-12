import React from 'react'
import ProductCard from './ProductCard'

const ProductList = async ({ category }) => {
    const data = await fetch(`http://localhost:3000/api/producto/${category}`,
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
