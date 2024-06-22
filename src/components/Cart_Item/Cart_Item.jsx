import './Cart_Item.scss'
import { CartContext } from '../../context/CartContext'
import { useContext, useState, useEffect } from 'react'
import {serverURL} from '../../services/config'

const Cart_Item = (props) => {
    const [imgs, setImgs] = useState([])

    useEffect(()=>{
        let fullPathImages = [];
        props.prod.thumbnail.forEach(img => { fullPathImages.push(serverURL+img) });
        setImgs(fullPathImages)
    },[])


    let saleTag
    let precioOriginalTachado
    let precioConDescuento = (((100-props.prod.descuento)*props.prod.price)/100)

    if (props.prod.onSale===true){/* creo el item dependiendo de si el producto está en loquidación o no */
        saleTag = <span id="saleTag"><i className="fa-solid fa-arrow-down"></i>{props.prod.descuento}%</span>
        precioOriginalTachado = <span id="precioOriginal">${props.prod.price}</span>
    }else{
        saleTag=""
        precioOriginalTachado=""
    }
    return (
        <div className="prodCarrito">
                <picture>
                    <img className="imgCarrito" src={imgs[0]} alt={props.prod.alt}/>
                    {saleTag}
                </picture>
                <article>
                    <p className="nombreProdCarrito">{props.prod.title}</p>
                    <p className="precioProdCarrito">{precioOriginalTachado} ${precioConDescuento}</p>
                    {props.children[0]}
                    <p className="subtotalProdCarrito">${precioConDescuento*props.cantidad.toFixed(2)}</p>
                    {props.children[1]}
                </article>
        </div>
  )
}

export default Cart_Item
