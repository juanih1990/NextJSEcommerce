import React from 'react'
import ProductCard from './ProductCard'

const ProductList = ({ data, category }) => {
    return (
        <div className='flex flex-wrap justify-center item-center text-white '>
            {
                data.map((product, index) => {
                    return (
                        <ProductCard
                        key={product.id}
                        id = {product.id}
                        title={product.title}
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
