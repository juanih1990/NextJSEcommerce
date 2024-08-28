import { NextResponse } from "next/server";
import { collection, getDocs, query, where, addDoc , updateDoc ,doc} from "firebase/firestore";
import { db } from "@/app/firebase/config";

export async function POST(request, { params }) {
    try {
        const data = await request.json();  // Obtener el carrito desde el body de la solicitud
        const { cart } = data;

        // Referencia a la colección "carts"
        const cartsRef = collection(db, "Cart");

        // Obtener todos los documentos en la colección "carts"
        const querySnapshot = await getDocs(cartsRef);

        if (!querySnapshot.empty) {
            // Si ya existe al menos un carrito, actualizamos el primero que encontremos
            const existingDoc = querySnapshot.docs[0];
            const docRef = doc(db, "Cart", existingDoc.id);

            await updateDoc(docRef, { cart });

            return NextResponse.json({ success: true, message: "Carrito actualizado exitosamente", id: existingDoc.id });
        } else {
            // Si no existe ningún carrito, creamos uno nuevo
            const docRef = await addDoc(cartsRef, { cart });

            return NextResponse.json({ success: true, message: "Carrito guardado exitosamente", id: docRef.id });
        }
    } catch (error) {
        console.error("Error guardando o actualizando el carrito en Firebase:", error);
        return NextResponse.json({ success: false, message: "Error guardando o actualizando el carrito" }, { status: 500 });
    }
}
