'use client'
import React from 'react'
import mockData from '../data/mockData'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function getUniqueCategorys(data) {
    const category = data.map(item => item.category)
    return [...new Set(category)]
}
const NavegationMenu = () => {
    const category = getUniqueCategorys(mockData)
    console.log(category)
    const path = usePathname()
    return (
        <div className='bg-gray-800 p-4'>
            <ul className='flex space-x-4 justify-center'>
                {
                    category.map((items, index) => (                      
                        <li key={index} className={`text-white ${path === `/producto/${items.toLowerCase().trim()}` ? "underline underline-offset-8" : "no-underline"}`}>
                            <Link href={`/producto/${items.toLowerCase()}`}>{items}</Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default NavegationMenu
