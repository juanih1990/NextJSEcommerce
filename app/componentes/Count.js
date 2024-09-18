'use client';
import React, { useState } from 'react';

const Count = ({ setQuantity }) => {
  const [count, setCount] = useState(1);

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
      setQuantity(count - 1); // Actualiza la cantidad en el estado de ProductDetail
    }
  };

  const handleIncrement = () => {
    setCount(count + 1);
    setQuantity(count + 1); // Actualiza la cantidad en el estado de ProductDetail
  };

  return (
    <div className='flex p-5'>
      <button onClick={handleDecrement} className='bg-red-600 w-24 h-12 rounded-lg mr-3'> - </button>
      <p className='text-black content-center text-4xl'>{count}</p>
      <button onClick={handleIncrement} className='bg-green-600 w-24 h-12 rounded-lg  ml-3'> + </button>
    </div>
  );
};

export default Count;
