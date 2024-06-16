import React from "react"
import {Link} from 'react-router-dom'
import "bootstrap"
import './Item_Card.scss'
import { useState, useEffect } from "react"
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'

const BackendRoute = 'http://localhost:8080'


const ItemOnSale_Card = (prod) => {/*items en liquidación */
    const [imgs, setImgs] = useState([])
    const {addItem, removeItem , cart} = useContext(CartContext)

    useEffect(()=>{
            let fullPathImages = [];
            prod.img.forEach(img => { fullPathImages.push(BackendRoute+img) });
            setImgs(fullPathImages)
    },[])

    let btnAddRemove
    let buttonIcon
    let butonText
    
    if (prod.stock < 1){
        btnAddRemove =  <button disabled id={prod.id} className="btn btn-white shadow-sm rounded-pill bg-white cart-btn sinStock" >
                            Sin Stock
                        </button>
    }
    else if (cart.some((elemento)=> elemento.item.id === prod.id)){/* creo la variable botón segun corresponda por cada prod. (si está o no en el carrito) */
        buttonIcon = <i className="fa-solid fa-xmark"></i>
        butonText = 'Quitar'
        btnAddRemove =  <button id={prod.id} onClick={()=>{removeItem(prod.id)}} className="btn btn-white shadow-sm rounded-pill bg-white cart-btn">
                                {buttonIcon}{butonText}
                            </button>
    }else{
        buttonIcon = <i id="articles" className="fa-solid fa-cart-shopping"></i>
        butonText = 'Añadir'
        btnAddRemove =  <button id={prod.id} onClick={()=>{addItem(prod ,1)}} className="btn btn-white shadow-sm rounded-pill bg-white cart-btn">
                                {buttonIcon}{butonText}
                            </button>
    } 
    let precioConDescuento = ((100-prod.descuento)*prod.precio)/100

    return (
        <div key={prod.id} className="item col-lg-2 col-md-3 col-sm-4 col-6">{/* PRODUCTOS */} 
            <div className="item_innerBox"> {/* INTERIOR DE LA CAJA (ICONOS, IMG Y BOTON CARRITO) */}
                <div className="icons">{/* icons */} 
                    <a className="text-decoration-none "><i className="fa-solid fa-heart"></i></a>
                    <Link to={`/products/${prod.id}`} className="text-decoration-none "><i className="fa-solid fa-eye"></i></Link>
                </div>
                <div className="saleTag"> {/* ETIQUETA DE DESCUENTO */}
                    <span className="badge rounded-0"><i className="fa-solid fa-arrow-down"></i>{prod.descuento}%</span>
                </div>

                <Link to={`/products/${prod.id}`}> <img src= {imgs[0]} alt={prod.alt}/> </Link>{/* IMAGEN DEL PRODUCTO */}
                <div className="">{/* BOTON DEL CARRRITO */}
                    {btnAddRemove}
                </div>

            </div>
            <div className="item_info">{/* INFO DEL PRODUCTO */}
                <div className="item_name">
                    <p>{prod.nombre}</p>
                </div>
                <div className="item_price onSale">
                    <span id="precioOnSale">${precioConDescuento.toFixed(2)}</span>
                    <span id="precioOriginal">${prod.precio}</span>
                </div>
            </div> 
            {
            prod.owner !== 'admin'&& <p>owner:{prod.owner} </p>   
            }
        </div>   
    )
}/* boton del carrito con id del producto */
export default ItemOnSale_Card


