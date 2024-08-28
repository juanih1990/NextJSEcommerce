'use client'
import { createContext, useContext, useState , useEffect} from "react"

const CartContext = createContext()

export const useCartContext = () => useContext(CartContext)

export const CartProvaider = ({children}) =>{
    const [cart,setCart] = useState([])
    const [count, setCount] = useState(0)
    

    const addToCart = (items) => {
        console.log("ITEM Q ENTRA:  " , JSON.stringify(items))
        setCart(prevCart => {
            const existingItemIndex = prevCart.findIndex(cartItem => cartItem.id === items.id);

            if (existingItemIndex !== -1) {
                // Crear una nueva copia del carrito con el item actualizado
                return prevCart.map((cartItem, index) =>
                    index === existingItemIndex
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                // Agregar un nuevo item con cantidad 1
                return [...prevCart, { ...items, quantity: 1 }];
            }
        });
       
    }

    const saveCartToFirebase = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cart }),
            });
            console.log("ITEM AGREGADO: " , JSON.stringify(cart))
            const data = await response.json();
            if (data.success) {
                console.log("Carrito guardado exitosamente, ID:", data.id);
            } else {
                console.error("Error al guardar el carrito:", data.message);
            }
        } catch (error) {
            console.error("Error en la solicitud para guardar el carrito:", error);
        }
    };

    const increase = (num) => {
        setCount(count + num)
    }

    useEffect(() => {
        if (cart.length > 0) {
            saveCartToFirebase();
        }
    }, [cart]); // Escucha cambios en el carrito
    
    return(
        <CartContext.Provider
            value = {{cart, addToCart , increase , count , saveCartToFirebase }}
        >
            {children}
        </CartContext.Provider>
    )
}