import { NextResponse } from "next/server";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/app/firebase/config"

export async function GET(request, { params }) {


    const cartsRef = collection(db, "Cart")

    // Obtener todos los documentos en la colección "carts"
    const querySnapshot = await getDocs(cartsRef);
    
    const docs = querySnapshot.docs.map(doc => ({
        ...doc.data()
    }));
    return NextResponse.json(docs)
}
