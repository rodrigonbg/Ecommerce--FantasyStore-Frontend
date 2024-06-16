import './Checkout.scss' 
import 'bootstrap'

import { useState } from 'react'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import { UserContext } from '../../context/UserContext/UserContext'
import { Link } from 'react-router-dom'
import Cart_Item from '../../components/Cart_Item/Cart_Item'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import SingUp_form from '../../components/SingUp_form/SingUp_form'
import LogIn_form from '../../components/LogIn_form/LogIn_form'
import InfoUser_Card from '../../components/InfoUser_Card/InfoUser_Card'
import SectionTitleH2 from '../../components/SectionTitleH2/SectionTitleH2'
import { Loading } from '../../components/Loading/Loading'



const Checkout = () => {
    const [idCompra, setIdCompra] = useState(localStorage.getItem('IdCompra')? JSON.parse(localStorage.getItem('IdCompra')) : null) /* Para que al recargar la pag, se mantenga el idCompra  */
    const [loading, setLoading] = useState(false)
    
    const {cart, totalPrice, totalItems, buyItems} = useContext(CartContext)
    const {user, nombre, apellido} = useContext(UserContext)

    const handlePurchase = async (cart) =>{
        setLoading(true)
        const IdCompra = await buyItems(cart)
            if (IdCompra !== undefined){
                setIdCompra(IdCompra)

                localStorage.removeItem('IdCompra')
                localStorage.setItem('IdCompra', JSON.stringify(IdCompra))
            }  
    }

    const handleVolver = () =>{
        setIdCompra(null) 
        localStorage.removeItem('IdCompra')
    }

    return (
        <div className='checkout_container'>
            <SectionTitle text={'Checkout'}/>

            {idCompra !== null ?
                <div className='comprado'>
                    <SectionTitleH2 text = {'Compra exitosa!!!'} />
                    <p>{nombre} {apellido} La compra fue realizada con exito.</p>
                    <p>Este es el código de identificación de su compra: <span>{idCompra}</span></p>
                    <Link to={'/'} onClick={handleVolver} className="buton" >Volver</Link>
                </div>
            :
                <div>
                    {
                        cart.map(prod => {
                        return   <Cart_Item Cart_Item key={prod.item.id} prod={prod}>
                                    <p>{prod.cantidad > 1 ? `X ${prod.cantidad} unidades` : `X ${prod.cantidad} unidad`}</p>
                                    <></>
                                </Cart_Item>
                        })   
                    }
                    <section className='info'>
                        <p>Total de productos: <span>{totalItems}</span></p>
                        <p>Precio Total: <span className='total'>${totalPrice}</span></p>
                    </section>

                    <section className='linkBack'>
                        <p>Si desea modificar los articulos vuelva al carrito de compras: </p>
                        <Link to= {'/cart'} className='link'>Volver al carrito</Link>
                    </section>

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
                            <section>
                                <InfoUser_Card />
                                <button onClick={()=>handlePurchase(cart)} className="buton" >Finalizar compra</button>
                            </section>
                    }
                </div>
            }

        </div>
    )
}

export default Checkout