import './Btn_HandleAmount.scss'

import { CartContext } from '../../context/CartContext'
import { useContext } from 'react'

const Btn_HandleAmount = (item) => {
    const { increaseAmount, decreaseAmount} = useContext(CartContext)

    return (
        <div className="cantidadProdCarrito">
            <button id={item.id} className="btn decrementar" onClick={()=> decreaseAmount(item.id)}>-</button>
            <span>{item.cantidad}</span>
            <button id={item.id} className="btn incrementar" onClick={()=> increaseAmount(item.id)}>+</button>
        </div>
    )
}

export default Btn_HandleAmount