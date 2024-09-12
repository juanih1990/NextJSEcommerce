import React from 'react'
import Link from 'next/link'
import AddTocart from './AddTocart'
import Image from 'next/image'

const ProductCard = ({ title, description, price, category, id, image }) => {
    return (

        <div className='max-w-sm w-150 rounded overflow-hidden shadow-lg m-4 bg-white flex flex-col'>
            <Link href={`/productDetail/${id}`} className="flex flex-col h-full">
                <div className='py-4 px-6 flex flex-col h-full'>
                    <div className='font-bold text-xl mb-2 text-gray-700 text-center'>
                        {title}
                    </div>
                    {/* Componente Image de Next.js */}
                    {image && (
                        <div className='mb-4 h-48 w-full flex justify-center items-center'>
                            <Image
                                src={image}
                                alt={title}
                                width={150} // Ajusta el ancho según sea necesario
                                height={180} // Ajusta la altura según sea necesario
                                className='object-contain h-full w-full' // Cambié object-cover por object-contain
                            />
                        </div>
                    )}
                    <p className='text-gray-700 text-base text-center flex-grow'>
                        {description}
                    </p>
                </div>
                <div className='px-6 pt-4 pb-2 flex  items-center'>
                    <span className='inline-block bg-gray-200 rounded-full px-5 mr-5 py-1 text-sm font-semibold text-gray-700 bg-sky-200'>
                        {category}
                    </span>
                    <span className='inline-block bg-gray-200 rounded-full px-5   py-1 text-sm font-semibold text-gray-700 bg-sky-200'>
                        {price}
                    </span>
                </div>
            </Link>
            <div className='px-6 pb-4'>
                <AddTocart
                    title={title}
                    description={description}
                    price={price}
                    category={category}
                    id={id}
                />
            </div>
        </div>


    )
}

export default ProductCard
