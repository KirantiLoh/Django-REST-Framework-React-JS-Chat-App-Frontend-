import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { Navigate } from 'react-router'

const LoginPage = () => {
    let {user, registerUser} = useContext(AuthContext)

    return (
        user ? <Navigate to='/'></Navigate> : (
        <div className="login-page">
            <form className='login-form' onSubmit={(e) => registerUser(e)}>
                <h1>Register</h1>
            <input type="text" id='id_username' placeholder='Username' required />
            <input type="email" id="id_email" placeholder='Email' required />
            <input type="password" id="id_password" placeholder='Password' required />
            <input type="password" id="id_password2" placeholder='Confirm Password' required />
            <button type="submit">Register</button>
            <p>Already have an account? Login <Link to='/login'>here</Link></p>
        </form>
        </div>
        )
    )
}

export default LoginPage
