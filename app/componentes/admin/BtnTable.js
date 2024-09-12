import React from 'react'

const BtnProductTable = () => {
    return (
        <div>
            <button
                onClick={() => handleRemove(item.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Eliminar
            </button>
            <button
                onClick={() => handleRemove(item.id)}
                className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded ml-1">
                Editar
            </button>
        </div>
    )
}

export default BtnProductTable
