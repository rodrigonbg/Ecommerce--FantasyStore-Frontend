import './Checkout.scss' 
import 'bootstrap'
import { useContext, useEffect, useState} from 'react'
import { CartContext } from '../../context/CartContext'
import { UserContext } from '../../context/UserContext/UserContext'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import Cart_Item from '../../components/Cart_Item/Cart_Item'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import SingUp_form from '../../components/SingUp_form/SingUp_form'
import LogIn_form from '../../components/LogIn_form/LogIn_form'
import InfoUser_Card from '../../components/InfoUser_Card/InfoUser_Card'
import SectionTitleH2 from '../../components/SectionTitleH2/SectionTitleH2'
import { Loading } from '../../components/Loading/Loading'
import { finishPurchase } from '../../services/API/carts'


const Checkout = () => {
    const {cart, totalPrice, totalItems} = useContext(CartContext)
    const {user, nombre, apellido ,validActiveSession, rol, cartID} = useContext(UserContext)

    const [idCompra, setIdCompra] =  useState(null)
    const [loading, setLoading] = useState(false)
    
    
    useEffect(()=>{
        setLoading(true)
        
        const valid= async()=>{
            await validActiveSession()
            
            setLoading(false)
        }
        valid()

    },[])

    const handlePurchase = async (cartID) =>{

        Swal.fire({
            icon: 'question',
            title: '¿Confirmar compra?',
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
                setLoading(true)
                const res = await finishPurchase(cartID);

                if(res.status === 201){
                    const ticket = await res.json() 
                    setIdCompra(ticket.code)
                }else{
                    const error = await res.json() 
                    Swal.fire({
                        icon: 'error',
                        title: `${error.message}`,
                        showDenyButton: true,    
                        confirmButtonText: 'Aceptar',
                        denyButtonText: 'Cancelar',
                        customClass: {
                            confirmButton:"btnConfirm",
                            icon: "iconQuestion",
                            title: "titleText",  
                        }
                    })
                }
            }
        })
        .finally(()=>{ setLoading(false) })
    }

    return (
        <section className='checkout_container'>

            {!user?
                <LogIn_form>
                    <SectionTitleH2 text={'Para ingresar al checkout, inicie sesión.'}/>
                </LogIn_form>
                :

                <div>
                    {rol === 'admin'?
                        <>Los administradores no tienen acceso al checkout</>
                        :
                        <>
                            <SectionTitle text={'Checkout'}/>

                            {loading?
                                <Loading/>
                                :
                                <>
                                    {idCompra?
                                        <p>Id de compra {idCompra}{/* Aca va un componente de vista de ticket */}</p>
                                        :
                                        <>
                                            {cart.length === 0 ?
                                                <p>No hay poroductos en su carrito.</p>
                                                :
                                                <div>
                                                    {cart.map(item => {
                                                        return  <Cart_Item key={item.product._id} prod={item.product} cantidad={item.quantity}>
                                                                    <p>{item.quantity > 1 ? `X ${item.quantity} unidades` : `X ${item.quantity} unidad`}</p>
                                                                    <></>
                                                                </Cart_Item>
                                                            })   
                                                    }
                                                </div>
                                            }
        
                                            <section className='info'>
                                                <p>Total de productos: <span>{totalItems}</span></p>
                                                <p>Precio Total: <span className='total'>${totalPrice}</span></p>
                                            </section>
        
                                            <section className='linkBackCart'>
                                                <p>Si desea modificar los articulos vuelva al carrito de compras: </p>
                                                <Link to= {'/cart'} className='link'>Volver al carrito</Link>
                                            </section>
        
                                            <button onClick={async ()=> await handlePurchase(cartID)} className="buton" >Finalizar compra</button>
                                        </>
                                    }
                                </>
                            }


                        </>  
                    }   
                </div>
            }

        </section>
    )


/*         <div className='checkout_container'>
            

            {idCompra !== null ?
                <div className='comprado'>
                    <SectionTitleH2 text = {'Compra exitosa!!!'} />
                    <p>{nombre} {apellido} La compra fue realizada con exito.</p>
                    <p>Este es el código de identificación de su compra: <span>{idCompra}</span></p>
                    <Link to={'/'} onClick={handleVolver} className="buton" >Volver</Link>
                </div>
            :
                <div>

                    {!user?             
                        <section className='form'>
                            <p className='msg'>Antes de continuar con tu compra, inicia sesion o registrate </p>
                            <LogIn_form>
                                <SectionTitleH2 text = {'Inicio de sesión'} />
                            </LogIn_form>
                            <SingUp_form>
                                <SectionTitleH2 text = {'Registro de usuario'}/>
                            </SingUp_form>
                        </section>
                    : 

                        loading? 
                            <Loading/>
                        :

                    }
                </div>
            }

        </div> */
}

export default Checkout