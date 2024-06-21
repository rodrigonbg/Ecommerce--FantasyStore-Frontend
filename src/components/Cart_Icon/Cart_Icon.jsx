import './Cart_Icon.scss'
import { useState, useEffect, useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import { UserContext } from '../../context/UserContext/UserContext'

const Cart_Icon = () => {
  const [counter, setCounter] = useState(0) 
  const {cart, loadCart, validActiveSessionCart} = useContext(CartContext)
  const {cartID} = useContext(UserContext)

  useEffect(()=>{
    const valid= async()=>{
      await validActiveSessionCart()
    }
    valid()
    
    const fetchProducts= async()=>{
      const res = await loadCart(cartID)

      if(!res.ok){
        setCounter(0)
      }else{
        setCounter(cart? cart.length : 0)/* No quiero usar la cantidad total de productos sino cantidad de prods en carrito sin contar sus cantidades */
      }
    }
    fetchProducts()

  }, [cartID, cart.length])

  return (
    <i id="car" className="fa-solid fa-cart-shopping">  
      {counter > 0 && <span>{counter}</span>}{/* Muestro el counter solo si es mayor que 0 */}
    </i>
  )
}

export default Cart_Icon