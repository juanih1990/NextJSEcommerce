'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import MenuList from './MenuList'

const Menu = () => {
  const [open, setOpen] = useState(false)

  const handleOpen = (e) => {
    e.stopPropagation()
    setOpen(true)
  }

  const handleClose = (e) => {
    e.stopPropagation()
    setOpen(false)
  }


  return (
   
      <div onClick = {handleOpen}>
        <Image src={'/hamburguesaMenu.png'} alt='Menu hamburguesa' height={40} width={40} />
        <MenuList handleClose={handleClose} open={open} />
      </div>
   
  )
}

export default Menu
