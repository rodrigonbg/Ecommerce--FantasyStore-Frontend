import './CategoryList_Container.scss'
import Category_Card from "../Category_Card/Category_Card"

export const Categories = [ {id: 1, nombre: "Dormitorio" , img:"../Imagenes/Categorías/dormitorio.png", alt : "Dormitorio" },
                            {id: 2, nombre: "Living" , img:"../Imagenes/Categorías/living.jpg", alt : "Living" },
                            {id: 3, nombre: "Oficina" , img:"../Imagenes/Categorías/oficina.png", alt : "Oficina" },
                            {id: 4, nombre: "Comedor" , img:"../Imagenes/Categorías/comedor.png", alt : "Comedor" }]

                    
const CategoryList_Container = () => {

  return (
    <section className="categoryList_Container">
        {Categories.map((category)=>{
            return(
                <Category_Card key={category.id} {...category}/>
            )
        })}
    </section>
  )
}

export default CategoryList_Container