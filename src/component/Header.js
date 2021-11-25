import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router'
import logo from '../images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSignOutAlt, faTimes, faUserCog } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
    let {user, logoutUser} = useContext(AuthContext)
    let navigate = useNavigate()
    return (
        <header>
            <h1 className="logo"><Link to='/'><img src={logo} alt="logo" />Connect</Link></h1>
            <input type="checkbox" id='nav-chk' />
            <label htmlFor="nav-chk" className="show-navlink-btn"><FontAwesomeIcon icon={faBars} /></label>
            <ul className="navlinks">
                {user? <li onClick={() => navigate('/settings')}><FontAwesomeIcon icon={faUserCog} /> {user.name}</li> : <li><Link to='/register'>Register</Link></li>}
                {user? <li onClick={() => logoutUser()}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</li> : <li><Link to='/login'>Login</Link></li>}
                <label htmlFor="nav-chk" className='hide-navlink-btn'><FontAwesomeIcon icon={faTimes} /></label>
            </ul>
        </header>
    )
}

export default Header
