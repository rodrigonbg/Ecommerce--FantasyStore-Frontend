import React from 'react'
import Product_Detail from '../../components/Product_Detail/Product_Detail'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {getDoc, doc} from "firebase/firestore" 
import { db } from "../../services/config"
import { Loading } from '../../components/Loading/Loading'


const ProductDetail_Container = () => {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const { idItem } = useParams();

  useEffect(()=>{
    setLoading(true)
    const nuevoDoc = doc(db, 'productos', idItem)
    getDoc(nuevoDoc)
      .then(res => {
        const data = res.data()
        const nuevoProducto = {id: res.id, ...data}
        setProduct(nuevoProducto)
        setLoading(false)
      })
      .catch(e => <p>Error al encontrar el producto</p>)
  },[idItem])

  return (
    <>
    {loading? 
    <Loading/>
    :
    <Product_Detail {...product} />
    }
    </>
  )
}

export default ProductDetail_Container