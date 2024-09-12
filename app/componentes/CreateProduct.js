'use client'
import React from 'react'
import { useState } from 'react'
import Boton from './Boton'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { db, storage } from "@/app/firebase/config"
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'


const createProduct = async (values, file) => {
    const collectionRef = collection(db, 'Productos'); // Referencia a la colección
    const docRef = doc(collectionRef);
    console.log(file)
    let fileUrls = '';
    if (file) { // Verificar si hay un archivo
        const storageRef = ref(storage, docRef.id); // Crear una referencia de almacenamiento con el ID del documento
        const fileSnapshot = await uploadBytes(storageRef, file); // Subir el archivo
        fileUrls = await getDownloadURL(fileSnapshot.ref); // Obtener la URL de descarga
    }


    const productData = {
        ...values,
        image: fileUrls // Asigna la URL de la imagen
    };
    //const docRef = doc(collectionRef)
    console.log("Esto trae fileUrls: " , fileUrls)
    console.log(JSON.stringify(productData))
    return setDoc(docRef, productData).then(() => console.log("Producto Agregado! ", JSON.stringify(productData)))
}

const CreateProduct = () => {
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
        await createProduct(values,file)
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
                <Boton type='submit'>Enviar</Boton>

            </form>

        </div>
    )
}

export default CreateProduct
