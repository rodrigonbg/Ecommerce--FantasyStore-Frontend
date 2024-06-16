import './SingUp_form.scss'
import "bootstrap"
import { useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext/UserContext'
import SectionTitleH2 from '../SectionTitleH2/SectionTitleH2'
import {Loading} from '../Loading/Loading'

const SingUp_form = ({children}) => {

    const {singUpUser, loadingSingUp} = useContext(UserContext)

    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [telefono, setTelefono] = useState('')
    const [correo, setCorreo] = useState('')
    const [confirmacionCorreo, setConfirmacionCorreo] = useState('')
    const [fechaNac, setFechaNac] = useState('')
    const [pass, setPass] = useState('')
    const [confirmacionPass, setConfirmacionPass] = useState('')
    const [error, setError] = useState(null)

    const handleNombre = (value) =>{
        setNombre(value)
        setError(null)
    }
    const handleApellido = (value) =>{
        setApellido(value)
        setError(null)
    }
    const handleTelefono = (value) =>{
        setTelefono(value)
        setError(null)
    }
    const handleCorreo = (value) =>{
        setCorreo(value)
        setError(null)
    }
    const handleConfirmacionCorreo = (value) =>{
        setConfirmacionCorreo(value)
        setError(null)   
    }
    const handleFechaNac = (value) =>{
        setFechaNac(value)
        setError(null)
    }
    const handlePass = (value) =>{
        setPass(value)
        setError(null)
    }
    const handleConfirmacionPass = (value) =>{
        setConfirmacionPass(value)
        setError(null)
    }

    const  handleForm = (e)=>{
        e.preventDefault()
        

        if (!nombre || !apellido || !telefono || !correo || !confirmacionCorreo || !fechaNac || !pass || !confirmacionPass ){
            setError(<p className='errorText'>Ningun campo puede quedar vacio</p>)
        }else if((nombre && apellido && telefono && correo && fechaNac && pass) && (pass === confirmacionPass) && (correo === confirmacionCorreo)){
            const user = {
                nombre: nombre,
                apellido: apellido,
                telefono: telefono,
                correo: correo,
                fechaNac: fechaNac,
                contraseña: pass,
            }
            singUpUser(user)

            handleNombre ('')
            handleApellido('') 
            handleTelefono('')
            handleCorreo('')
            handleConfirmacionCorreo('')
            handleFechaNac('')
            handlePass('')
            handleConfirmacionPass('')
        }else{
            setError(<p className='errorText'>Corrobore que los campos de mail y contraseña esten correctos.</p>)
        }
        
    }
  return (

    <div className='singUp_container'>
        
        {children}
        {
        loadingSingUp?
            <Loading />
        :
    
        <form onSubmit={(e) => handleForm(e)}>

            <div className="row">
                <div className="col-md-6">
                    <input type="text" className="form-control" placeholder="Nombre" value={nombre} onChange={(e) => handleNombre(e.target.value) }/>
                </div>
                <div className="col-md-6">
                    <input type="text" className="form-control" placeholder="Apellido" value={apellido} onChange={(e) => handleApellido(e.target.value)}/>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <input type="date" className="form-control" id="FechaDeNacimiento" value={fechaNac} onChange={(e) => handleFechaNac(e.target.value)} />
                </div>
                <div className="col-md-6">
                    <input type="number" className="form-control" id="Telefono" placeholder="Telefono" value={telefono} onChange={(e) => handleTelefono(e.target.value)} />    
                </div>
            </div>

            <div className="mb-3">
                <input type="mail" className="form-control" id="Correo" placeholder="Correo Electronico" value={correo} onChange={(e) => handleCorreo(e.target.value)} />
            </div>

            <div className="mb-3">
                <input type="mail" className="form-control" id="ConfirmacionCorreo" placeholder="Confirmacion de Correo Electronico" value={confirmacionCorreo} onChange={(e) => handleConfirmacionCorreo(e.target.value)} />
                {((correo !== confirmacionCorreo) && (confirmacionCorreo !== null) ) && <p className='errorText'> Los correos deben coincidir </p>}
            </div>

            <div className="row">
                <div className="col-md-6">
                    <input type="password" className="form-control" placeholder="Contraseña" value={pass} onChange={(e) => handlePass(e.target.value)} />
                </div>
                <div className="col-md-6">
                    <input type="password" className="form-control" placeholder="Confirmar Contraseña" value={confirmacionPass} onChange={(e) => handleConfirmacionPass(e.target.value)}/>
                    {((pass !== confirmacionPass) && (confirmacionPass !== null)) && <p className='errorText'> Las contraseñas deben coincidir </p>}
                </div>
            </div>
            {(error !== null)&& error}

            <button type="submit" className="btn btn-primary" >Registrarte</button>
        </form>
        }

        

    </div>
  )
}

export default SingUp_form