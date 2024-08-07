import React from 'react'
import NavegationMenu from '../componentes/NavegationMenu'

const layout = ({children}) => {
  return (
    <div>
        <NavegationMenu/>
        {children}
    </div>
  )
}

export default layout
