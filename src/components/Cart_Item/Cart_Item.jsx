import './Cart_Item.scss'

import { CartContext } from '../../context/CartContext'
import { useContext } from 'react'

const Cart_Item = (props) => {

    const {removeItem} = useContext(CartContext)

    let saleTag
    let precioOriginalTachado
    let precioConDescuento = (((100-props.prod.item.descuento)*props.prod.item.precio)/100)

    if (props.prod.item.onSale===true){/* creo el item dependiendo de si el producto está en loquidación o no */
        saleTag = <span id="saleTag"><i className="fa-solid fa-arrow-down"></i>{props.prod.item.descuento}%</span>
        precioOriginalTachado = <span id="precioOriginal">${props.prod.item.precio}</span>
    }else{
        saleTag=""
        precioOriginalTachado=""
    }
    return (
        <div className="prodCarrito">
                <picture>
                    <img className="imgCarrito" src={props.prod.item.img} alt={props.prod.item.alt}/>
                    {saleTag}
                </picture>
                <article>
                    <p className="nombreProdCarrito">{props.prod.item.nombre}</p>
                    <p className="precioProdCarrito">{precioOriginalTachado} ${precioConDescuento}</p>
                    {props.children[0]}
                    <p className="subtotalProdCarrito">${precioConDescuento*props.prod.cantidad.toFixed(2)}</p>
                    {props.children[1]}
                </article>
        </div>
  )
}

export default Cart_Item
