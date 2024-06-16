import { NavLink, Link } from 'react-router-dom'
import logo from '../../logos/logo-fantasy-white.png'

/* Styles */
import './Navbar.scss'
import "./ListItem.scss"

/* Components */
import SearchBar from '../SearchBar/SearchBar'
import Cart_Icon from '../Cart_Icon/Cart_Icon'
import DropdownMenu from '../DropdownMenu/DropdownMenu'
import LoginButton from '../LoginButton/LoginButton'

export const routesLink = [ {text:'Inicio', path:'/'},
                            {text:'Categorias', path:'/categories'},
                            {text:'Nosotros', path:'/about_us'},
                            {text:'Ayuda', path:'/help'},
                            {text:'Contacto', path:'/contact'}]

const Navbar = () => {
    
    return(
            <section className="navbarContainer">
                <Link to='/'>
                    <img className="navbar_logo" src={logo} alt="Logotipo" />
                </Link>

                <span className="navbarTools">

                    <nav className="navbar_itemsContainer">
                        <div>
                            {/* Barra de navegacíon. Recorro el array con map y genero los NavLinks */}
                            {routesLink.map(({text, path})=>{
                                return <NavLink key={text} to={path} className={({isActive})=> `navbar_item ${isActive ? "selected" : ""}` }> {text} </NavLink>
                            })}
                        </div>    
                    </nav>

                    <SearchBar />

                    {/* Boton del Buscador */}
                    <input className="SearchBar_Button" type="button" value="buscar" />

                    <NavLink to='/Cart' className={({isActive})=> ` ${isActive ? "selected" : "notSelected"}` }>
                        <Cart_Icon/>
                    </NavLink> 

                    {/* Boton de menú */}
                    <DropdownMenu />

                    {/* login */}
                    <LoginButton className="loginButton"/>
                </span>
            </section>
    )
}

export default Navbar