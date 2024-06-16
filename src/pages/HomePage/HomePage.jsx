import SectionTitle from '../../components/SectionTitle/SectionTitle'
import ItemOnSaleList_Container from '../../components/ItemList_Container/ItemOnSaleList_Container'
import ItemFullPriceList_Container from '../../components/ItemList_Container/ItemFullPriceList_Container'


const HomePage = () => {
  return (
    <div>
        <SectionTitle text={'Productos en Descuento'} />
        <ItemOnSaleList_Container />

        <SectionTitle text={'Destacados'} />
        <ItemFullPriceList_Container/>
    </div>
  )
}

export default HomePage