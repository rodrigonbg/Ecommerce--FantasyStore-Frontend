import './Ticket.scss'
import Ticket_item from '../Ticket_item/Ticket_item'
import React from 'react'
import {useState, useEffect, useContext} from 'react'
import { UserContext } from '../../context/UserContext/UserContext'

const Ticket = ({ticket, children}) => {
  const {validActiveSession, user, nombre, apellido, rol, correo, documents} = useContext(UserContext)
  

return (
    <div className='ticketContainert'>
        {children}

        <div className='encabezadoTicket'>
          <h3>Código de ticket: <span className='code'>{ticket.code}</span></h3>
          {rol==='admin'&& (<h3>Comprador: <span className='purchaser'>{ticket.purchaser}</span></h3>)}
        </div>

        <br />
        
        <h3>Productos</h3>
        <div className='listaItems'>
          {ticket.products.map((item) =>{
              return(
                  <Ticket_item item={item}/>
                )
              })
          }
        </div>

        <br />

        <div className='pieTicket'>
          <p>Fecha de compra: <span className='date'>{ticket.purchase_datetime}</span></p>
          <p>Total <span className='amount'>{ticket.amount}</span></p>
        </div>
    </div>
  )
}
  
export default Ticket