import LogIn_form from '../../components/LogIn_form/LogIn_form'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import './LogIn.scss'
import { UserContext } from '../../context/UserContext/UserContext'
import { useContext } from 'react'
import InfoUser_Card from '../../components/InfoUser_Card/InfoUser_Card'
import { Link } from 'react-router-dom'

const LogIn = () => {

    const {user} = useContext(UserContext)

    return (
        <div>
            {user?
            <InfoUser_Card />
            :
            <>
            <SectionTitle text={'Inicio de sesion'} />
            <LogIn_form />
            <p>Registrate haciendo click <Link className='link' to={'/singup'}>acá</Link></p>
            </>
            }

        </div>
    )
}

export default LogIn