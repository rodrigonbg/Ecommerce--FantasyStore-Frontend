import './Btn_changeRol.scss'
import React from 'react'
import { useContext, useEffect } from 'react'
import Swal from 'sweetalert2'
import{ changeUserRol } from '../../services/API/users'
import { UserContext } from '../../context/UserContext/UserContext'    


const Btn_changeRol = (props) => {

    const {validActiveSession, user} = useContext(UserContext)

    useEffect(()=>{
        const valid= async()=>{
            await validActiveSession()
        }
        valid()

    },[user])


    const fetchBtn = async(id)=>{
        Swal.fire({
            icon: 'question',
            title: '¿Cambiar rol?',
            showDenyButton: true,    
            confirmButtonText: 'Cambiar',
            denyButtonText: 'Cancelar',
            customClass: {
                confirmButton:"btnConfirm",
                denyButton: "btnDeny",
                icon: "iconQuestion",
                title: "titleText",  
            }
        }).then(async (result) => {
            if (result.isConfirmed) {

                let res = await changeUserRol(id)

                if(res.ok){
                    Swal.fire({
                        icon: 'success',
                        title: 'Rol cambiado!',    
                        showConfirmButton:false,
                        timer: 2000,
                        customClass: {
                            title: "titleText",  
                        }
                    })
                    props.setReload(prev => prev +1)
                }else{
                    let error = await res.json()
                    Swal.fire({
                        icon: 'error',
                        title: `${error.message}`,    
                        showConfirmButton:false,
                        timer: 2000,
                        customClass: {
                            title: "titleText",  
                        }
                    })
                }

            }
        })
    }

    return (
        <button className='btnChange' onClick={async()=>{await fetchBtn(props.uid)}} >{props.rol === 'usuario'? 'Ser Premium' : 'Ser rol usuario'}</button>
    )
}

export default Btn_changeRol