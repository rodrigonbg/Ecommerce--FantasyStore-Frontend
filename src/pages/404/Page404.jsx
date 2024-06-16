import React from 'react'
import { Link } from 'react-router-dom'
import './Page404.scss'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import SectionTitleH2 from '../../components/SectionTitleH2/SectionTitleH2'

const Page404 = () => {
  return (
    <div className="container">
      <section>

        <div id="info">
            <SectionTitle text={'404'} />
            <SectionTitleH2 text ={'Página no Encontrada!!!'}/>
            <p>Lo sentimos! La sección o articulo que usted está buscando no pudo ser encontrada. Por favor, vuelva a la página principal.</p>
        </div>

        <div id="ilustracion">
            <img src="../Imagenes/lookingFor.svg" alt="Ilustración"/>{/* Ilustración */}
        </div>

      </section>

      <Link className='link' to ={'/'}>Ir al inicio</Link>

  </div> 
  )
}

export default Page404