import './Cart.scss'
import { Link } from 'react-router-dom'
import { useContext, useEffect, useState} from 'react'
import { CartContext } from '../../context/CartContext'
import { UserContext } from '../../context/UserContext/UserContext'
import Swal from 'sweetalert2'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import Cart_Item from '../../components/Cart_Item/Cart_Item'
import EmptyCart_Card from '../../components/EmptyCart_Card/EmptyCart_Card'
import Btn_HandleAmount from '../../components/Btn_HandleAmount/Btn_HandleAmount'
import Btn_RemoveItem from '../../components/Btn_RemoveItem/Btn_RemoveItem'

import LogIn_form from '../../components/LogIn_form/LogIn_form'
import SectionTitleH2 from '../../components/SectionTitleH2/SectionTitleH2'
import { Loading } from '../../components/Loading/Loading'


const Cart = () => {
  const {user,cartID , validActiveSession} = useContext(UserContext)
  const {loadCart, cart, updateCartWithArr, setCart, clearCart, totalPrice, totalItems} = useContext(CartContext)

  const [errorCart, setErrorCart] = useState(null);
  const [loader, setLoader] = useState(true);

  useEffect(()=>{
    const valid= async()=>{
        await validActiveSession()
    }
    valid()

    const fetchProducts= async()=>{
      const res = await loadCart(cartID)

      if(!res.ok){
        setErrorCart((<p>Error al obtener el carrito: {res.message}</p>))
      }else{
        setErrorCart((null))
      }
      setLoader(false)
    }
    fetchProducts()
    
  },[])
  
  const handleClearCart = () =>{
    Swal.fire({
      icon: 'question',
      title: '¿Seguro que desea vaciar el carrito?',
      showDenyButton: true,    
      confirmButtonText: 'Vaciar',
      denyButtonText: 'Cancelar',
      customClass: {
          confirmButton:"btnConfirm",
          denyButton: "btnDeny",
          icon: "iconQuestion",
          title: "titleText",  
      }
    }).then(async (result) => {
      if (result.isConfirmed) {

          Swal.fire({
              icon: 'success',
              title: 'Carrito vaciado!',    
              showConfirmButton:false,
              timer: 2000,
              customClass: {
                  title: "titleText",  
              }
          })
          await updateCartWithArr(cartID,[])
          window.scroll({top: 0})

      }else if (result.isDenied) {
          Swal.fire({
              icon:'success',
              title: 'Genial',
              showConfirmButton: false,
              timer: 1000,
              customClass: {
                  title: "titleText",  
              }
          })
      }
  })
  }
 
  return (
    <section>

      {!user?
          <LogIn_form>
            <SectionTitleH2 text={'Para ingresar a su carrito inicie sesión.'}/>
          </LogIn_form>
          :
          <section className="cart_Container">

            <SectionTitle text={'carrito de compras'} />
            <div className="tablaCarrito">
                <section className="cabezaLista">
                        <p><strong>Articulo</strong></p>
                        <p><strong>Descripción</strong></p>
                        <p><strong>Importe</strong></p>
                        <p><strong>Cantidad</strong></p>
                        <p><strong>Subtotal</strong></p>
                        <p><strong>Quitar</strong></p>
                </section>

                {loader?
                  <Loading/>
                  :
                  <>
                    {errorCart?
                      errorCart
                      :
                      <>
                        <section className="cuerpoLista">{/* Recorro el carrito y genero los items agregados */}
                          {
                            cart.map(item =>  <Cart_Item key={item.product._id} prod={item.product} cantidad={item.quantity}>
                                                <Btn_HandleAmount idProd={item.product._id} cantidad={item.quantity}/> 
                                                <Btn_RemoveItem idProd={item.product._id}/>
                                              </Cart_Item> )
                          } 
                        </section>

                        {cart.length > 0 ? 
                          <>
                            <section className="pieLista">{/* si hay prods en el carrito */}
                              <button className="btnVaciarCarrito" onClick={handleClearCart}>Vaciar Carrito</button> 
                              <p className="importeTotal"> Con un total de {totalItems} productos, el importe total a abonar es de: <strong> ${totalPrice.toFixed(2)} </strong> </p>
                            </section> 

                            <div className="botonesCarrito">
                              <Link to={'/'} className="Link">Seguir comprando</Link>
                              <Link to={'/cart/checkout'} className="Link">Checkout</Link>
                            </div>
                          </>
                          : 
                          <section className="pieLista">{/* si no hay prods en carrito */}
                            <EmptyCart_Card />
                          </section>
                        }

                      </>
                    }
                  </>
                } 
            </div>
            
          </section>
      }

    </section>
  )
}

export default Cart