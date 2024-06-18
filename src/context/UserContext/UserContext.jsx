import { useState, createContext } from "react";
import { collection, addDoc, doc, query, getDocs, getDoc, where, limit} from "firebase/firestore" 
import './UserContext.scss'
import { db } from '../../services/config'
import Swal from 'sweetalert2'
import {LocalLogin, GithubRegisterLogin, logout, LocalRegister, validSession} from '../../services/API/users'

export const UserContext = createContext()


export const UserContextProvider = ({children}) => {
    /* usestate para almacentar informacion del cliente logueado */
    const [user, setUser] = useState(localStorage.getItem("usuario")? JSON.parse(localStorage.getItem("usuario")).user : false)
    const [id, setId] = useState(localStorage.getItem("usuario")? JSON.parse(localStorage.getItem("usuario")).id : null)
    const [nombre, setNombre] = useState(localStorage.getItem("usuario")? JSON.parse(localStorage.getItem("usuario")).nombre : null)
    const [apellido, setApellido] = useState(localStorage.getItem("usuario")? JSON.parse(localStorage.getItem("usuario")).apellido : null)
    const [lastConnection, setLastConnection] = useState(localStorage.getItem("usuario")? JSON.parse(localStorage.getItem("usuario")).lastConnection : null)
    const [telefono, setTelefono] = useState(localStorage.getItem("usuario")? JSON.parse(localStorage.getItem("usuario")).telefono : null)
    const [rol, setRol] = useState(localStorage.getItem("usuario")? JSON.parse(localStorage.getItem("usuario")).rol : null)
    const [correo, setCorreo] = useState(localStorage.getItem("usuario")? JSON.parse(localStorage.getItem("usuario")).correo : null)
    const [fechaNac, setFechaNac] = useState(localStorage.getItem("usuario")? JSON.parse(localStorage.getItem("usuario")).fechaNac : null)
    const [edad, setEdad] = useState(localStorage.getItem("usuario")? JSON.parse(localStorage.getItem("usuario")).edad : null)
    const [cartID, setCartID] = useState(localStorage.getItem("usuario")? JSON.parse(localStorage.getItem("usuario")).cartID : null)
    const [documents, setDocuments] = useState(localStorage.getItem("usuario")? JSON.parse(localStorage.getItem("usuario")).documents : [])
    const [idCompra, setIdCompra] = useState(null)
    const [loadingLogIn, setLoadingLogIn] = useState(false)
    const [loadingSingUp, setLoadingSingUp] = useState(false)
    
    const updateLocalStorage = () =>{
        const usuario = {
            user: user,
            id: id,
            nombre: nombre,
            apellido: apellido,
            telefono: telefono,
            rol:rol,
            correo: correo,
            fechaNac: fechaNac,
            edad:edad,
            cartID:cartID,
            lastConnection: lastConnection,
            documents:documents
        }
        let usuarioJson = JSON.stringify(usuario)
        localStorage.removeItem('usuario')
        localStorage.setItem('usuario', usuarioJson)
    }

    const logIn = (user) => {
        setUser(true)
        setId(user._id)
        setNombre(user.firstName)
        setApellido(user.lastName)
        setLastConnection(user.last_connection)
        setRol(user.rol)
        setTelefono(null)
        setCartID(user.cart)
        setCorreo(user.correo)
        setFechaNac(null)
        setEdad(user.age)
        setDocuments(user.documents)
        updateLocalStorage()
    }

    const logOut = async() => {
        Swal.fire({
            icon: 'question',
            title: '¿Seguro que desea cerrar sesión?',
            showDenyButton: true,    
            confirmButtonText: 'Aceptar',
            denyButtonText: 'Cancelar',
            customClass: {
                confirmButton:"btnConfirm",
                denyButton: "btnDeny",
                icon: "iconQuestion",
                title: "titleText",  
            }
        })
        .then(async (res)=>{
            if (res.isConfirmed){
                await logout().catch((er)=> console.log(er))
                setUser(false)
                setId (null)
                setNombre(null)
                setApellido(null)
                setLastConnection(null)
                setRol(null)
                setTelefono(null)
                setCartID(null)
                setCorreo(null)
                setFechaNac(null)
                setEdad(null)
                setDocuments([])
                updateLocalStorage()
            }
        })
    }

    const findUser = async (mail, pass) => {
        setLoadingLogIn(true)

        await LocalLogin({email:mail, password:pass})
            .then(async (res)=>{
                if(res.status !== 200){                
                    Swal.fire({
                        icon: 'error',
                        title: `${res.message}`,    
                        showConfirmButton:false,
                        timer: 2000,
                        customClass: {
                            title: "titleText",  
                        }
                    })
                }else{
                    const user = await res.user;
                    setId(user._id)
                    logIn(user)
                    Swal.fire({
                        icon: 'success',
                        title: 'usuario Logueado',    
                        showConfirmButton:false,
                        timer: 2000,
                        customClass: {
                            title: "titleText",  
                        }
                    })  
                    console.log(user)
                }
            })
            .catch((error)=>{
                Swal.fire({
                    icon: 'error',
                    title: 'Hubo un error',    
                    showConfirmButton:false,
                    timer: 2000,
                    customClass: {
                        title: "titleText",  
                    }
                })
                console.log(error)
            })
            .finally(() => setLoadingLogIn(false))
    }   
  
    const singUpUser = async (user) => {
        setLoadingSingUp (true)

        LocalRegister(user)
            .then((res)=>{
                console.log('resss', res)
                if(res._id){
                    logIn(res)

                }else if(res.status !== 200){
                    Swal.fire({
                        icon: 'error',
                        title: res.message[0],    
                        confirmButtonText: 'Aceptar',
                        customClass: {
                            title: "titleText",  
                        }
                    })
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Error desconocido',    
                        confirmButtonText: 'Aceptar',
                        customClass: {
                            title: "titleText",  
                        }
                    }) 
                }
            })
            .catch((error)=>{
                console.log(error)
                Swal.fire({
                    icon: 'error',
                    title: 'Error al verificar usuarios en la base de datos.',   
                    confirmButtonText: 'Aceptar',
                    customClass: {
                        confirmButton:"btnConfirm",
                        icon: "iconQuestion",
                        title: "titleText",  
                    }
                })
            })
            .finally(() => setLoadingSingUp(false))
    }

    const validActiveSession = async()=>{
        const session = await validSession()

        if(!session){
            setUser(false)
            setId (null)
            setNombre(null)
            setApellido(null)
            setLastConnection(null)
            setRol(null)
            setTelefono(null)
            setCartID(null)
            setCorreo(null)
            setFechaNac(null)
            setEdad(null)
            setDocuments([])
            updateLocalStorage() //Si la sesion está incactiva, deslogueo
        }
    }

    updateLocalStorage()

    return(
        <UserContext.Provider value={{user, id, nombre, apellido, telefono, correo, fechaNac, edad ,lastConnection, cartID, rol, documents, loadingSingUp, loadingLogIn, singUpUser, findUser, logOut, validActiveSession}}>
            {children}
        </UserContext.Provider>
    )
    /* En el value enviamos el valor acutal del carrito y los metodos a los componentes de mi app que lo necesiten  */
}