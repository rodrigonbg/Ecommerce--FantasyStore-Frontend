import './EmptyCart_Card.scss'
import React from 'react'
import carita from '../../icons/caraTriste.png'

const EmptyCart_Card = () => {
  return (
    <div className="cardCarritoVacio">
        <div className="mensaje">
            <img src={carita} alt="carita triste"/>
            <p>El Carrito de compras se encuentra vacío.</p>
            <p>Agregue algunos productos antes de realizar la compra.</p>
        </div>
    </div>
  )
}

export default EmptyCart_Card