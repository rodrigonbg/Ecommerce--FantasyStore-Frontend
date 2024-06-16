import CategoryList_Container from "../../components/CategoryList_Conatiner/CategoryList_Container"
import SectionTitle from "../../components/SectionTitle/SectionTitle"

function Categories() {

  return (
    <div>
      <SectionTitle text={'Categorías'}/>
      <CategoryList_Container/>
    </div>
  )
}

export default Categories