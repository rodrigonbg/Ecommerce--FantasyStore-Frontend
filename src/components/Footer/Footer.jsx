import 'bootstrap'
import './Footer.scss'
import NewsletterForm from '../NewsletterForm/NewsletterForm'
import wavesOfFooter from '../../imgs/Waves-Footer.png'


const Footer = () => {

    return (
        
        <>
        <img className="waves" src={wavesOfFooter} alt="bordes del footer"/>
        <section className="footer_Container">

            {/* <!-- Seccion de las redes sociales --> */}
            <div className="socialNetworks"> 
                <h4 className="tittle">Redes Sociales</h4>
                <a className="redes" href="https://www.facebook.com"><i className="fa-brands fa-facebook"/>Facebook</a>
                <a className="redes" href="https://www.Instagram.com"><i className="fa-brands fa-instagram"/>Instagram</a>
                <a className="redes" href="https://www.Twitter.com"><i className="fa-brands fa-twitter"/>Twitter</a>
            </div>

            {/* <!-- Seccion de los metoddos de pago --> */}
            <div className="payments">
                <h4 className="tittle">Metodos de Pago</h4>
                <img src="https://http2.mlstatic.com/storage/logos-api-admin/ce1623d0-f39b-11eb-a186-1134488bf456-m.svg" alt="Creditel"/>
                <img src="https://http2.mlstatic.com/storage/logos-api-admin/d7e372a0-f39b-11eb-8e0d-6f4af49bf82e-m.svg" alt="Oca"/>
                <img src="https://http2.mlstatic.com/storage/logos-api-admin/aa2b8f70-5c85-11ec-ae75-df2bef173be2-m.svg" alt="Master"/>
                <img src="https://http2.mlstatic.com/storage/logos-api-admin/91bc0af0-5720-11e8-95d8-631c1a9a92a9-m.svg" alt="Lider"/>
                <img src="https://http2.mlstatic.com/storage/logos-api-admin/a5f047d0-9be0-11ec-aad4-c3381f368aaf-m.svg" alt="Visa"/>
                <img src="https://http2.mlstatic.com/storage/logos-api-admin/751ea930-571a-11e8-9a2d-4b2bd7b1bf77-m.svg" alt="DinersClub"/>
                <img src="https://http2.mlstatic.com/storage/logos-api-admin/fbf867c0-9108-11ed-87b1-fd4dd99fac51-m.svg" alt="Amex"/>
            </div>

            {/* <!-- Seccion de información sobre la pag. --> */}
            <div className="info">
                <h4 className="tittle">Información</h4>
                <p className="texto"><span>Dirección: </span>---------------------</p>
                <p className="texto"><span>Horarios: </span>lunes a viernes de 10 a 21hs, sabados de 10 a 14hs</p>
                <p className="texto"><span>Telefono: </span>222222222</p>
            </div>

            {/* <!-- Inscripción al newsletter --> */}
            <div className="newsLetter">
                <h4 className="tittle">NewsLetter</h4>
                <p className="texto">Para suscribirse a nuestro portal de noticias, registresé con su correo electronico.</p>
                <NewsletterForm/>
            </div>
            
        </section>
        </>
  )
}

export default Footer