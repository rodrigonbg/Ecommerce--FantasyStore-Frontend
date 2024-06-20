import "./LoginButton.scss"
import { UserContext } from "../../context/UserContext/UserContext"
import { useContext , useEffect} from "react"
import { Link } from "react-router-dom"

const LoginButton = (props) => {

  const {validActiveSession, user,logOut, nombre, apellido, rol} = useContext(UserContext)
  useEffect(()=>{

      const valid= async()=>{
          await validActiveSession()
      }
      valid()
  },[user])

  return (
    <div>

      {user?/* paso las calses por argumentos dependiendo del lugar donde se use. */
        <button onClick={logOut} className={props.className} type="button">Cerrar Sesion</button>
      :
        <Link to={'/login'}  className={props.className} type="button">Iniciar sesion</Link>
      }
      
    </div>

  )
}

export default LoginButton