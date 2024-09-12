'use client'
import React from 'react'
import { useAuthContext } from '../componentes/context/AuthContext'


const Adminlayout = ({children , login}) => {
  const {user} = useAuthContext()
  
  return (
    <>
        {
            user.logged ?  React.Children.toArray(children) : login
        }
    </>
  )
}

export default Adminlayout
