import SectionTitle from '../SectionTitle/SectionTitle'
import './Header_hompage.scss'
import React from 'react'
import { Link } from 'react-router-dom'

const Header_hompage = () => {
  return (
    <section className="header__gridContainer">
            <section className="header__info"> {/* Titulo y parrafo */}
                <SectionTitle className ={'header__info__tittle'}text={'Furniture that everyone Loves'}/>
                <p className="header__info__p">Tenemos mas de 5000 reviews y nuestros clientes confían en nuestros muebles y en la calidad de nuestros productos.</p>
            </section> 

            <section className="header__imgs"> {/* Carrusel del header */}
                <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                      <div className="carousel-item active" data-bs-interval="5000">
                        <img className="imgs d-block w-100" src="Imagenes/Carrusel-header/SillonGris.png" alt="Sillon gris"/>
                      </div>
                      <div className="carousel-item" data-bs-interval="5000">
                        <img className="imgs d-block w-100" src="Imagenes/Carrusel-header/SillonBlanco.png" alt="Sillon Blanco"/>
                      </div>
                      <div className="carousel-item" data-bs-interval="5000">
                        <img className="imgs d-block w-100" src="Imagenes/Carrusel-header/SillonGris2.png" alt="Sillon Gris"/>
                      </div>
                    </div>
                    <button className="carousel-control-prev " type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
            </section>

            <section className="header__buttons"> {/* Botones buy now, explore */}
                    <Link to={'/cart'} className='header__buyNowButton'>Compar ahora</Link>
                    <Link to={'/categories'} className='header__ExploreButton'>Explorar</Link>
            </section>
        </section>
  )
}

export default Header_hompage