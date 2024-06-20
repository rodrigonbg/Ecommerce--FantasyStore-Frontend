import './Cart_Icon.scss'
import { useState, useEffect, useContext } from 'react'
import { CartContext } from '../../context/CartContext'

const Cart_Icon = () => {
  const [counter, setCounter] = useState(0) 
  const {cart} = useContext(CartContext)

  useEffect(()=>{
    setCounter(cart? cart.length : 0)/* No quiero usar la cantidad total de productos sino cantidad de prods en carrito sin contar sus cantidades */
  }, [cart])

  return (
    <i id="car" className="fa-solid fa-cart-shopping">  
      {counter > 0 && <span>{counter}</span>}{/* Muestro el counter solo si es mayor que 0 */}
    </i>
  )
}

export default Cart_Icon