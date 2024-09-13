'use client'
import { createContext, useContext, useState, useEffect, useCallback } from "react";

const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

export const CartProvaider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [count, setCount] = useState(0);

  const addToCart = (items) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((cartItem) => cartItem.id === items.id);

      if (existingItemIndex !== -1) {
        return prevCart.map((cartItem, index) =>
          index === existingItemIndex
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...items, quantity: 1 }];
      }
    });
  };

  // Guardar el carrito en Firebase usando useCallback para evitar recreación en cada renderizado
  const saveCartToFirebase = useCallback(async () => {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_URL_LOCAL || process.env.NEXT_PUBLIC_URL_EXTERNA;
      const response = await fetch(baseUrl + '/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart }), // 'cart' es una dependencia
      });

      const data = await response.json();
      if (data.success) {
        console.log("Carrito guardado exitosamente, ID:", data.id);
      } else {
        console.error("Error al guardar el carrito:", data.message);
      }
    } catch (error) {
      console.error("Error en la solicitud para guardar el carrito:", error);
    }
  }, [cart]); // 'cart' es la dependencia, se mantiene estable en cada renderizado

  const increase = (num) => {
    setCount(count + num);
  };

  useEffect(() => {
    if (cart.length > 0) {
      saveCartToFirebase();
    }
  }, [cart, saveCartToFirebase]); // Incluye saveCartToFirebase como dependencia

  return (
    <CartContext.Provider
      value={{ cart, addToCart, increase, count, saveCartToFirebase }}
    >
      {children}
    </CartContext.Provider>
  );
};
