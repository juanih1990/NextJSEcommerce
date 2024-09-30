import { NextResponse } from "next/server";
import { doc, getDoc, deleteDoc , updateDoc  } from "firebase/firestore";
import { db } from "@/app/firebase/config";

export async function GET(request, { params }) {
    const { id } = params;

    // Referencia directa al documento con el ID especificado
    const productoRef = doc(db, "Productos", id);

    // Obtengo el documento 
    const docSnapshot = await getDoc(productoRef);

    if (docSnapshot.exists()) {
        // Si el documento existe, devuelvo los datos del producto
        const productData = {
            id: docSnapshot.id,
            ...docSnapshot.data()
        };
        return NextResponse.json(productData);
    } else {
        // Si no se encuentra el documento, devolver un error 404
        return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
    }
}
export async function DELETE(request, { params }) {
    console.log("ROUTE" )
    const { id } = params

    const productRef = doc(db, "Productos", id)

    const docSnapshot = await getDoc(productRef)
    console.log("Eliminado" + JSON.stringify(docSnapshot))
    if (docSnapshot.exists()) {
       await deleteDoc(productRef)
       console.log("documento eliminado")
       return NextResponse.json({ message: "Producto eliminado con éxito" }, { status: 200 })
    }
    else {
        // Si no se encuentra el documento, devolver un error 404
        return NextResponse.json({ error: "Error al eliminar el producto" }, { status: 404 });
    }
}
export async function PUT(request, { params }) {
    console.log("ENTRA AL PUT")
    const { id } = params;

    // Referencia directa al documento con el ID especificado
    const productoRef = doc(db, "Productos", id);

    // Obtener el cuerpo de la solicitud para extraer los datos que se quieren actualizar
    const body = await request.json();

    // Verifico si el documento existe antes de intentar actualizarlo
    const docSnapshot = await getDoc(productoRef);

    if (docSnapshot.exists()) {
        // Actualizo el documento con los datos proporcionados en el cuerpo de la solicitud
        await updateDoc(productoRef, body);

        // Devuelvo una respuesta de éxito
        return NextResponse.json({ message: "Producto actualizado con éxito" }, { status: 200 });
    } else {
        // Si no se encuentra el documento, devolver un error 404
        return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
    }
}