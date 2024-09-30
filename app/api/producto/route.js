import { doc, collection, setDoc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { storage } from "@/app/firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"; // Asegúrate de importar uploadBytes
import { NextResponse } from "next/server"; // Importa NextResponse para devolver respuestas adecuadas

export async function POST(req) {
    try {
        // Obtener el FormData de la solicitud
        const formData = await req.formData();
        console.log("STORAGE "+ process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET)
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
export async function GET(req) {
    try {
      const productosRef = collection(db, "Productos");
      const productSnapshot = await getDocs(productosRef);
  
      // Verificar si hay documentos en la colección
      if (productSnapshot.empty) {
        return NextResponse.json({ products: [] }, { status: 200 });
      }
  
      // Recorrer los documentos y extraer sus datos
      const products = productSnapshot.docs.map(doc => ({
        id: doc.id,   // Si necesitas el ID del documento
        ...doc.data() // Extrae los datos del documento
      }));
  
      return NextResponse.json({ products }, { status: 200 });
      
    } catch (error) {
      console.error('Error al obtener el producto:', error);
      return NextResponse.json({ error: 'Error al obtener el producto' }, { status: 500 });
    }
  }