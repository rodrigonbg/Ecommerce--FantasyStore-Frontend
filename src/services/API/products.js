const baseURL = 'http://localhost:';
const PORT = 8080;

//----------------------Productos------------------------------------
//Traer todos los productos--> GET /api/products
const getProducts = async (idCategoria) =>{
    try {
      const rutaQueries = idCategoria? `?idCategoria=${idCategoria}` : ''

      const response = await fetch(`${baseURL}${PORT}/api/products${rutaQueries}`)

      if (!response.ok) {
          throw new Error(`Hubo un problema con la solicitud fetch: ${response.statusText}`);
      }
      
      const prods = await response.json();
      return prods

    } catch (error) {
      throw error
    }
}

//Traer un producto en particular--> GET /api/products/:pid
const getProductByID = async (pid) =>{
  try {
    const response = await fetch(`${baseURL}${PORT}/api/products/${pid}`);

    if (!response.ok) {
      throw new Error(`Hubo un problema con la solicitud fetch al solicitar un producto por ID : ${response.statusText}`);
    }
    
    const prod = await response.json();
    return prod;

  } catch (error) {
    throw error
  }
}

//Subir un producto a la base de datos (admin)--> POST /api/products/admin
const postNewProductAdmin = async (product) =>{
  try {
    const response = await fetch(`${baseURL}${PORT}/api/products/admin`, {
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
    const response = await fetch(`${baseURL}${PORT}/api/products/premium`, {
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
    const response = await fetch(`${baseURL}${PORT}/api/products/admin/${pid}`, {
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

//Eliminar un producto a la base de datos (premium)--> POST /api/products/premium/:pid (debería ser delete)
const deleteProductPremium = async (pid) =>{
  try {
    const response = await fetch(`${baseURL}${PORT}/api/products/premium/${pid}`, {
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

export {
  getProducts, 
  getProductByID, 
  postNewProductAdmin, 
  postNewProductPremium,
  deleteProductAdmin,
  deleteProductPremium
}