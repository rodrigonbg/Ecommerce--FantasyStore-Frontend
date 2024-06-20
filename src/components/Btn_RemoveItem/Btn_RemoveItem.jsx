import './Btn_RemoveItem.scss'
import { CartContext } from '../../context/CartContext'
import { UserContext } from '../../context/UserContext/UserContext'
import { useContext } from 'react'

const Btn_RemoveItem = (props) => {
    const {removeProduct} = useContext(CartContext)
    const {cartID} = useContext(UserContext)

    return (
        <div><i id={props.id} className="fa-solid fa-xmark fa-2x" onClick={async ()=> await removeProduct(cartID, props.idProd)}></i></div>
    )
}

export default Btn_RemoveItem