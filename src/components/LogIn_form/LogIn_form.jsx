import './LogIn_form.scss'
import 'bootstrap'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext/UserContext'

import React from 'react'
import SectionTitleH2 from '../SectionTitleH2/SectionTitleH2'
import { Loading } from '../Loading/Loading'

const LogIn_form = ({children}) => {
  const [correo, setCorreo] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState(null)

  const {findUser, loadingLogIn} = useContext(UserContext)

  const handleCorreo = (value) =>{
    setCorreo(value)
    setError(null)
  }
  const handlePass = (value) =>{
    setPass(value)
    setError(null)
  }

  const handleSubmit = async (e) =>{

    e.preventDefault()

    if (!correo ||  !pass){
      setError(<p className='errorText'>Ningun campo puede quedar vacio</p>)
    }else{
      await findUser(correo, pass)

      handleCorreo('')
      handlePass('')
    }
  }

  return (
    <div className='LogIn_container'>

      {children}

      {loadingLogIn?
        <Loading/>
        :
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-3">
          <input type="email" className="form-control" id="Correo" placeholder="Correo Electronico" value={correo} onChange={(e) => handleCorreo(e.target.value)} />
        </div>
        <div className="mb-3">
          <input type="password" className="form-control" id="Correo" placeholder="Contraseña" value={pass} onChange={(e) => handlePass(e.target.value)} />
        </div>
        {(error !== null)&& error}
        <button type="submit" className="btn btn-primary" >Iniciar Sesion</button>
      </form>
      }
    </div>
  )
}

export default LogIn_form