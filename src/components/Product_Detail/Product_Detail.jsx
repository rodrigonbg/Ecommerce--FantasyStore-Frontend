import './Product_Detail.scss'
import 'bootstrap'
import {Link} from 'react-router-dom'
import { useEffect, useState } from 'react'

import { CartContext } from '../../context/CartContext'
import { useContext } from 'react'
import SectionTitleH2 from '../SectionTitleH2/SectionTitleH2'

const Product_Detail = ({_id, title, descripcion, categoria, thumbnail, price, onSale, descuento, stock, alt, status, code, owner }) => {

  const item = {_id, title, descripcion, categoria, thumbnail, price, onSale, descuento, stock, alt }
  const [amount, setAmount] = useState(stock < 1? 0 : 1)/* Cantidad de unidades a agregar al carrito */
  const onSalePrice = (((100-descuento)*price)/100);

  const {addItem} = useContext(CartContext)

  /* Funcion para incrementar elcontador de productos a agregar en 1  */
  const increaseAmount = () =>{
    if (amount < stock){
      setAmount(amount + 1)
    }
  }
  /* Funcion para decrementar elcontador de productos a agregar en 1  */
  const decreaseAmount = () =>{
    if (amount > 1){
      setAmount(amount - 1)
    }
  }
  


  return (
      <div key={_id} className = 'product_Detail'>
        <Link to="/" className="goBackLink">{/*  */}
          {' <-- Go Back'}
        </Link>

        <article>
          <picture className="imgSection">
            <div className="saleTag" > {/* ETIQUETA DE DESCUENTO */}
              {onSale? <span className="badge rounded-0"><i className="fa-solid fa-arrow-down"></i>{descuento}%</span>: <></> }
            </div>
            <img src={thumbnail[0]} alt={alt}/>
          </picture>

          <div className=''>
            <section className="infoSection">    
              <SectionTitleH2 className={'productName'} text={title}/>  
              <p className='productDescription'>{descripcion}</p>
              <p className='productCategory'>Categoría: {categoria}</p> 
              <p className='productCategory'>Vendedor: {owner === 'admin'? 'Fantasy Store' : owner}</p> 
              <p className='productCategory'>Código del producto: {code}</p> 
            </section>

            <section className='buttonSection'>
              <div className='precios' > 
                <p>Precio por unidad: </p>
                <strong>${onSale? <>{onSalePrice} <span className='oldPrice'>{price}</span>  </>: price }</strong>
              </div>
              <div className='precios'>
                <p>Precio en total: </p>
                <strong>${onSale? (onSalePrice * amount).toFixed(2) : price * amount }</strong>
              </div>  
              
              {stock >0 &&
              <div className='handelAmountSection'>
                <button onClick={decreaseAmount}>-</button>
                <strong>{amount}</strong>
                <button onClick={increaseAmount}>+</button>
              </div>
              }
              <p className='stock' >Stock disponible: {stock}</p>

              { stock > 0?
              <button className='cartButton' onClick={()=>{ addItem(item, amount)}} >Agregar al carrito</button>
              :
              <button className='cartButton sinStock' disabled >Sin Stock</button>
              }
            </section>
          </div>
        </article>
      </div> 
  )
}

export default Product_Detail