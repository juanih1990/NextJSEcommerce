'use client'
import React from 'react'
import { useState } from 'react'
import Boton from './Boton'

const CreateProduct = () => {
    const [values, setValues] = useState({
        title: '',
        description: '',
        inStock: 0,
        price: 0,
        category: ''
    })

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(values)
    }
    // <button type='submit' className='border border-blue-200 text-zinc-800 p-3 bg-emerald-200 rounded'>Enviar</button>
    return (
        <div className='container m-auto mt-6 max-w-lg'>
            <form onSubmit={handleSubmit} className='my-12'>

                <label className='text-zinc-800'>Producto: </label>
                <input
                    type='text'
                    value={values.title}
                    required
                    className='p-2 rounded w-full border border-blue-100 block my-4 text-zinc-600'
                    name='title'
                    onChange={handleChange}
                ></input>

                <label className='text-zinc-800'>Precio: </label>
                <input
                    type='number'
                    value={values.price}
                    required
                    className='p-2 rounded w-full border border-blue-100 block my-4 text-zinc-600'
                    name='price'
                    onChange={handleChange}
                ></input>

                <label className='text-zinc-800'>Stock: </label>
                <input
                    type='number'
                    value={values.inStock}
                    required
                    className='p-2 rounded w-full border border-blue-100 block my-4 text-zinc-600'
                    name='inStock'
                    onChange={handleChange}
                ></input>

                <label className='text-zinc-800'>Category: </label>
                <input
                    type='text'
                    value={values.category}
                    required
                    className='p-2 rounded w-full border border-blue-100 block my-4 text-zinc-600'
                    name='category'
                    onChange={handleChange}
                ></input>

                <label className='text-zinc-800'>Descripcion: </label>
                <textarea
                value={values.description}
                className='resize-none w-full h-24 p-2 rounded border block border-blue-100 my-4 text-zinc-600'
                name='description'
                onChange={handleChange}
                ></textarea>
                <Boton type='submit'>Enviar</Boton>
               
            </form>

        </div>
    )
}

export default CreateProduct
