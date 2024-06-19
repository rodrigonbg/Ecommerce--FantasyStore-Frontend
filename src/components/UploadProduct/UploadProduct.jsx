import './UploadProduct.scss'
import React from 'react'
import {useState, useEffect, useContext} from 'react'
import { UserContext } from '../../context/UserContext/UserContext'
import Swal from 'sweetalert2'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"


import {postNewProductAdmin, postNewProductPremium} from '../../services/API/products'

const UploadProduct = () => {
    const {validActiveSession, rol, user} = useContext(UserContext)

    //Errores del form
    const [error, setError] = useState(null);
    const [errorUser, setErrorUser] = useState(null);

    const [title, setTitle] = useState(null);
    const [descripcion, setDescripcion] = useState(null);
    const [idCategoria, setIdCategoria] = useState(1);
    const [categoria, setCategoria] = useState('dormitorio');
    const [thumbnail, setThumbnail] = useState([]);
    const [price, setPrice] = useState(null);
    const [onSale, setOnSale] = useState(false);
    const [descuento, setDescuento] = useState(0);
    const [stock, setStock] = useState(null);
    const [status, setStatus] = useState(true);
    const [code, setCode] = useState(null);

    const [errorTittle, setErrorTittle] = useState(null);
    const [errorDescripcion, setErrorDescripcion] = useState(null);
    const [errorIdCategoria, setErrorIdCategoria] = useState(null);
    const [errorThumbnail, setErrorThumbnail] = useState(null);
    const [errorPrice, setErrorPrice] = useState(null);
    const [errorOnSale, setErrorOnSale] = useState(null);
    const [errorDescuento, setErrorDescuento] = useState(null);
    const [errorStock, setErrorStock] = useState(null);
    const [errorStatus, setErrorStatus] = useState(null);
    const [errorCode, setErrorCode] = useState(null);

    useEffect(()=>{
        const valid= async()=>{
            await validActiveSession()
        }
        valid()

        if(!user){
            setErrorUser((<p>Necesitas estar logueado para acceder a esta página</p>))
        }else if(rol === 'usuario'){
            setErrorUser((<p>Acceso solo a usuarios premium o administradores.</p>))
        }

    },[user])

    const handleTittle = (value) =>{
        setTitle(value)
        setErrorTittle(null)
    }

    const handleDescripcion = (value) =>{
        setDescripcion(value)
        setErrorDescripcion(null)
    }

    const handleIdCategoria = (value) =>{
        setIdCategoria(value)
        switch (value){
            case '1': 
                setCategoria('dormitorio');
                setErrorIdCategoria(null);
                break;
            case '2': 
                setCategoria('living');
                setErrorIdCategoria(null);
                break;
            case '3': 
                setCategoria('oficina');
                setErrorIdCategoria(null);
                break;
            case '4': 
                setCategoria('comedor');
                setErrorIdCategoria(null);
                break;
            default:
                setErrorIdCategoria((<p>Categoria invalida</p>));
        }
    }

    const handleThumbnail = (files) =>{
        setThumbnail(files)
        setErrorThumbnail(null)
    }

    const handlePrice = (value) =>{
        setPrice(value)
        if(value <= 0){
            setErrorPrice((<p>El precio debe ser un valor positivo.</p>))
        }else{
            setErrorPrice(null)
        }
    }

    const handleOnSale = (value) =>{
        const bool = value==='true'
        if (!bool){
            setDescuento(0)
            setErrorDescuento(null)
        } 
        setOnSale(bool)
        setErrorOnSale(null)
    }

    const handleDescuento = (e) =>{
        const value = e.target.value;
        setDescuento(value)
        setErrorDescuento(null)

        if (isNaN(value)) {
            setErrorDescuento(<p>Ingrese un valor numérico</p>);
        } else {
            const numericValue = Number(value);

            if (onSale) {
                 if (numericValue < 1 || numericValue > 99) {
                    setErrorDescuento(<p>Ingrese un valor entre 1 y 99</p>);
                } else {
                    setErrorDescuento(null);
                }
            } else {
                setErrorDescuento(null);
            }
        }
    }

    const handleStock = (e) =>{
        const value = e.target.value;
        setStock(value)
        setErrorStock(null)

        if (isNaN(value)) {
            setErrorStock(<p>Ingrese un valor numérico</p>);
        } else {
            const numericValue = Number(value);
            if (numericValue < 1) {
                setErrorStock(<p>El stock debe ser un valor positivo</p>);
            } else {
                setErrorStock(null);
            }

        }
    }

    const handleStatus = (value) =>{
        const bool = value==='true'
        setStatus(bool)
        setErrorStatus(null)
    }

    const handleCode = (value) =>{
        setCode(value)
        setErrorCode(null)
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        //si hay errores
        if( errorTittle || errorDescripcion || errorIdCategoria || errorThumbnail || errorPrice || errorOnSale || errorDescuento || errorStock || errorStatus || errorCode ){
            
            Swal.fire({
                icon: 'error',
                title: `Hay datos invalidos.`,    
                confirmButtonText: 'Aceptar',
                customClass: {
                    title: "titleText",  
                }
            })

        }else{ //no hay errores S

            const formData = new FormData();
            formData.append('title', title);
            formData.append('descripcion', descripcion);
            formData.append('categoria', categoria);
            formData.append('idCategoria', idCategoria);
            formData.append('price', price);
            formData.append('onSale', onSale);
            formData.append('descuento', descuento);
            formData.append('stock', stock);
            formData.append('code', code);
            formData.append('status', status);

            for (let i = 0; i < thumbnail.length; i++) {
                formData.append('thumbnail', thumbnail[i]);
            }

            let res
            if(rol==='admin'){
                res = await postNewProductAdmin(formData)
            }else{
                res = await postNewProductPremium(formData)
            }
            console.log(res)
            if(res.status === 200){

                Toastify({
                    text: `producto "${title}" cargado con exito (stock: ${stock})`,
                    duration: 3500,
                    close: true,
                    gravity: "bottom", // `top` or `bottom`
                    position: "left", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    className: "mensajeToastify agregado"
                }).showToast();

            }else{
                console.log(res)
                const resp = (await res.json())
                console.log(resp)
                Swal.fire({
                    icon: 'error',
                    title: `${resp.message}`,    
                    confirmButtonText: 'Aceptar',
                    customClass: {
                        title: "titleText",  
                    }
                })
            }

        }
    }

  return (
    <section>
    {   
        errorUser?
        errorUser
        :
        <form className="addProductForm" onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data">
            <label htmlFor="title">Titulo del producto</label>
            <input name="title" type="text" id="title" placeholder="Titulo" required={true} onChange={(e) => handleTittle(e.target.value)} value={title}/>
            {errorTittle&& errorTittle}

            <label htmlFor="title">descripción</label>
            <textarea type="textFiled" id="description" cols="30" rows="5" placeholder="Descripción" name="description" required={true} onChange={(e) => handleDescripcion(e.target.value)} value={descripcion}/>
            {errorDescripcion&& errorDescripcion}

            <label htmlFor="idCategoria">Seleccione la categoría del producto</label>
            <select name="idCategoria" id="idCategory" onChange={(e) => handleIdCategoria(e.target.value)}>
                <option value="1">dormitorio</option>
                <option value="2">living</option>
                <option value="3">oficina</option>
                <option value="4">comedor</option> 
            </select>
            {errorIdCategoria&& errorIdCategoria}

            <label htmlFor="price">Ingrese el precio</label>
            <input type="number" id="price" placeholder="Precio" name="price" required={true} onChange={(e) => handlePrice(e.target.value)} value={price}/>
            {errorPrice&& errorPrice}

            <select id="onSale" name="onSale" onChange={(e) => handleOnSale(e.target.value)}>
                <option value={false}>FULL PRICE</option>
                <option value={true}>SALE</option>
            </select>
            {errorOnSale&& errorOnSale}

            <label htmlFor="descuento">ingrese el descuento</label>
            <input type="text" id="descuento" disabled={onSale? false:true} value={descuento} placeholder="Descuento" name="descuento" required={true} onChange={handleDescuento}/>
            {errorDescuento&& errorDescuento}

            <label htmlFor="stock">ingrese el Stock disponible</label>
            <input type="text" id="stock" placeholder="Stock" name="stock" required={true} onChange={handleStock} value={stock}/>
            {errorStock&& errorStock}

            <label htmlFor="code">ingrese un código único</label>
            <input type="text" id="code" placeholder="Código" name="code" required={true} onChange={(e) => handleCode(e.target.value)} value={code}/>
            {errorCode&& errorCode}

            <label htmlFor="status">Seleccione el estado del producto</label>
            <select id="status" name="status" onChange={(e) => handleStatus(e.target.value)} >
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
            </select>
            {errorStatus&& errorStatus}

            <label htmlFor="thumbnail">Seleccione las imagenes</label>
            <input type="file" id="thumbnail" name="thumbnail" multiple required={true} onChange={(e) => handleThumbnail(e.target.files)}/>
            {errorThumbnail&& errorThumbnail}

            <button type="submit" id="btnAdd">Agregar Producto</button>
        </form>
    }
    </section>
  )
}

export default UploadProduct