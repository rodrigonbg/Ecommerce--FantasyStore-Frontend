import React from 'react'
import './UserProducts.scss' 
import { UserContext } from '../../context/UserContext/UserContext'
import {useState, useEffect, useContext} from 'react'
import { getProductByOwner} from '../../services/API/products'


const UserProducts = () => {

    const {user, cartID ,validActiveSession} = useContext(UserContext)
  
    const [loader, setLoader] = useState(true)
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    
    useEffect(()=>{
        setLoader(true)
    
        const valid= async()=>{
            await validActiveSession()
        }
        valid()
    
        const fetchProducts= async()=>{
            const res = await getProductByOwner()
                
            if(!res.ok){
                setError((<p>Error al obtener los productos del usuario: {res.message}</p>))
            }else{
                setProducts(res.products)
                setError(null)
            }
            setLoader(false)

        }
        fetchProducts()
        
        },[])


    return (
        <section className='UserProductsContainer'>
            {error?
                error
                :
                <div>
                    {products.length === 0? 
                        <p>No tiene productos cargados a la venta</p>
                        :
                        <>
                            {
                                products.map((prod) => {
                                    return (
                                        <div key={prod._id}>
                                            <p>{prod.title}</p>{/* Aca claramente va otro componente */}
                                        </div>
                                    )
                                
                                })
                            }
                        </>
                    }
                </div>
            }
            
        </section>
    )
}

export default UserProducts