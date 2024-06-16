import SectionTitle from "../../components/SectionTitle/SectionTitle"
import './Help.scss'


const Help = () => {
    return (
        <div className="help_Container">

            <SectionTitle text={'¿Con qué podemos ayudarte?'} />

            <section>
                <form id="searchBar_section" action="">{/* <!-- Buscador de ayuda--> */}
                    <input id="searchBar" type="text" name="buscador" placeholder="Buscar"/>
                    <button id="searchButton">Buscar</button>
                </form>
            </section>    

            <section>
                    <h2>Compras</h2>
                    <form>
                        <button type="button" >Devoluciones de productos</button>
                        <button>Reembolso de dinero</button>
                        <button>Envios</button>
                        <button>Preguntas frecuentes</button>
                    </form>
            </section>

            <section>
                    <h2>Cuenta</h2>
                    <form>
                        <button>Seguridad</button>
                        <button>Configuración</button>
                    </form>
            </section>

        </div>
    )
  }
  
  export default Help