import "bootstrap"
import './Item_Card.scss'
import {Link} from 'react-router-dom'
import { useState, useEffect } from "react"
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import { UserContext } from '../../context/UserContext/UserContext'
import {serverURL} from '../../services/config'

const ItemFullPrice_Card = (prod) => {
    const [imgs, setImgs] = useState([])
    const [btnAddRemove, setBtnAddRemove] = useState(null)
    const [loading, setLoading] = useState(true)

    const {removeProduct, cart, addProduct, loadCart} = useContext(CartContext)
    const {cartID} = useContext(UserContext)

    //Para las imagenes
    useEffect(()=>{
        let fullPathImages = [];
        prod.img.forEach(img => { fullPathImages.push(serverURL+img) });
        setImgs(fullPathImages)
    },[])

    //Para los botones
    useEffect(()=>{
        const updateButton = async () => {
            if (prod.stock < 1) {
                setBtnAddRemove(
                    <button disabled id={prod.id} className="btn btn-white shadow-sm rounded-pill bg-white cart-btn sinStock">
                        Sin Stock
                    </button>
                );
            } else if (cart.some((elemento) => elemento.product._id === prod.id)) {
                setBtnAddRemove(
                    <button id={prod.id} onClick={async () => {setLoading(true); await removeProduct(cartID, prod.id);  await loadCart(cartID)}} className="btn btn-white shadow-sm rounded-pill bg-white cart-btn">
                        <i className="fa-solid fa-xmark"></i> Quitar
                    </button>
                );
            } else {
                setBtnAddRemove(
                    <button id={prod.id} onClick={async () => {setLoading(true); await addProduct(cartID, prod.id); await loadCart(cartID)}} className="btn btn-white shadow-sm rounded-pill bg-white cart-btn">
                        <i id="articles" className="fa-solid fa-cart-shopping"></i> Añadir
                    </button>
                );
            }
            setLoading(false);
        };

        updateButton();
    },[cart])

    return (
        <div key={prod.id} className="item  col-lg-2 col-md-3 col-sm-4 col-6"> {/* PRODUCTO */}
            <div className="item_innerBox"> {/* INTERIOR DE LA CAJA (ICONOS, IMG Y BOTON CARRITO) */}
                <div className="icons">{/* icons */}
                    <a className="text-decoration-none "><i className="fa-solid fa-heart"></i></a>
                    <Link to={`/products/${prod.id}`} className="text-decoration-none "><i className="fa-solid fa-eye"></i></Link>
                </div>
                <Link to={`/products/${prod.id}`}> <img src={imgs[0]} alt={prod.alt} /> </Link> {/* IMAGEN DEL PRODUCTO */}
                <div className=""> {/* BOTON DEL CARRRITO */}
                {loading? null : btnAddRemove}
                </div>
            </div>
            <div className="item_info"> {/* INFO DEL PRODUCTO */}
                <div className="item_name">
                    <p>{prod.nombre}</p>
                </div>
                <div className="item_price">
                    <span id="precioOriginal">${prod.precio}</span>
                </div>
            </div>    
        </div>    
    )
}

export default ItemFullPrice_Card