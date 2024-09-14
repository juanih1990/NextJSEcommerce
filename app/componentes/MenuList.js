import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCartContext } from './context/cartContext'
const MenuList = ({ open, handleClose }) => {
    const { count } = useCartContext()
    const links = [
        {
            label: "Productos",
            href: "/producto"
        },
        {
            label: "cart",
            href: "/cart"
        },
        {
            label: "admin",
            href: "/admin"
        }
    ]
    return (

        <div className={`${open ? 'opacity-100 visible' : 'opacity-0 hidden'} transition-all fixed inset-0 bg-black/50  flex justify-end `}  >
            <aside className={`${!open ? 'translate-x-48' : ''} bg-cyan-500 transition-all  w-48  `} onClick={(e) => e.stopPropagation()}>

                <div onClick={handleClose} className='text-white text-right p-4 cursor-pointer'>
                    x
                </div>

                <nav className='flex flex-col gap-3 px-3 mt-4'>
                    {
                        links.map((link) => {
                            return (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className='text-base p-3 text-white focus:text-slate-300 hover:text-slate-300 hover:bg-cyan-600 transition-colors duration-200 '
                                    onClick={handleClose} >
                                    {link.label == 'cart' ? (
                                        <>
                                            <Image src='/cartSvg.svg' alt="carrito de compras" width={25} height={25} className='text-base  text-white focus:text-slate-300 hover:text-slate-300 transition-colors duration-200 ' />
                                            <span className='m-6 rounded-full border p-2 bg-yellow-500'>{count}</span> 
                                        </>) : (
                                        link.label
                                    )}
                                </Link>
                            )
                        })

                    }
                </nav>
            </aside>
        </div>

    )
}

export default MenuList
