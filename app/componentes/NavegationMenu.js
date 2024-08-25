import React from 'react';
import CategorySelected from './CategorySelected';


// Función para obtener categorías únicas
const getUniqueCategories = (data) => {
    const categories = data.map(item => item.category);
    return [...new Set(categories)];
}

const NavegationMenu = async () => {
    const data = await fetch('http://localhost:3000/api/producto/all', { cache: 'no-store' }).then(r => r.json());
    const categories = getUniqueCategories(data); // Extraer categorías únicas
    
    return (
       <CategorySelected  categories = {categories} />
    );
};

export default NavegationMenu;

