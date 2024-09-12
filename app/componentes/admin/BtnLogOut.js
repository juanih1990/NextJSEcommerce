'use client'
import React from 'react'
import Boton from '../Boton'
import { useAuthContext } from '../context/AuthContext'

const BtnLogOut = () => {
    const { logOut } = useAuthContext()
    return (
        <>
            <Boton onClick={logOut} className='bg-red-600'> Logout </Boton>
        </>
    )
}

export default BtnLogOut

