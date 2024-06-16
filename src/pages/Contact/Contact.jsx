import SectionTitle from '../../components/SectionTitle/SectionTitle'
import './Contact.scss'

function Contact() {
  return (
<div className="contact_Container">

            <SectionTitle text={'Contactanos'} />

            <form action="">
                <div>
                    <label htmlFor="nombre">Nombre:</label>
                    <input id="nombre" className="textField" type="text" placeholder="ej.: Rodrigo Rodriguez" name="nombre" required/>
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input id="email" className="textField" type="email" placeholder="ej.: Rodrigonbg@hotmail.com" name="email" required/>
                </div>    
                <div>
                    <label htmlFor="telefono">Telefono:</label>
                    <input id="tel" className="textField" type="number" placeholder="ej.: +598092987977" name="telefono" required/>
                </div>
                <div>
                    <label htmlFor="asunto">Asunto:</label>
                    <input id="asunto" className="textField" type="text" placeholder="ej.: Producto defectuso" name="asunto" required/>
                </div>
                <div>
                    <label htmlFor="comentario">Comentario:</label>
                    <textarea id="text" className="textField" name="comentario" cols="30" rows="10" required></textarea>
                </div>
                <div>
                    <input className="submitButton" type="submit" value="Enviar"/>
                </div>
            </form>
        </div>
  )
}

export default Contact