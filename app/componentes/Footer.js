import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <footer className='w-full  bg-gray-300 border-t mt-10'>
        <div className='container m-auto py-2 text-sm text-gray-700 flex justify-between items-center'>
            <p>Desarrollado por Juan hernandez</p>
            <div className='text-black'> 
                <p>Powered By</p>
                <Image src={'/next.svg'} alt='Logo de next' width={50}  height={50}/>
            </div>
        </div>
    </footer>
  )
}

export default Footer
