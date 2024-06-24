import {serverURL} from '../config'

//----------------------Users------------------------------------
//Traer todos los usuarios--> GET /api/users
const getUsers = async () =>{
    try {
        const users = await fetch(`${serverURL}/api/users`, {
            credentials: 'include',
            headers:{
                    'Content-Type': 'application/json',
                    },
        })
        return users;
    } catch (error) {
        return error
    }
}

//Registro con el middleware de passport LOCAL--> POST /api/users
const LocalRegister = async (user) =>{
    try {
        const response = await fetch(`${serverURL}/api/users/front`, {
                credentials: 'include',
                method: 'POST',
                headers:{
                        'Content-Type': 'application/json',
                        },
                body: JSON.stringify(user),
        })
        const data = await response.json();

        return data

    } catch (error) {
        return error
    }
}

//Login con el middleware de passport LOCAL--> POST /api/sessions/loginFront
const LocalLogin = async (user) =>{
    try {
        const response = await fetch(`${serverURL}/api/sessions/loginFront`, {
                credentials: 'include',
                method: 'POST',
                headers:{
                        'Content-Type': 'application/json',
                        },
                body: JSON.stringify(user),
        })
        
        if (!response.ok) {
            return response.json();
        }

        return {status:200, user:response.json()}
    } catch (error) {
        throw error
    }
}

//Registro o login con el middleware de passport GITHUB--> GET /api/sessions/github
const GithubRegisterLogin = async () =>{
    try {
        const response = await fetch(`${serverURL}/api/sessions/github`)
            .then(data =>  data.json())
            .catch(error => console.error('Hubo un problema con la solicitud fetch:', error));
        
        if (!response.ok) {
            throw new Error(`Hubo un problema con la solicitud fetch al iniciar sesion : ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        throw error
    }
}

//logout con local passport--> GET /api/sessions/logoutFront
const logout = async () =>{
    try {
        const response = await fetch(`${serverURL}/api/sessions/logoutFront`,{
            credentials: 'include',
        })
        console.log(response)
        if (!response.ok) {
            return (`Hubo un problema con la solicitud fetch al cierre de sesion`);
        }

        return response.text();;
    } catch (error) {
        throw error
    }
}
  
//Enviar mail para resetear contraseña--> POST /api/users/requestPasswordReset
const sendMailPassReset = async (user) =>{
    try {
        const response = await fetch(`${serverURL}/api/users/requestPasswordReset`, {
                credentials: 'include',
                method: 'POST',
                headers:{
                        'Content-Type': 'application/json',
                        },
                body: JSON.stringify(user),
        })

        return response;
    } catch (error) {
        return error
    }
}

//Cambiar contraseña con token--> POST /api/users/passwordReset
const passwordReset = async (user) =>{
    try {
        const response = await fetch(`${serverURL}/api/users/passwordReset`, {
                credentials: 'include',
                method: 'POST',
                headers:{
                        'Content-Type': 'application/json',
                        },
                body: JSON.stringify(user),
        })

        return response;
    } catch (error) {
        return error
    }
}

//Subir documentos de los usuarios--> POST /api/users/:uid/documents
const uploadUserDocuments = async (uid, documents) =>{
    try {
        const response = await fetch(`${serverURL}/api/users/${uid}/documents`, {
                credentials: 'include',
                method: 'POST',
                body: documents,
        })

        return response;
    } catch (error) {
        return error
    }
}

//Eliminar usuario por id--> DELETE /api/users/:uid
const deleteUserByID = async (uid) =>{
    try {
        const response = await fetch(`${serverURL}/api/users/${uid}`, {
                credentials: 'include',
                method: 'DELETE',
                headers:{
                        'Content-Type': 'application/json',
                        }
        })

        return response;
    } catch (error) {
        return error
    }
}

//Eliminar usuarios inactivos en mas de 24H--> DELETE /api/users/
const deleteInactiveUsers = async () =>{
    try {
        const response = await fetch(`${serverURL}/api/users`, {
                credentials: 'include',    
                method: 'DELETE',
                headers:{
                        'Content-Type': 'application/json',
                        }
        })

        return response;
    } catch (error) {
        return error
    }
}

//Cambiar rol de user a premium y viseversa--> GET /api/users/premium/:uid
const changeUserRol = async (uid) =>{
    try {
        const response = await fetch(`${serverURL}/api/users/premium/${uid}`)
            
        return response;
    } catch (error) {
        return error
    }
}

//Validar session --> GET  /api/session/valid
const validSession = async () =>{
    try {
        const response = await fetch(`${serverURL}/api/sessions/valid`,{
            credentials: 'include'
        })

        if(response.ok){
            return {session:true, user: await response.json()}
        }

        return {session:false, user:null};
    } catch (error) {
        return {session:false, user:null};
    }
}

export {
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
    changeUserRol,
    validSession
}