import './Btn_RemoveItem.scss'
import { CartContext } from '../../context/CartContext'
import { useContext } from 'react'

const Btn_RemoveItem = (props) => {
    const {removeItem} =useContext(CartContext)

    return (
        <div><i id={props.id} className="fa-solid fa-xmark fa-2x" onClick={()=> removeItem(props.id)}></i></div>
    )
}

export default Btn_RemoveItem