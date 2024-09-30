import React from 'react';
import CategorySelected from './CategorySelected';


// Función para obtener categorías únicas
const getUniqueCategories = (data) => {
    const categories = data.map(item => item.category);
    return [...new Set(categories)];
}

const NavegationMenu = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_URL_LOCAL || process.env.NEXT_PUBLIC_URL_EXTERNA
    const data = await fetch(baseUrl + '/api/producto/all', { cache: 'no-store' }).then(r => r.json());
    const categories = getUniqueCategories(data); 
    
    return (
       <CategorySelected  categories = {categories} />
    );
};

export default NavegationMenu;

