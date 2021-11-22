import React from 'react'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'
import { Navigate } from 'react-router'

const LoginPage = () => {
    let {user, loginUser} = useContext(AuthContext)
    return (
        user ? <Navigate to='/'></Navigate> : (
        <div className="login-page">
            <form className='login-form' onSubmit={(e) => loginUser(e)}>
                <h1>Login</h1>
            <input type="text" id='id_username' placeholder='Username' required />
            <input type="password" id="id_password" placeholder='Password' required />
            <button type="submit">Login</button>
            <p>Don't have an account? Register <Link to='/register'>here</Link></p>
        </form>
        </div>
        )
    )
}

export default LoginPage
