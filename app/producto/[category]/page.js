'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import mockData from '@/app/data/mockData'
import ProductList from '@/app/componentes/ProductList'

const page = () => {
    const {category} = useParams()
    const filterData = 
    category === 'all' ? mockData : mockData.filter(item => item.category.toUpperCase() === category.toUpperCase())
    return (
    <>
        <ProductList  category={category} data={filterData}/>
    </>
  )
}

export default page
