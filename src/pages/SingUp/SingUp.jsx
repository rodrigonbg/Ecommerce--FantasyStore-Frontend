import InfoUser_Card from "../../components/InfoUser_Card/InfoUser_Card"
import SectionTitle from "../../components/SectionTitle/SectionTitle"
import SingUp_form from "../../components/SingUp_form/SingUp_form"
import { UserContext } from '../../context/UserContext/UserContext'
import { useContext } from 'react'


const SingUp = () => {

    const {user} = useContext(UserContext)
    
    return (
        <div>
            {user?
            <InfoUser_Card/>
            :
            <>
            <SectionTitle text={'Registro de usuario'} />
            <SingUp_form/>
            </>
            }

        </div>
    )
}

export default SingUp