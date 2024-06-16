import React from 'react'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import ItemFullPriceList_Container from '../../components/ItemList_Container/ItemFullPriceList_Container'
import ItemOnSaleList_Container from '../../components/ItemList_Container/ItemOnSaleList_Container'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import {Categories} from '../../components/CategoryList_Conatiner/CategoryList_Container'
import SectionTitleH2 from '../../components/SectionTitleH2/SectionTitleH2'

const Category = () => {
    const [titulo, setTitulo] = useState('')
    const { idCat } = useParams();

    useEffect(()=>{

        const category = Categories.find((Category) => Category.id === Number(idCat))
        setTitulo(category.nombre)
        
    }, [idCat])

    return (
        <div>
            <SectionTitle text={titulo}/>

            <SectionTitleH2 text={'Productos en Descuento'}/>
            <ItemOnSaleList_Container />

            <SectionTitleH2 text={'Destacados'}/>
            <ItemFullPriceList_Container/>
        </div>
    )
}

export default Category