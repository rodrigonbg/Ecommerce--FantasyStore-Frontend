import './Ticket_item.scss'
import React from 'react'
import { CartContext } from '../../context/CartContext'
import { useContext, useState, useEffect } from 'react'
import {serverURL} from '../../services/config'

const Ticket_item = ({item}) => {
    const [imgs, setImgs] = useState([])

    useEffect(()=>{
        let fullPathImages = [];
        item.product.thumbnail.forEach(img => { fullPathImages.push(serverURL+img) });
        setImgs(fullPathImages)
    },[])

    let saleTag
    let precioOriginalTachado
    let precioConDescuento = (((100-item.product.descuento)*item.product.price)/100)

    if (item.product.onSale===true){/* creo el item dependiendo de si el producto está en loquidación o no */
        saleTag = <span id="saleTag"><i className="fa-solid fa-arrow-down"></i>{item.product.descuento}%</span>
        precioOriginalTachado = <span id="precioOriginal">${item.product.price}</span>
    }else{
        saleTag=""
        precioOriginalTachado=""
    }

    return (
        <div className="prodTicket">

            <picture className='imgContainer'>
                <img className="imgTicket" src={imgs[0]} alt={item.product.alt}/>
                {saleTag}
            </picture>

            <article className='infoContainer'>
                <p className="nombreProdTicket">{item.product.title}</p>
                <p className="precioProdTicket">{precioOriginalTachado} ${precioConDescuento}</p>
                <p>X {item.quantity} {item.quantity>1? 'unidades':'unidad'}</p>
                <p className="subtotalProdTicket">${precioConDescuento*item.quantity.toFixed(2)}</p>
            </article>
        </div>
    )
}

export default Ticket_item