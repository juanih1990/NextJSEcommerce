import React from 'react';
import ProductList from "../componentes/ProductList";


const  Home = async () => {

       const baseUrl = process.env.NEXT_PUBLIC_URL_LOCAL || process.env.NEXT_PUBLIC_URL_EXTERNA
       const product = await fetch(`${baseUrl}api/producto/all`, { cache: 'no-store' }).then(r => r.json());
  
  return (
    <div>
      <ProductList data={product} />
    </div>
  );
}
export default Home