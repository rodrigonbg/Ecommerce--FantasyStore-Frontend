import './NewsletterForm.scss'

const NewsletterForm = () => {

  const handleForm = (e) =>{
    e.preventDefault()
  } 

  return (
    <form className="newsletterForm" onSubmit={(e)=> handleForm(e)}>
        <input type="email" name="email" id="email" placeholder=' Ejemplo@gmail.com'/>
        <button type="submit" value="Enviar">Enviar</button>
    </form>
  )
}

export default NewsletterForm