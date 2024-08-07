import Image from 'next/image'
import React from 'react'
import Menu from './Menu'

const NavBar = () => {
  return (
    <div className='w-full bg-cyan-400'>
      <div className='container m-auto py-4 flex justify-between items-center'>
        <Image src={'/jw.png'} alt='logo de coder' width={80} height={20} />
        <Menu/>
      </div>
    </div>
  )
}

export default NavBar
