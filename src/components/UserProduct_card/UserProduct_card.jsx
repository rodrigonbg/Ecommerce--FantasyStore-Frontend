import './UserProduct_card.scss'
import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Btn_DeleteProduct from '../Btn_ DeleteProduct/Btn_DeleteProduct'
import {serverURL} from '../../services/config'

const UserProduct_card = ({product, setReload}) => {
    const [imgs, setImgs] = useState([])

    useEffect(()=>{
        let fullPathImages = [];
        product.thumbnail.forEach(img => { fullPathImages.push(serverURL+img) });
        setImgs(fullPathImages)
    },[])


    let saleTag
    let precioOriginalTachado
    let precioConDescuento = (((100-product.descuento)*product.price)/100)

    if (product.onSale===true){/* creo el item dependiendo de si el producto está en loquidación o no */
        saleTag = <span id="saleTag"><i className="fa-solid fa-arrow-down"></i>{product.descuento}%</span>
        precioOriginalTachado = <span id="precioOriginal">${product.price}</span>
    }else{
        saleTag=""
        precioOriginalTachado=""
    }


  return (
    <div className="prodContainer">
        <picture>
            <Link to={`../products/${product._id}`}><img className="prodImgs" src={imgs[0]} alt={product.alt}/></Link>
            {saleTag}
        </picture>
        
        <article>
            <p className="prodTitle">{product.title}</p>
            <p className="prodPrice">{precioOriginalTachado} ${precioConDescuento}</p>
            <Btn_DeleteProduct id={product._id} setReload={setReload}/>
        </article>
    </div>

  )
}

export default UserProduct_card