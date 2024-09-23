'use client';

import React, { useState, useEffect } from 'react';
import BtnLogOut from './BtnLogOut';
import Boton from '../Boton';
import Link from 'next/link';


const ProductTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [idProducto, setID] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_URL_LOCAL || process.env.NEXT_PUBLIC_URL_EXTERNA
                const response = await fetch(baseUrl + 'api/producto/all', { cache: 'no-store' });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (idProducto) {
            const DeleteProduct = async (id) => {
                console.log("ENTRO A LA FUNCION")
                const baseUrl = process.env.NEXT_PUBLIC_URL_LOCAL || process.env.NEXT_PUBLIC_URL_EXTERNA

                try {
                    const res = await fetch(`${baseUrl}api/productById/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-type': 'application/json',
                        },
                    })
                    if (!res.ok) {
                        throw new Error('Error al eliminar el producto');
                    }
                }
                catch (error) {
                    setError(error.message)
                } finally {
                    setLoading(false)
                }
            }
            DeleteProduct(idProducto)
        }

    }, [data,idProducto])

    const handleRemove = (id) => {
        console.log("ESTE ES EL ID ", id)
        const updatedCart = data.filter(item => item.id !== id)
        setData(updatedCart)
        setID(id)
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="overflow-x-auto">
            <div className='m-3'>
                <Boton className='mr-5'> <Link href={"/admin/create"}>Nuevo producto</Link></Boton>
                <BtnLogOut />
            </div>

            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">ID</th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">Producto</th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">Precio</th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">Cantidad</th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">Categoría</th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-gray-600">{item.id}</td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-gray-600">{item.title}</td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-gray-600">{item.price}</td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-gray-600">{item.inStock}</td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-gray-600">{item.category}</td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-gray-600">
                                <div>
                                    <button
                                        onClick={() => handleRemove(item.id)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                        Eliminar
                                    </button>
                                    {/*  <button
                                        onClick={() => handleRemove(item.id)}
                                        className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded ml-1">
                                        Editar
                                    </button>*/}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable