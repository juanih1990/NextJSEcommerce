import { NextResponse } from "next/server";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/app/firebase/config"

export async function GET(request, { params }) {
    const { category } = params
    
    const productosRef = collection(db, "Productos")

    const q = category == 'all' ? productosRef : query(productosRef, where('category', '==', category))

    const querySnapshot = await getDocs(q)

    const docs = querySnapshot.docs.map(doc => ({
        id: doc.id,  
        ...doc.data()
    }));

    return NextResponse.json(docs)
}
