const baseURL = 'http://localhost:';
const PORT = 8080;

//----------------------Users------------------------------------
//Traer todos los usuarios--> GET /api/users
const getUsers = async () =>{
    try {
        const users = await fetch(`${baseURL}${PORT}/api/users`)
            .then(data =>  data.json())
            .catch(error => console.error('Hubo un problema con la solicitud fetch:', error));
        return users;
    } catch (error) {
        throw error
    }
}

//Registro con el middleware de passport LOCAL--> POST /api/users
const LocalRegister = async (user) =>{
    try {
        const response = await fetch(`${baseURL}${PORT}/api/users`, {
                method: 'POST',
                headers:{
                        'Content-Type': 'application/json',
                        },
                body: JSON.stringify(user),
        })
            .then(data =>  data.json())
            .catch(error => console.error('Hubo un problema con la solicitud fetch:', error));
        return response;
    } catch (error) {
        throw error
    }
}

//Login con el middleware de passport LOCAL--> POST /api/sessions/login
const LocalLogin = async (user) =>{
    try {
        const response = await fetch(`${baseURL}${PORT}/api/sessions/login`, {
                method: 'POST',
                headers:{
                        'Content-Type': 'application/json',
                        },
                body: JSON.stringify(user),
        })
            .then(data =>  data.json())
            .catch(error => console.error('Hubo un problema con la solicitud fetch:', error));
        return response;
    } catch (error) {
        throw error
    }
}

//Registro o login con el middleware de passport GITHUB--> GET /api/sessions/github
const GithubRegisterLogin = async () =>{
    try {
        const response = await fetch(`${baseURL}${PORT}/api/sessions/github`)
            .then(data =>  data.json())
            .catch(error => console.error('Hubo un problema con la solicitud fetch:', error));
        return response;
    } catch (error) {
        throw error
    }
}

//logout con local passport--> GET /api/sessions/github
const logout = async () =>{
    try {
        const response = await fetch(`${baseURL}${PORT}/api/sessions/logout`)
            .then(data =>  data.json())
            .catch(error => console.error('Hubo un problema con la solicitud fetch:', error));
        return response;
    } catch (error) {
        throw error
    }
}
  
//Enviar mail para resetear contraseña--> POST /api/users/requestPasswordReset
const sendMailPassReset = async (user) =>{
    try {
        const response = await fetch(`${baseURL}${PORT}/api/users/requestPasswordReset`, {
                method: 'POST',
                headers:{
                        'Content-Type': 'application/json',
                        },
                body: JSON.stringify(user),
        })
            .then(data =>  data.json())
            .catch(error => console.error('Hubo un problema con la solicitud fetch:', error));
        return response;
    } catch (error) {
        throw error
    }
}

//Cambiar contraseña con token--> POST /api/users/passwordReset
const passwordReset = async (user) =>{
    try {
        const response = await fetch(`${baseURL}${PORT}/api/users/passwordReset`, {
                method: 'POST',
                headers:{
                        'Content-Type': 'application/json',
                        },
                body: JSON.stringify(user),
        })
            .then(data =>  data.json())
            .catch(error => console.error('Hubo un problema con la solicitud fetch:', error));
        return response;
    } catch (error) {
        throw error
    }
}

//Subir documentos de los usuarios--> POST /api/users/:uid/documents
const uploadUserDocuments = async (uid, documents) =>{
    try {
        const response = await fetch(`${baseURL}${PORT}/api/users/${uid}/documents`, {
                method: 'POST',
                headers:{
                        'Content-Type': 'application/json',
                        },
                body: JSON.stringify(documents),
        })
            .then(data =>  data.json())
            .catch(error => console.error('Hubo un problema con la solicitud fetch:', error));
        return response;
    } catch (error) {
        throw error
    }
}

//Eliminar usuario por id--> DELETE /api/users/:uid
const deleteUserByID = async (uid) =>{
    try {
        const response = await fetch(`${baseURL}${PORT}/api/users/${uid}`, {
                method: 'DELETE',
                headers:{
                        'Content-Type': 'application/json',
                        }
        })
            .then(data =>  data.json())
            .catch(error => console.error('Hubo un problema con la solicitud fetch:', error));
        return response;
    } catch (error) {
        throw error
    }
}

//Eliminar usuarios inactivos en mas de 24H--> DELETE /api/users/
const deleteInactiveUsers = async () =>{
    try {
        const response = await fetch(`${baseURL}${PORT}/api/users`, {
                method: 'DELETE',
                headers:{
                        'Content-Type': 'application/json',
                        }
        })
            .then(data =>  data.json())
            .catch(error => console.error('Hubo un problema con la solicitud fetch:', error));
        return response;
    } catch (error) {
        throw error
    }
}

//Cambiar rol de user a premium y viseversa--> GET /api/users/premium/:uid
const changeUserRol = async (uid) =>{
    try {
        const response = await fetch(`${baseURL}${PORT}/api/users/premium/${uid}`)
            .then(data =>  data.json())
            .catch(error => console.error('Hubo un problema con la solicitud fetch:', error));
        return response;
    } catch (error) {
        throw error
    }
}



export default {
    getUsers,
    LocalRegister,
    LocalLogin,
    GithubRegisterLogin,
    logout,
    sendMailPassReset,
    passwordReset,
    uploadUserDocuments,
    deleteUserByID,
    deleteInactiveUsers,
    changeUserRol
}