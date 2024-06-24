import './UserTickets.scss' 
import React from 'react'
import {getTicketsByEmail, getTickets} from '../../services/API/carts'
import { UserContext } from '../../context/UserContext/UserContext'
import {useState, useEffect, useContext} from 'react'
import { Loading } from '../Loading/Loading'
import Ticket from '../Ticket/Ticket'

const UserTickets = () => {
    const {validActiveSession, user, nombre, apellido, rol, correo, documents} = useContext(UserContext)
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        setLoading(true)

        const fetchTickets= async(email) => {

            let res
            if(rol !== 'admin'){
                res = await getTicketsByEmail(email)
            }else{
                res = await getTickets()
            }
            
            if(res.status === 200){           
                let tickets = await res.json()
                setTickets(tickets)
            }else{
                setTickets([])
            }
            setLoading(false)
            return res
        }
        fetchTickets(correo)

    },[rol])

  return (
    <div className='ticketsContainer'>

        {loading?
            <Loading/>
            :
            <>
                {tickets.length > 0?
                    <>
                        {
                            tickets.map((ticket)=>{
                                return(
                                    <div className='ticket'>
                                        <Ticket ticket={ticket} />
                                        <div className='division'></div>
                                    </div>
                                )
                            })
                        }

                    </>
                    :
                    <p>{rol==='admin'? 'No hay tickets para mostrar.' : 'Aun no se ha realizado ninguna compra.'} </p>
                }
            </>
        }

    </div>
  )
}

export default UserTickets

