import './Btn_DeleteProduct.scss'
import React from 'react'
import { useContext} from 'react'
import Swal from 'sweetalert2'
import { UserContext } from '../../context/UserContext/UserContext'
import{deleteProductAdmin, deleteProductPremium } from '../../services/API/products'

const Btn_DeleteProduct = (props) => {
    const {rol} = useContext(UserContext)
    
    const fetchDelete = async(id)=>{
        Swal.fire({
            icon: 'question',
            title: '¿Seguro que desea eliminar este producto?',
            showDenyButton: true,    
            confirmButtonText: 'Eliminar',
            denyButtonText: 'Cancelar',
            customClass: {
                confirmButton:"btnConfirm",
                denyButton: "btnDeny",
                icon: "iconQuestion",
                title: "titleText",  
            }

          }).then(async (result) => {
            if (result.isConfirmed) {
                let res
                if(rol === 'admin'){
                    res = await deleteProductAdmin(id)
                }else{
                    res = await deleteProductPremium(id)
                }

                if(res.ok){

                    Swal.fire({
                        icon: 'success',
                        title: 'Producto eliminado!',    
                        showConfirmButton:false,
                        timer: 2000,
                        customClass: {
                            title: "titleText",  
                        }
                    })

                    props.setReload(prev=>prev +1)

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
        <button className='btnEliminar' key={props.id} onClick={async ()=>{ await fetchDelete(props.id)}} > Eliminar producto </button>
    )
}

export default Btn_DeleteProduct