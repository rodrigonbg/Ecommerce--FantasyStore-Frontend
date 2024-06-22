import React from "react"
import 'bootstrap'
import './ItemOnSaleList_Container'
import ItemOnSale_Card from "../Item_Card/ItemOnSale_Card"
import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { Loading } from "../Loading/Loading"

import {
  getProducts, 
  getProductByID, 
  postNewProductAdmin, 
  postNewProductPremium,
  deleteProductAdmin,
  deleteProductPremium
} from "../../services/API/products.js"

const ItemOnSaleList_Container = () => {

  const [error, setError] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const {idCat} = useParams() /* me levanta el id como string */

  const fetchProducts = async (idCat)=> {
      try {
        /* Si hay id de categorias, levanto los productos filtrando por categorias. si no hay id de categorias, levanto todos los productos */
          const response = idCat? await getProducts(idCat) : await getProducts()
          return response
      } catch (error) {          
          throw error;
      }
  }

  useEffect(()=>{
    setLoading(true)
    
    const response = fetchProducts(idCat)
        .then((res) => {
            if (res && res.docs) {
                setProducts(res.docs);
            }else {
                // Manejo de caso en que res no tenga docs
                setError(<p>Error inesperado en la estructura de datos</p>);
            }
        })

        .catch((e) => {
            setError(<p>Error con la Base de datos</p>);
        })

        .finally(() => {
            setLoading(false);
        });
  },[idCat])

  return ( /* Return de productos OnSale */
      <div id='onSale' className="section_container"> 
        {
          loading?
          <Loading />
          :
          <section id="itemsDestacados" className="row">
            {
            error?
            error
            :
            products.map((prod)=>{
              if (prod.onSale){
                return (
                  <ItemOnSale_Card 
                    key = {prod._id}
                    id = {prod._id}
                    nombre = {prod.title}
                    descripcion = {prod.descripcion}
                    categoria = {prod.categoria}
                    img = {prod.thumbnail}
                    precio = {prod.price}
                    onSale = {prod.onSale}
                    descuento = {prod.descuento}
                    stock = {prod.stock}
                    alt = {prod.alt}
                    owner = {prod.owner}
                  />
                )
              }  
            })}
          </section>
        }
      </div>
  )
}

export default ItemOnSaleList_Container