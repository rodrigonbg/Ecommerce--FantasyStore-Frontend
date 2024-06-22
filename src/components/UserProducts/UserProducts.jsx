import React from 'react'
import './UserProducts.scss' 
import { UserContext } from '../../context/UserContext/UserContext'
import {useState, useEffect, useContext} from 'react'
import { getProductByOwner, getProducts} from '../../services/API/products'
import UserProduct_card from '../UserProduct_card/UserProduct_card'

const UserProducts = () => {

    const {user, cartID ,validActiveSession, rol} = useContext(UserContext)
  
    const [loader, setLoader] = useState(true)
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [reload, setReload] = useState(0);


    useEffect(()=>{
        setLoader(true)
    
        const valid= async()=>{
            await validActiveSession()
        }
        valid()
    
        const fetchProducts= async()=>{
            let res
            if(rol === 'admin'){
                res = await getProducts()
                    .then((res) => setProducts(res.docs))
                    .catch(()=> setError((<p>Error al obtener los prductos</p>)))
                    .finally(()=> setLoader(false) )

            }else{
                res = await getProductByOwner()
                if(!res.ok){
                    setError((<p>Error al obtener los productos del usuario: {res.message}</p>))
                }else{
                    setProducts(res.products)
                    setError(null)
                }
                setLoader(false)
            }
                

        }
        fetchProducts()
        
        },[reload])

    return (
        <section className='UserProductsContainer'>
            {loader?
                loader
                :
                <>
                    {error?
                        error
                        :
                        <div>
                            {products.length === 0? 
                                <p>No tiene productos cargados a la venta</p>
                                :
                                <div>
                                    {
                                        products.map((prod) => {
                                            return (
                                                <UserProduct_card key={prod._id} product={prod} setReload={setReload}/>
                                            )
                                        })
                                    }
                                </div>
                            }
                        </div>
                    }
                </>
            }
        </section>
    )
}

export default UserProducts