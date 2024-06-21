const baseURL = 'http://localhost:';
const PORT = 8080;

//----------------------Carritos------------------------------------
//Traer todos los Carritos--> GET /api/carts
const getCarts = async () =>{
    try {
        const carts = await fetch(`${baseURL}${PORT}/api/carts`, {
            credentials: 'include',
            method: 'GET',
            headers:{
                    'Content-Type': 'application/json',
                    }
        })

        return carts;
    } catch (error) {
        return error
    }
}

//Traer un cart en particular--> GET /api/carts/:cid
const getCartByID = async (cid) =>{
    try {
        const cart = await fetch(`${baseURL}${PORT}/api/carts/${cid}`, {
            credentials: 'include',
            method: 'GET',
            headers:{
                    'Content-Type': 'application/json',
                    }
        })
        return cart;
    } catch (error) {
        return error
    }
}

//Crear un nuevo carrito--> POST /api/carts
const createNewCart = async () =>{
    try {
        const response = await fetch(`${baseURL}${PORT}/api/carts`, {
            credentials: 'include',
            method: 'POST',
            headers:{
                    'Content-Type': 'application/json',
                    }
        })
        return response;
    } catch (error) {
        return error
    }
}

//Agregar un producto a carrito--> POST /api/carts/:cid/products/:pid
const addProductToCart = async (cid, pid, quantity=1) =>{
    try {
        const response = await fetch(`${baseURL}${PORT}/api/carts/${cid}/products/${pid}`, {
            credentials: 'include',
            method: 'POST',
            headers:{
                    'Content-Type': 'application/json',
                    },
            body: JSON.stringify({quantity:quantity}),       
        })

        return response;
    } catch (error) {
        return error
    }
}

//Finalizar compra, generar ticket --> POST /api/carts/:cid/purchase
const finishPurchase = async (cid) =>{
    try {
        const response = await fetch(`${baseURL}${PORT}/api/carts/${cid}/purchase`, {
            credentials: 'include',
            method: 'POST',
            headers:{
                    'Content-Type': 'application/json',
                    }
        })

        return response;
    } catch (error) {
        return error
    }
}

//Actualizar carrito con arreglo--> PUT /api/carts/:cid
const updateCartWithArray = async (cid, array) =>{
    try {
        const response = await fetch(`${baseURL}${PORT}/api/carts/${cid}`, {
            credentials: 'include',
            method: 'PUT',
            headers:{
                    'Content-Type': 'application/json',
                    },
            body: JSON.stringify(array),
    })

        return response;
    } catch (error) {
        return error
    }
}

//Actualizar cantidad de un prod en el carrito--> PUT /api/carts/:cid/products/:pid
const updateQuantityOfProdctInCart = async (cid, pid, quantity) =>{
    try {
        const response = await fetch(`${baseURL}${PORT}/api/carts/${cid}/products/${pid}`, {
            credentials: 'include',
            method: 'PUT',
            headers:{
                    'Content-Type': 'application/json',
                    },
            body: JSON.stringify({quantity: quantity}),
        })
        return response;
    } catch (error) {
        return error
    }
}

//Eliminar un carrito--> DELETE /api/carts/:cid
const deleteCart = async (cid) =>{
    try {
        const response = await fetch(`${baseURL}${PORT}/api/carts/${cid}`, {
                credentials: 'include',
                method: 'DELETE',
                headers:{
                        'Content-Type': 'application/json',
                        },
        })

        return response;
    } catch (error) {
        return error
    }
}

//Eliminar un producto de un carrito--> DELETE /api/carts/:cid/products/:pid
const deleteProductFromCart = async (cid, pid) =>{
    try {
        const response = await fetch(`${baseURL}${PORT}/api/carts/${cid}/products/${pid}`, {
                credentials: 'include',
                method: 'DELETE',
                headers:{
                        'Content-Type': 'application/json',
                        },
        })

        return response;
    } catch (error) {
        return error
    }
}

export {
    getCarts,
    getCartByID, 
    createNewCart, 
    addProductToCart,
    finishPurchase,
    deleteCart,
    deleteProductFromCart,
    updateCartWithArray,
    updateQuantityOfProdctInCart
}