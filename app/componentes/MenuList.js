import React from 'react'
import Link from 'next/link'
const MenuList = ({ open, handleClose }) => {
    const links = [
        {
            label: "Productos",
            href: "/producto"
        },
        {
            label: "contactanos",
            href: "/contactanos"
        },
        {
            label: "carrito",
            href: "/carrito"
        },
        {
            label: "admin",
            href: "/admin"
        }
    ]
    return (

        <div className={`${open ? 'opacity-100 visible' : 'opacity-0 hidden'} transition-all fixed inset-0 bg-black/50  flex justify-end `}  >
            <aside className={`${!open ? 'translate-x-48' : ''} transition-all  w-48 bg-gray-500 `} onClick={(e) => e.stopPropagation()}>

                <div onClick={handleClose} className='text-white text-right p-4 cursor-pointer'>
                    x
                </div>

                <nav className='flex flex-col gap-3 px-3 mt-4'>
                    {
                        links.map((link) => {
                            return (
                            <Link key={link.label} href={link.href} className='text-base text-slate-100 p-3 text-white' onClick={handleClose}>
                                {link.label}
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
