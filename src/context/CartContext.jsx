import { useState, createContext } from "react";
import './CartContext.scss'
import Swal from 'sweetalert2'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import { useContext } from 'react'
import { UserContext } from '../context/UserContext/UserContext'

import {getCartByID, addProductToCart, deleteProductFromCart, updateCartWithArray, updateQuantityOfProdctInCart, finishPurchase} from '../services/API/carts'
import {validSession} from '../services/API/users'

export const CartContext = createContext({ /* el valor por defoult del context del carrito es un objeto con esta información */
    cart: localStorage.getItem("cart")? JSON.parse(localStorage.getItem("cart")) : [], /* Si hay carrito en local storage lo recupero, sino array vacio */
    totalPrice: localStorage.getItem("totalPrice")? JSON.parse(localStorage.getItem("totalPrice")) : 0, /* Si hay totalPrice en local storage lo recupero, sino 0 */
    totalItems: localStorage.getItem("totalItems")? JSON.parse(localStorage.getItem("totalItems")) : 0, /* Si hay totalItem en local storage lo recupero, sino 0 */
})

export const CartContextProvider = ({children}) => {
    /* usestate para almacentar el carrito de productos cargado por el cliente */
    const [cart, setCart] = useState(localStorage.getItem("cart")? JSON.parse(localStorage.getItem("cart")) : [])
    const [totalPrice, setTotalPrice] = useState(localStorage.getItem("totalPrice")? JSON.parse(localStorage.getItem("totalPrice")) : 0)
    const [totalItems, setTotalItems] = useState(localStorage.getItem("totalItems")? JSON.parse(localStorage.getItem("totalItems")) : 0)

    const {rol} = useContext(UserContext)

    const updateLocalStorage = () =>{
        let updatedCart = JSON.stringify(cart)
        let updatedTotalPrice = JSON.stringify(totalPrice)
        let updatedTotalItems = JSON.stringify(totalItems)
        localStorage.removeItem("cart")
        localStorage.removeItem("totalPrice")
        localStorage.removeItem("totalItems")
        localStorage.setItem("cart", updatedCart)
        localStorage.setItem("totalPrice", updatedTotalPrice)
        localStorage.setItem("totalItems", updatedTotalItems)
    }
    updateLocalStorage()


    /* metodos para las funcionalidades del carrito */
    const updateTotalItemAndPrice = (cart)=>{
        setTotalItems(0)
        setTotalPrice(0)
        cart.forEach(item => {
            setTotalItems(prev => prev + item.quantity);
            
            if(item.product.onSale){
                setTotalPrice(prev => prev + (((100-item.product.descuento)*(item.product.price)) /100)* item.quantity)
            }else{
                setTotalPrice(prev => prev + item.product.price * item.quantity)
            }
        });
    }

    const loadCart = async(cid)=>{
        try {
            if(rol === 'admin'){
                return {ok: false, products: [], message: 'El administrador no accede a las funcionalidades del carrito de compra.'}
            }

            const res = await getCartByID(cid);
    
            if(res.ok){
                const cartDB = await res.json()
                setCart(cartDB.products)
                updateTotalItemAndPrice(cartDB.products)

                return {ok: true, products: cartDB.products}
            }else{
                const error = await res.json()
                return {ok: false, products: [], message: error.message}
            }

        } catch (error) {
            return {ok: false, products: [], message: error}
        }
    }

    const addProduct = async(cid, pid, quantity=1) =>{
        try {
            if(rol === 'admin'){
                return Swal.fire({
                    icon: 'error',
                    title: `El administrador no accede a las funcionalidades del carrito de compra.`,    
                    showConfirmButton:false,
                    timer: 3500,
                    customClass: {
                        title: "titleText",  
                    }
                })
            }

            const res = await addProductToCart(cid, pid, quantity)

            if(res.ok && !res.redirected){
                Toastify({
                    text: `producto agregado al carrito con exito`,
                    duration: 3500,
                    close: true,
                    gravity: "bottom", // `top` or `bottom`
                    position: "left", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    className: "mensajeToastify agregado"
                  }).showToast();
            }else if(res.redirected){

                Swal.fire({
                    icon: 'error',
                    title: `Debe loguearse para agregar productos a su carrito`,    
                    showConfirmButton:false,
                    timer: 3500,
                    customClass: {
                        title: "titleText",  
                    }
                })

            }else{
                const response = await res.json()
                Swal.fire({
                    icon: 'error',
                    title: `${response.message}`,    
                    showConfirmButton:false,
                    timer: 3500,
                    customClass: {
                        title: "titleText",  
                    }
                })
                
                Toastify({
                    text: `No se logró agregar el producto al carrito`,
                    duration: 3500,
                    close: true,
                    gravity: "bottom", // `top` or `bottom`
                    position: "left", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    className: "mensajeToastify quitado"
                  }).showToast();
            }

            /* actualizo el local storage y . */
            await loadCart(cid)
            updateLocalStorage()

            return res
        } catch (error) {
            return Swal.fire({
                icon: 'error',
                title: `${error}`,    
                showConfirmButton:false,
                timer: 3500,
                customClass: {
                    title: "titleText",  
                }
            })
        }
    }

    const removeProduct = async (cid, pid) => {
        try {
            if(rol === 'admin'){
                return Swal.fire({
                    icon: 'error',
                    title: `El administrador no accede a las funcionalidades del carrito de compra.`,    
                    showConfirmButton:false,
                    timer: 3500,
                    customClass: {
                        title: "titleText",  
                    }
                })
            }

            const response = await deleteProductFromCart(cid, pid)
            
            if(response.ok){
                Toastify({
                    text: `producto eliminado con exito`,
                    duration: 3500,
                    close: true,
                    gravity: "bottom", // `top` or `bottom`
                    position: "left", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    className: "mensajeToastify quitado"
                  }).showToast();
            }else{

                const res = await response.json()
                Swal.fire({
                    icon: 'error',
                    title: `${res.message}`,    
                    showConfirmButton:false,
                    timer: 3500,
                    customClass: {
                        title: "titleText",  
                    }
                })
            }

            /* actualizo el local storage. */
            await loadCart(cid)
            updateLocalStorage()

        } catch (error) {
            return error
        }
    }

    const updateCartWithArr = async (cid, array) => {
        try {
            const response = await updateCartWithArray(cid, array);

            if(response.ok){

                updateLocalStorage()
                await loadCart(cid)
                
                return Toastify({
                    text: `El carrito se ha actualizado`,
                    duration: 3500,
                    close: true,
                    gravity: "bottom", // `top` or `bottom`
                    position: "left", // `left`, `center` or `right`
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        className: "mensajeToastify quitado"
                }).showToast();   
            }

            const res = await response.json()
            Swal.fire({
                icon: 'error',
                title: `${res.message}`,    
                showConfirmButton:false,
                timer: 2000,
                customClass: {
                    title: "titleText",  
                }
            })
            return res

        } catch (error) {
            return error
        }
    }

    const increaseAmount = async (cid, pid, quantityToIncrease) => {
        
        if(rol === 'admin'){
            return Swal.fire({
                icon: 'error',
                title: `El administrador no accede a las funcionalidades del carrito de compra.`,    
                showConfirmButton:false,
                timer: 3500,
                customClass: {
                    title: "titleText",  
                }
            })
        }

        const item = cart.find((item) => item.product._id === pid)
        const index = cart.indexOf(item)
        
        if(index !== -1){
            let item = cart[index]
            let newQuantity = item.quantity + quantityToIncrease;
            const res = await updateQuantityOfProdctInCart(cid, pid, newQuantity);
            
            if(res.ok){
                
                let updatedCart = cart;
                updatedCart[index].quantity = newQuantity
                setCart(updatedCart)
                updateTotalItemAndPrice(updatedCart)

            }else{
                const error = await res.json();
                Swal.fire({
                    icon: 'error',
                    title: `${error}`,    
                    showConfirmButton:false,
                    timer: 3500,
                    customClass: {
                        title: "titleText",  
                    }
                })
            }
        }else{
            Swal.fire({
                icon: 'error',
                title: `El producto no se encuentra en el carrito`,    
                showConfirmButton:false,
                timer: 3500,
                customClass: {
                    title: "titleText",  
                }
            }) 
        }
        
        updateLocalStorage()

    }

    const decreaseAmount = async (cid, pid, quantityToDecrease) => {
        if(rol === 'admin'){
            return Swal.fire({
                icon: 'error',
                title: `El administrador no accede a las funcionalidades del carrito de compra.`,    
                showConfirmButton:false,
                timer: 3500,
                customClass: {
                    title: "titleText",  
                }
            })
        }

        const item = cart.find((item) => item.product._id === pid)
        const index = cart.indexOf(item)
        
        if(index !== -1){
            let item = cart[index]
            let newQuantity = item.quantity - quantityToDecrease;

            if(newQuantity > 0){
                const res = await updateQuantityOfProdctInCart(cid, pid, newQuantity);
                
                if(res.ok){
                
                    let updatedCart = cart;
                    updatedCart[index].quantity = newQuantity
                    setCart(updatedCart)
                    updateTotalItemAndPrice(updatedCart)
                }else{
                    const error = await res.json();
                    Swal.fire({
                        icon: 'error',
                        title: `${error}`,    
                        showConfirmButton:false,
                        timer: 3500,
                        customClass: {
                            title: "titleText",  
                        }
                    })
                }

            }else{
                Swal.fire({
                    icon: 'error',
                    title: `La cantidad a comprar debe se superior a 0`,    
                    showConfirmButton:false,
                    timer: 3000,
                    customClass: {
                        title: "titleText",  
                    }
                }) 
            }

        }else{
            Swal.fire({
                icon: 'error',
                title: `El producto no se encuentra en el carrito`,    
                showConfirmButton:false,
                timer: 3500,
                customClass: {
                    title: "titleText",  
                }
            }) 
        }
            
        updateLocalStorage()
    }

    const validActiveSessionCart = async()=>{
        const res = await validSession()
        if(!res.session){
            setCart([])
            setTotalItems(0)
            setTotalPrice(0)
            updateLocalStorage() //Si la sesion está incactiva, deslogueo
        }
    }

    const buyItems = async (cartID) =>{
        try {
            const res = await finishPurchase(cartID)
            
            if(res.ok){
                loadCart(cartID)
            }
            return res
        } catch (error) {
            return error
        }

    }

    return(
        <CartContext.Provider value={{cart, totalPrice, totalItems, loadCart, addProduct, removeProduct, setCart, validActiveSessionCart, updateCartWithArr, increaseAmount, decreaseAmount, buyItems }}>
        {children}
        </CartContext.Provider>
    )
    /* En el value enviamos el valor acutal del carrito y los metodos a los componentes de mi app que lo necesiten  */
}
