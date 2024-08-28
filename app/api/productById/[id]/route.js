import { NextResponse } from "next/server";
import { doc, getDoc } from "firebase/firestore";
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