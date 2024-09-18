import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./componentes/NavBar";
import Footer from "./componentes/Footer";

import { AuthProvider } from "./componentes/context/AuthContext";
import { CartProvider } from "./componentes/context/cartContext";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tienda online, venta de celulares y accesorios",
  description: "Aplicacion realizada en next para la venta de dispositivos electronicos principalmente celulares y accesorios",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen  bg-cyan-50">
              <NavBar />
              <main className="flex-grow p-3 bg-cyan-50 mb-2">
                {children}
              </main>
              <Footer />
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
