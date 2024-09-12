import React from 'react'

const LoadingPage = () => {
  return (
    <div className="fixed w-screen h-screen inset-0 z-10 flex justify-center items-center bg-gray-100">
      <div className="text-center">
        <p className="text-xl font-semibold">Cargando...</p>
        {/* Puedes agregar un spinner u otro indicador de carga aquí */}
      </div>
    </div>
  )
}

export default LoadingPage