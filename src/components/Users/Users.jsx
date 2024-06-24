import './Users.scss'
import React from 'react'
import {getUsers} from '../../services/API/users'
import { UserContext } from '../../context/UserContext/UserContext'
import {useState, useEffect, useContext} from 'react'
import { Loading } from '../Loading/Loading'

const Users = () => {
    const {validActiveSession, user, rol, correo, documents} = useContext(UserContext)
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        setLoading(true)

        const fetchUsers = async() => {
            if(rol === 'admin'){
                const res = await getUsers()
                    .then(async (res) => {
                        if(res.status === 200){           
                            const usuarios = await res.json()
                            setUsers(usuarios)
                        }else{
                            setUsers([])
                        }
                        return res
                    })
                    .catch((err) => setUsers([`Error al cargar los usuarios, ${err}`]))
                    .finally(()=>{
                        console.log(users)
                        setLoading(false)
                    })
            
            }
        }
        fetchUsers()

    },[rol])

  return (
    <div className='usersContainer'>
        {loading?
            <Loading/>
            :
            <>
                {users.length > 0?
                    <>
                        {
                            users.map((user)=>{
                                return(
                                    <div key={user._id} className='user'>
                                        <p>identificador: {user._id}</p> 
                                        <p>Nombre: {user.firstName } {user.lastName}</p> 
                                        <p>Email: {user.correo}</p>
                                        <p>Rol: {user.rol}</p>
                                        <p>unltima conexión: {user.last_connection}</p>
                                        <div className='division'></div>
                                    </div>
                                )
                            })
                        }

                    </>
                    :
                    <p>No hay users para mostrar.</p>
                }
            </>
        }
    </div>
  )
}

export default Users