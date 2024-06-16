import { useState, createContext } from "react";
import { collection, addDoc, updateDoc, doc, getDoc} from "firebase/firestore" 
import { db } from "../services/config"
import './CartContext.scss'
import Swal from 'sweetalert2'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import { useContext } from 'react'
import { UserContext } from '../context/UserContext/UserContext'

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
    const {correo, nombre, apellido, telefono} = useContext(UserContext)

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
    /* actualizo el local storage. */
    updateLocalStorage()

    /* metodos para las funcionalidades del carrito */
    const addItem = (item, cantidad) => {
        const existingProduct = cart.find(prod => prod.item.id === item.id)
        
        if(!existingProduct){ /* Si el prod no exitste en el carrito, lo agrego con la cantidad manteniendo lo previo */
            setCart(prev => [...prev, {item, cantidad}])
        }else{ /* si el prod existe, le actualizo cantidades */
            const updatedCart = cart.map(prod => {
                if(prod.item.id === item.id){
                    return {...prod, cantidad: prod.cantidad + cantidad}
                }else{
                    return prod;
                }
            })
            setCart(updatedCart)
        }
        item.onSale ? setTotalPrice(prev => prev + (((100-item.descuento)*item.precio)/100) * cantidad) : setTotalPrice(prev => prev + (item.precio * cantidad))
        setTotalItems(prev => prev + cantidad)

        /* actualizo el local storage. */
        updateLocalStorage()

        Toastify({
            text: `producto "${item.nombre}" agregado al carrito (cantidad: ${cantidad})`,
            duration: 3500,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            className: "mensajeToastify agregado"
          }).showToast();
    }

    const removeItem = (id) => {
        const removedItem = cart.find(prod => prod.item.id === id)
        const updatedCart = cart.filter(prod => prod.item.id !== id)

        setCart(updatedCart)
        removedItem.item.onSale ? setTotalPrice(prev => prev - (((100-removedItem.item.descuento)*removedItem.item.precio)/100) * removedItem.cantidad) : setTotalPrice(prev => prev - removedItem.item.precio * removedItem.cantidad)
        setTotalItems (prev => prev - removedItem.cantidad)

        /* actualizo el local storage. */
        updateLocalStorage()

        Toastify({
            text: `producto "${removedItem.item.nombre}"quitado del carrito`,
            duration: 3500,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            className: "mensajeToastify quitado"
          }).showToast();
    }

    const clearCart = () => {
        setCart([])
        setTotalPrice(0)
        setTotalItems(0)

        /* actualizo el local storage. */
        updateLocalStorage()
                
        window.scroll({top: 0})
        Toastify({
            text: `El carrito se ha vaciado`,
            duration: 3500,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                className: "mensajeToastify quitado"
        }).showToast();   
    }

    const increaseAmount = (id) => {
        const item = cart.find(prod => prod.item.id === id)
        const index = cart.indexOf(item)
        if (cart[index].item.stock > cart[index].cantidad){
            const updatedCart = cart.map(prod => {
                if(prod.item.id === id){
                    return {...prod, cantidad: prod.cantidad + 1}
                }else{
                    return prod;
                }
            })
            setCart(updatedCart)
            setTotalItems (prev => prev + 1 )
            cart[index].item.onSale ? setTotalPrice(prev => prev + (((100-cart[index].item.descuento)*cart[index].item.precio)/100)*1 ) : setTotalPrice(prev => prev + (cart[index].item.precio * 1))

            /* actualizo el local storage. */
            updateLocalStorage()

        }else{
            Toastify({
                text: `El stock del producto "${item.item.nombre}" es de ${item.item.stock}`,
                duration: 3500,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "left", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                className: "mensajeToastify aviso"
              }).showToast();
        }
    }

    const decreaseAmount = (id) => {
        const item = cart.find(prod => prod.item.id === id)
        const index = cart.indexOf(item)
        if (cart[index].cantidad > 1){
            const updatedCart = cart.map(prod => {
                if(prod.item.id === id){
                    return {...prod, cantidad: prod.cantidad - 1}
                }else{
                    return prod;
                }
            })
            setCart(updatedCart)
            setTotalItems (prev => prev - 1 )
            cart[index].item.onSale ? setTotalPrice(prev => prev - (((100-cart[index].item.descuento)*cart[index].item.precio)/100)*1 ) : setTotalPrice(prev => prev + (cart[index].item.precio * 1))
        
            /* actualizo el local storage. */
            updateLocalStorage()

        }else{
            Toastify({
                text: `El stock no puede bajar de una unidad.`,
                duration: 3500,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "left", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                className: "mensajeToastify aviso"
              }).showToast();
        }
    }
    /* --------------------------------------------------- */
    /* ----------- funciones para las compras de productos */
    /* --------------------------------------------------- */

    const buyItems = async (cart) =>{

        /* Creo los items a guardar en compras */
        const items = []
        cart.map(({item, cantidad})=> {
            items.push({
                id: item.id,
                nombre: item.nombre,
                categoria: item.categoria,
                precio: item.precio,
                onSale: item.onSale,
                descuento: item.descuento,
                img: item.img,
                cantidad: cantidad     
            })
        })

        /* Ejecuto varias promesas en simultaneo. para guardar la compra y para actualizar stock */
        return Promise.all(
            items.map( async (product) =>{
                const productRef = doc(db, 'productos', product.id)/* creo la referencia */
                const productDoc = await getDoc(productRef) /* obtengo el doc */
                const stock = productDoc.data().stock /* obtengo el stock actual del prod */
                await updateDoc(productRef, {
                    stock: stock - product.cantidad /* actualizo la cantidad */
                })
            })
        )
        /* Cuando actualizo los items. si hubo exito guardo la compra en el then() */
        .then(()=>{
            return addDoc(collection(db, 'compras'),{
                compra : items,
                PrecioTotal: totalPrice,
                ItemsTotal: totalItems,
                usuario: correo,
                nombre : nombre,
                apellido: apellido,
                telefono: telefono,
                fecha: new Date()
            })
            /* Guardo la orden y como accion secundaria retorno el id y vacío el carrito  */
            .then((compraRef) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Comprado con exito!!',    
                    showConfirmButton:false,
                    timer: 2000,
                    customClass: {
                        title: "titleText",  
                    }
                })
                clearCart()
                const idCompra = compraRef.id
                return idCompra
            })
            .catch(()=>{
                Swal.fire({
                    icon: 'error',
                    title: 'Ocurrio un error al guardar la orden de compra!!',    
                    showConfirmButton:false,
                    timer: 2000,
                    customClass: {
                        title: "titleText",  
                    }
                })
            })
        })
        /* muestro un error si hay un problema al actualizar el stock */
        .catch(()=>{
            Swal.fire({
                icon: 'error',
                title: 'Ocurrio un error al realizar la compra!!',    
                showConfirmButton:false,
                timer: 2000,
                customClass: {
                    title: "titleText",  
                }
            })
        })

    }

    return(
        <CartContext.Provider value={{cart, totalPrice, totalItems, addItem, removeItem, clearCart, increaseAmount, decreaseAmount, buyItems }}>
        {children}
        </CartContext.Provider>
    )
    /* En el value enviamos el valor acutal del carrito y los metodos a los componentes de mi app que lo necesiten  */
}
