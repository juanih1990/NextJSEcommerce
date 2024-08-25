'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link';
const CategorySelected = ({categories}) => {
    const path = usePathname()
  return (
    <div className='bg-gray-800 p-4'>
    <ul className='flex space-x-4 justify-center'>
        {categories.map((category, index) => (
            <li
                key={index}
                className={`text-white ${path === `/producto/${category}` ? "underline underline-offset-8" : "no-underline"}`}

            >
                <Link href={`/producto/${category}`}>
                    {category}
                </Link>
            </li>
        ))}
    </ul>
</div>
  )
}

export default CategorySelected
