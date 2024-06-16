import "bootstrap"
import './DropdownMenu.scss'
import { NavLink, Link } from 'react-router-dom'
import LoginButton from "../LoginButton/LoginButton"
import {routesLink} from '../Navbar/Navbar'
 

const DropdownMenu = (props) => {
  return (
        <div>
            <button type="button" className="btn btn-secondary dropdownMenu_Icon" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                <i id="menu" className="fa-solid fa-bars fa-2x"></i>
            </button>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start dropdownMenu_Ul">
              {routesLink.map(({text, path}) => {
                return <NavLink key={text} to={path} className={({isActive})=> `dropdown-item dropdownMenu_linkBtn ${isActive ? "selected" : ""}` }> {text} </NavLink>
              })}
              <li>
                  <LoginButton className="dropdown-item dropdownMenu_loginBtn"/>
              </li>
            </ul>
        </div>
  )
}

export default DropdownMenu