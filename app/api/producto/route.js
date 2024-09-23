import { doc, collection, setDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"; // Asegúrate de importar uploadBytes
import { storage } from "@/app/firebase/config"; // Asegúrate de importar el storage
import { NextResponse } from "next/server"; // Importa NextResponse para devolver respuestas adecuadas

export async function POST(req) {
    try {
        // Obtener el FormData de la solicitud
        const formData = await req.formData();

        const values = JSON.parse(formData.get('values')); // Extraer y parsear los valores JSON
        const file = formData.get('file'); // Obtener el archivo
        
        const collectionRef = collection(db, 'Productos'); // Referencia a la colección
        const docRef = doc(collectionRef);

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

        await setDoc(docRef, productData); // Guarda el documento en Firestore

        // Devolver una respuesta exitosa
        return NextResponse.json({ message: 'Producto agregado correctamente' }, { status: 200 });
    } catch (error) {
        console.error("Error al agregar producto: ", error);
        
        // Devolver una respuesta de error
        return NextResponse.json({ message: 'Error al agregar el producto', error: error.message }, { status: 500 });
    }
}