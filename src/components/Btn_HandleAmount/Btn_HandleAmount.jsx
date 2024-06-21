import './Btn_HandleAmount.scss'
import { CartContext } from '../../context/CartContext'
import { UserContext } from '../../context/UserContext/UserContext'
import { useContext } from 'react'

const Btn_HandleAmount = (item) => {
    const { increaseAmount, decreaseAmount} = useContext(CartContext)
    const { cartID } = useContext(UserContext)

    return (
        <div className="cantidadProdCarrito">
            <button id={item.id} className="btn decrementar" onClick={()=> decreaseAmount(cartID, item.idProd, 1)}>-</button>
            <span>{item.cantidad}</span>
            <button id={item.id} className="btn incrementar" onClick={()=> increaseAmount(cartID, item.idProd, 1)}>+</button>
        </div>
    )
}

export default Btn_HandleAmount