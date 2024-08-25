import React from 'react'

const ProductDetail = async ({params}) => {
    const { id } = params
    
    // Llamada a la API para obtener los detalles del producto
    const singleProduct = await fetch(`http://localhost:3000/api/productById/${id}`, { cache: 'no-store' })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch product');
            }
            return response.json();
        });

    return (
            <div className='max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white'>
                <div className='py-4 px-6'>
                    <div className='font-bold text-xl mb-2 text-gray-700'>
                        {singleProduct.title}
                    </div>
                    <p className='text-gray-700 text-base'> {singleProduct.description} </p>
                </div>
                <div className='px-6 pt-4 pb-2'>
                    <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 bg-orange-400'>
                        {singleProduct.category}
                    </span>
                    <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2  bg-orange-700'>
                        {singleProduct.price}
                    </span>
                </div>
            </div>
    )
}

export default ProductDetail
