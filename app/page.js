import React from 'react';
import ProductList from './componentes/ProductList';
import mockData from './data/mockData';

const Page = () => {
  return (
    <div >
       <ProductList category={'all'} data= {mockData} />
    </div>
  );
};

export default Page;
