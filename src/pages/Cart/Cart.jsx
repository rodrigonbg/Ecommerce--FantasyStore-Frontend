import './Cart.scss'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import { useContext } from 'react'
import Swal from 'sweetalert2'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import Cart_Item from '../../components/Cart_Item/Cart_Item'
import EmptyCart_Card from '../../components/EmptyCart_Card/EmptyCart_Card'
import Btn_HandleAmount from '../../components/Btn_HandleAmount/Btn_HandleAmount'
import Btn_RemoveItem from '../../components/Btn_RemoveItem/Btn_RemoveItem'


const Cart = () => {

  const {cart, clearCart, totalPrice, totalItems} = useContext(CartContext)

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
    }).then((result) => {
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
          clearCart()
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

          <section className="cuerpoLista">{/* Recorro el carrito y genero los items agregados */}
            {
            cart.map(prod =>  <Cart_Item key={prod.item.id} prod={prod}>
                                <Btn_HandleAmount id={prod.item.id} cantidad={prod.cantidad}/> 
                                <Btn_RemoveItem id={prod.item.id}/>
                              </Cart_Item> )
            } 
          </section>

          {
          cart.length > 0 ? 
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

      </div>



  </section>
  )
}

export default Cart