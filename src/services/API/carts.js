const baseURL = 'http://localhost:';
const PORT = 8080;

//----------------------Carritos------------------------------------
//Traer todos los Carritos--> GET /api/carts
const getCarts = async () =>{
    try {
        const carts = await fetch(`${baseURL}${PORT}/api/carts`)
            .then(data =>  data.json())
            .catch(error => console.error('Hubo un problema con la solicitud fetch:', error));
        return carts;
    } catch (error) {
        throw error
    }
}

//Traer un cart en particular--> GET /api/carts/:cid
const getCartByID = async (cid) =>{
    try {
        const cart = await fetch(`${baseURL}${PORT}/api/carts/${cid}`)
            .then(data =>  data.json())
            .catch(error => console.error('Hubo un problema con la solicitud fetch:', error));
        return cart;
    } catch (error) {
        throw error
    }
}

//Crear un nuevo carrito--> POST /api/carts
const createNewCart = async () =>{
    try {
        const response = await fetch(`${baseURL}${PORT}/api/carts`, {
                method: 'POST',
                headers:{
                        'Content-Type': 'application/json',
                        },
        })
            .then(data =>  data.json())
            .catch(error => console.error('Hubo un problema con la solicitud fetch:', error));
        return response;
    } catch (error) {
        throw error
    }
}

//Agregar un producto a carrito--> POST /api/carts/:cid/products/:pid
const addProductToCart = async (cid, pid) =>{
    try {
        const response = await fetch(`${baseURL}${PORT}/api/carts/${cid}/products/${pid}`, {
                method: 'POST',
                headers:{
                        'Content-Type': 'application/json',
                        },
        })
            .then(data =>  data.json())
            .catch(error => console.error('Hubo un problema con la solicitud fetch:', error));
        return response;
    } catch (error) {
        throw error
    }
}

//Finalizar compra, generar ticket --> POST /api/carts/:cid/purchase
const finishPurchase = async (cid) =>{
    try {
        const response = await fetch(`${baseURL}${PORT}/api/carts/${cid}/purchase`, {
                method: 'POST',
                headers:{
                        'Content-Type': 'application/json',
                        },
        })
            .then(data =>  data.json())
            .catch(error => console.error('Hubo un problema con la solicitud fetch:', error));
        return response;
    } catch (error) {
        throw error
    }
}

//Eliminar un carrito--> DELETE /api/carts/:cid
const deleteCart = async (cid) =>{
    try {
        const response = await fetch(`${baseURL}${PORT}/api/carts/${cid}`, {
                method: 'DELETE',
                headers:{
                        'Content-Type': 'application/json',
                        },
        })
            .then(data =>  data.json())
            .catch(error => console.error('Hubo un problema con la solicitud fetch:', error));
        return response;
    } catch (error) {
        throw error
    }
}

//Eliminar un producto de un carrito--> DELETE /api/carts/:cid/products/:pid
const deleteProductFromCart = async (cid, pid) =>{
    try {
        const response = await fetch(`${baseURL}${PORT}/api/carts/${cid}/products/${pid}`, {
                method: 'DELETE',
                headers:{
                        'Content-Type': 'application/json',
                        },
        })
            .then(data =>  data.json())
            .catch(error => console.error('Hubo un problema con la solicitud fetch:', error));
        return response;
    } catch (error) {
        throw error
    }
}

export default {
    getCarts,
    getCartByID, 
    createNewCart, 
    addProductToCart,
    finishPurchase,
    deleteCart,
    deleteProductFromCart
}