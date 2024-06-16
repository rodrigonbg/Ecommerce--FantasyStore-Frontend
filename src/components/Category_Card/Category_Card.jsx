import './Category_Card.scss'
import { Link } from 'react-router-dom'


const Category_Card = (categoria) => {

    return (
        <Link className='Link' to={`/categories/${categoria.id}`}>
            <div key={categoria.id} className="category">
                <h3 className="category_tittle">{categoria.nombre}</h3>
                <img className="category_img" src={categoria.img} alt={categoria.alt} />
            </div>
        </Link>
    )
}

export default Category_Card
