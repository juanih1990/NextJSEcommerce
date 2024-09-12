'use client';

import React, { useState, useEffect } from 'react';
import BtnProductTable from './BtnTable';
import BtnLogOut from './BtnLogOut';
import Boton from '../Boton';
import Link from 'next/link';


const ProductTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/producto/all', { cache: 'no-store' });
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
                                <BtnProductTable />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable