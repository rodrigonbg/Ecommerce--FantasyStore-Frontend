import React from 'react'
import './UploadDocuments.scss'
import {useState, useEffect, useContext} from 'react'
import { UserContext } from '../../context/UserContext/UserContext'
import Swal from 'sweetalert2'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

import {uploadUserDocuments} from '../../services/API/users'
import Btn_changeRol from '../Btn_changeRol/Btn_changeRol'

const UploadDocuments = (props) => {
    const {validActiveSession, rol, user, id, documents} = useContext(UserContext)
    const [errorUser, setErrorUser] = useState(null);
    const [loader, setLoader] = useState(true)
    const [reload, setReload] = useState(0)

    const [document, setDocuemnt] = useState(null);
    const [homeBill, setHomeBill] = useState(null);
    const [bankBill, setBankBill] = useState(null);

    const [errorDocuemnt, setErrorDocuemnt] = useState(null);
    const [errorHomeBill, setErrorHomeBill] = useState(null);
    const [errorBankBill, setErrorBankBill] = useState(null);

    useEffect(()=>{
        setLoader(true)

        const valid= async()=>{
            await validActiveSession()
        }
        valid()

        if(!user){
            setErrorUser((<p className='error'>Necesitas estar logueado para acceder a esta página</p>))
        }else if(rol === 'admin'){
            setErrorUser((
                <div className='error'>
                    <p>Los documentos son necesarios solamente en caso de ser Usuario no administrador.</p>
                </div>
                ))
        }else{
            setErrorUser(null)
        }
        setLoader(false)

    },[user, reload])

    const handleDocument = (files) =>{
        setDocuemnt(files)
        setErrorDocuemnt(null)
    }

    const handleHomeBill = (files) =>{
        setHomeBill(files)
        setErrorHomeBill(null)
    }

    const handleBankBill = (files) =>{
        setBankBill(files)
        setErrorBankBill(null)
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        //si hay errores
        if( errorDocuemnt || errorHomeBill || errorBankBill){
            
            Swal.fire({
                icon: 'error',
                title: `Hay datos invalidos.`,    
                confirmButtonText: 'Aceptar',
                customClass: {
                    title: "titleText",  
                }
            })

        }else{ //no hay errores S

            const formData = new FormData();
            formData.append('document', document);
            formData.append('homeBill', homeBill);
            formData.append('bankBill', bankBill);

            let res = await uploadUserDocuments(id ,formData)
 
            if(res.status === 200){

                Toastify({
                    text: `Documentos cargados con exito`,
                    duration: 3500,
                    close: true,
                    gravity: "bottom", // `top` or `bottom`
                    position: "left", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    className: "mensajeToastify agregado"
                }).showToast();
                
                props.setReload(prev=> prev +1)

            }else{
                let errorMessage = 'Error desconocido';
                try {
                    const errorData = await res.json();
                    errorMessage = errorData.message || errorMessage;
                } catch (e) {
                    console.error('No se pudo parsear la respuesta como JSON:', e);
                }

                Swal.fire({
                    icon: 'error',
                    title: `${errorMessage}`,    
                    confirmButtonText: 'Aceptar',
                    customClass: {
                        title: "titleText",  
                    }
                })
            }

        }
    }

  return(
    <section className='addDocumentContainer'>

        {loader?
            loader
            :
            <>
                {documents.length>0?
                    <>
                        <p>Ya tienes documentos cargados</p>
                        {rol === 'usuario'?
                            <div>
                                <p>Aun no son usuario premium</p> 
                                <Btn_changeRol setReload={setReload} uid={id} rol={rol}/>
                            </div>
                            :
                            <p>Ya sos usuario premium</p>
                        }
                    </>
                    :
                    <>
                        <h2>Seleccione los documentos</h2>

                        <form onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data">
                            <label htmlFor="document"> Seleccione su documento</label>
                            {errorDocuemnt&& errorDocuemnt}
                            <input type="file" required={true} name='document' id='document' onChange={(e) => handleDocument(e.target.files[0])}/>

                            <label htmlFor="document"> Seleccione comprobante de domicilio</label>
                            {errorHomeBill&& errorHomeBill}
                            <input type="file" required={true} name='homeBill' id='homeBill' onChange={(e) => handleHomeBill(e.target.files[0])}/>

                            <label htmlFor="document"> Seleccione estado de cuenta</label>
                            {errorBankBill&& errorBankBill}
                            <input type="file" required={true} name='bankBill' id='bankBill' onChange={(e) => handleBankBill(e.target.files[0])}/>

                            <button type="submit" className='submitForm'>Cargar documentos</button>
                        </form>
                    </>
                }
                 
            </>
        }


    </section>
  )
}

export default UploadDocuments