'use client'
import React from 'react'
import { useState } from 'react'
import Boton from './Boton'
import Swal from 'sweetalert2';  
import { useAuthContext } from './context/AuthContext'

const createProduct = async (values, file) => {
    
}


const CreateProduct = () => {
    const { user } = useAuthContext()
    const [error, setError] = useState(null)
    const [values, setValues] = useState({
        title: '',
        description: '',
        inStock: 0,
        price: 0,
        category: ''
    })

    const [file, setFile] = useState(null)

    const handleChange = (e) => {

        if (e.target.type === 'file') {
            setFile(e.target.files[0]); // Guardar el archivo seleccionado en el estado
        } else {
            setValues({
                ...values,
                [e.target.name]: e.target.value
            });
        }


    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            console.log("USUARIO: "  + JSON.stringify(user) )
            const baseUrl = process.env.NEXT_PUBLIC_URL_LOCAL || process.env.NEXT_PUBLIC_URL_EXTERNA
            console.log(baseUrl)
            const formData = new FormData();
            formData.append('file', file); 
            formData.append('values', JSON.stringify(values)); 

            const res = await fetch(`${baseUrl}api/producto`, {
                method: 'POST',  
                body: formData,  
                cache: 'no-store'
            });
           
            if (!res.ok) {
              throw new Error('Error al crear el nuevo producto')
            }
           
            Swal.fire({
                icon: 'success',
                title: 'Producto agregado',
                text: 'El producto ha sido agregado exitosamente.',
                confirmButtonText: 'OK'
            });

        } catch (error) {
            setError(error.message)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al agregar el producto. Inténtalo de nuevo.',
                confirmButtonText: 'OK'
            });
            console.error("Error al agregar producto: ", error);
        }
    }

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

                <label className='text-zinc-800'>Imagen del Producto: </label>
                <input
                    type='file'
                    className='p-2 rounded w-full border border-blue-100 block my-4 text-zinc-600'
                    onChange={handleChange}
                />

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
                <Boton type='submit'>AGREGAR</Boton>

            </form>

        </div>
    )
}

export default CreateProduct
