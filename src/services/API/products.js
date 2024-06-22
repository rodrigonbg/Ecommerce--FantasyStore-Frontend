import {serverURL} from '../config'

//----------------------Productos------------------------------------
//Traer todos los productos--> GET /api/products
const getProducts = async (idCategoria) =>{
    try {
      const rutaQueries = idCategoria? `?idCategoria=${idCategoria}` : ''

      const response = await fetch(`${serverURL}/api/products${rutaQueries}`, {
        credentials: 'include'
      })

      const prods = await response.json();
      return prods

    } catch (error) {
      throw error
    }
}

//Traer un producto en particular--> GET /api/products/:pid
const getProductByID = async (pid) =>{
  try {
    const response = await fetch(`${serverURL}/api/products/${pid}`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Hubo un problema con la solicitud fetch al solicitar un producto por ID : ${response.statusText}`);
    }
    
    const prod = await response.json();
    return prod;

  } catch (error) {
    return error
  }
}

//Traer un producto en particular--> GET /api/products/productsOwner
const getProductByOwner = async () =>{
  try {
    const response = await fetch(`${serverURL}/api/products/productsOwner`, {
      credentials: 'include',
    });
    
    const prods = { ok:true, products: await response.json() };
    return prods;

  } catch (error) {
    return error
  }
}

//Subir un producto a la base de datos (admin)--> POST /api/products/admin
const postNewProductAdmin = async (product) =>{
  try {
    const response = await fetch(`${serverURL}/api/products/admin`, {
          credentials: 'include',
          method: 'POST',
          body: product,
    })

    return response;
  } catch (error) {
    throw error
  }
}

//Subir un producto a la base de datos (premium)--> POST /api/products/premium
const postNewProductPremium = async (product) =>{
  try {
    const response = await fetch(`${serverURL}/api/products/premium`, {
          credentials: 'include',
          method: 'POST',
          body: product,
    })

    return response;

  } catch (error) {
    throw error
  }
}

//Eliminar un producto a la base de datos (admin)--> POST /api/products/admin/:pid (debería ser delete)
const deleteProductAdmin = async (pid) =>{
  try {
    const response = await fetch(`${serverURL}/api/products/admin/${pid}`, {
          credentials: 'include',
          method: 'POST',
          headers:{
                    'Content-Type': 'application/json',
                  },
    })

    return response;
  } catch (error) {
    return error
  }
}

//Eliminar un producto a la base de datos (premium)--> POST /api/products/premium/:pid (debería ser delete)
const deleteProductPremium = async (pid) =>{
  try {
    const response = await fetch(`${serverURL}/api/products/premium/${pid}`, {
          credentials: 'include',
          method: 'POST',
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
  getProducts, 
  getProductByID, 
  getProductByOwner,
  postNewProductAdmin, 
  postNewProductPremium,
  deleteProductAdmin,
  deleteProductPremium
}