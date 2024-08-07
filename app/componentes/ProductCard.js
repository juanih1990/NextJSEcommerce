import React from 'react'
import Link from 'next/link'
const ProductCard = ({ title, description, price, category , id}) => {
    return (
        <Link href={`/productDetail/${id}`}>
        <div className='max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white'>
            <div className='py-4 px-6'>
                <div className='font-bold text-xl mb-2 text-gray-700'>
                    {title}
                </div>
                <p className='text-gray-700 text-base'> {description} </p>
            </div>
            <div className='px-6 pt-4 pb-2'>
                <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 bg-orange-400'>
                    {category}
                </span>
                <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2  bg-orange-700'>
                    {price}
                </span>
            </div>
        </div>
        </Link>
    )
}

export default ProductCard
