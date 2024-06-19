import React from 'react'
import { UserContext } from '../../context/UserContext/UserContext'
import {useState, useEffect, useContext} from 'react'
import InfoUser_Card from '../../components/InfoUser_Card/InfoUser_Card'
import SectionTitle from '../../components/SectionTitle/SectionTitle'

const Profile = () => {
    const {validActiveSession, user, nombre, apellido, rol} = useContext(UserContext)
    const [error, setError] = useState(null);
    const [errorUser, setErrorUser] = useState(null);

    useEffect(()=>{
        const valid= async()=>{
            await validActiveSession()
        }
        valid()

        if(!user){
            setErrorUser((<p>Necesitas estar logueado para acceder a esta página</p>))
        }

    },[user])

  return (
    <div>
        {
        errorUser ? 
            errorUser 
            : 
            <div>
                <SectionTitle text={`Perfil ${nombre} ${apellido}, rol: ${rol}`}/>
                <InfoUser_Card/>

            </div>
        }

    </div>
  )
}

export default Profile