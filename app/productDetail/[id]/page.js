'use client'

import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import Count from '@/app/componentes/Count'
import Image from 'next/image'
import { useCartContext } from '@/app/componentes/context/cartContext'

const ProductDetail = ({ params }) => {
    const { id } = params;
    const { addToCart, error } = useCartContext()
    const [product, setProduct] = useState(null)
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        const fetchProduct = async () => {
            const baseUrl = process.env.NEXT_PUBLIC_URL_LOCAL || process.env.NEXT_PUBLIC_URL_EXTERNA
            console.log(baseUrl)
            try {
                const res = await fetch(`${baseUrl}api/productById/${id}`, { cache: 'no-store' })
                if (!res.ok) {
                    throw new Error('Error al obtener el producto')
                }
                const data = await res.json()
                setProduct(data)
            } catch (error) {
                console.error(error)
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product, quantity)
            Swal.fire({
                title: 'Producto agregado al carrito',
                text: `${product.title} ha sido agregado exitosamente.`,
                icon: 'success',
                confirmButtonText: 'OK',
                timer: 1500,
            })
        }
    };

    if (!product) {
        return <div>Cargando...</div>
    }

    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='max-w-4xl w-full rounded-lg overflow-hidden shadow-lg m-4 bg-white flex flex-col'>
                {/* Título del producto */}
                <div className='font-bold text-2xl mb-6 text-gray-800 text-center my-5 font-serif'>
                    {product.title}
                </div>

                <div className='flex flex-col md:flex-row'>
                    {product.image && (
                        <div className='md:w-1/2 w-full flex justify-center items-center mb-6 md:mb-0 border ml-1 rounded'>
                            <Image
                                src={product.image}
                                alt={product.title}
                                width={300}
                                height={350}
                                className='object-contain h-full w-auto'
                            />
                        </div>
                    )}

                    <div className='md:w-1/2 w-full flex flex-col justify-center px-8'>
                        <p className='text-gray-600 text-base mb-4'>
                            {product.description}
                        </p>
                        <div className='flex justify-start space-x-4'>
                            <span className='inline-block bg-sky-100 rounded-full px-4 py-1 text-sm font-semibold text-gray-800'>
                                {product.category}
                            </span>
                            <span className='inline-block bg-sky-100 rounded-full px-4 py-1 text-sm font-semibold text-gray-800'>
                                USD {product.price}
                            </span>
                        </div>
                        
                        {/* Componente Count para seleccionar la cantidad */}
                        <div className='mt-4'>
                            <Count setQuantity={setQuantity} /> {/* El componente Count maneja la cantidad */}
                        </div>
                    </div>
                </div>

                {/* Botón para agregar al carrito */}
                <div className='flex justify-center mt-6 mb-4'>
                    <button onClick={handleAddToCart} className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition duration-300 ease-in-out'>
                        Agregar al Carrito
                    </button>
                </div>

                {/* Muestra el error si ocurre */}
                {error && (
                    <div className='text-center text-red-500 mt-4'>
                        {console.log(JSON.stringify(product))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
