import { UserContext } from '../../context/UserContext/UserContext'
import { useContext } from 'react'

import './InfoUser_Card.scss'
import SectionTitleH2 from '../SectionTitleH2/SectionTitleH2'

const InfoUser_Card = () => {

    const {id, nombre, apellido, telefono, correo, fechaNac} = useContext(UserContext)

    return (
        <div className='infoUser_card'>
            <SectionTitleH2 text = {'Datos del usuario registrado'}/>
            <hr />
            <p>ID del usuario registrado: <span>{id}</span></p>
            <p>Nombre: <span>{nombre} {apellido}</span></p>
            <p>Telefono: <span>{telefono}</span></p>
            <p>Correo Electronico: <span>{correo}</span></p>
            <p>Fecha de nacimiento: <span>{fechaNac}</span></p>
        </div>

    )
}

export default InfoUser_Card