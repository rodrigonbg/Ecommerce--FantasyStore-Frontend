import SectionTitle from '../../components/SectionTitle/SectionTitle'
import './AboutUs.scss'

const AboutUs = () => {
  return (
    <>

    <section className="aboutUs_Container">

      <SectionTitle text={'Sobre nosotros'}/>

      <h2>Somos</h2>
      <div className="parrafos">
          <p>Somos una empresa con más de 10 años de experiencia en el sector, y nos dedicamos a brindar soluciones de decoración y mobiliario para hogares y empresas.</p>
          <p>Nuestro objetivo es ofrecer productos de alta calidad, durabilidad y diseño, siempre a precios competitivos. Trabajamos con una amplia variedad de estilos, desde lo clásico hasta lo moderno, con el fin de satisfacer los gustos y necesidades de todos nuestros clientes.</p>
          <p>En nuestra tienda podrás encontrar una amplia variedad de productos, desde muebles hasta artículos decorativos, pasando por lámparas, alfombras, cuadros y mucho más. Nos caracterizamos por ofrecer una atención personalizada y un servicio postventa de excelencia.</p>
      </div>

      <h2>Hacemos</h2>
      <div className="parrafos">
          <p  >En nuestro equipo contamos con profesionales altamente capacitados en decoración y diseño de interiores, quienes pueden asesorarte en todo momento para que logres el ambiente que deseas en tu hogar o negocio. Nos enorgullece decir que nuestros muebles y productos son elaborados con materiales de primera calidad y por manos expertas, garantizando así su resistencia y durabilidad.</p>
      </div>
      
      <div> 
          <p style={{fontWeight: 800, textAlign: 'center', margin: 40}}>Gracias por confiar en nosotros para hacer realidad tus proyectos de decoración. ¡Esperamos verte pronto en nuestra tienda!</p>
      </div>
  </section>
  </>
  )
}

export default AboutUs