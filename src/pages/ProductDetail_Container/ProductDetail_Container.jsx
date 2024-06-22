import React from 'react'
import Product_Detail from '../../components/Product_Detail/Product_Detail'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Loading } from '../../components/Loading/Loading'
import {getProductByID} from '../../services/API/products'


const ProductDetail_Container = () => {

  const [error, setError] = useState(null)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const { idItem } = useParams();

  useEffect(()=>{
    setLoading(true)

    if(!idItem){
      setError(<p>Parametros invalidos</p>)
    }

    getProductByID(idItem)        
      .then((res) => {
        setProduct(res);
      })
      .catch((e) => {
          setError(<p>Error con la Base de datos</p>);
      })
      .finally(() => {
          setLoading(false);   
      });
  },[idItem])

  return (
    <>
      {loading? 
        <Loading/>
        :
          error?
          error
          :
          <Product_Detail {...product} />
        
      }
    </>
  )
}

export default ProductDetail_Container