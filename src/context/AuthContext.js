import jwtDecode from 'jwt-decode'
import React from 'react'
import { useState } from 'react'
import { createContext, useEffect } from 'react'
import { useNavigate } from 'react-router'

const AuthContext = createContext() 
export default AuthContext

export const AuthProvider = ({children}) => {
    let [isLoading, setIsLoading] = useState(true)
    let [user, setUser] = useState(localStorage.getItem("authToken") ? jwtDecode(localStorage.getItem("authToken")) : null)
    let [authToken, setAuthToken] = useState(localStorage.getItem("authToken") ? JSON.parse(localStorage.getItem("authToken")) : null)
    let [roomUid, setRoomUid] = useState(null)
    const [isEnteringRoom, setisEnteringRoom] = useState(false)

    let navigate = useNavigate()

    let loginUser = async (e) => {
        try {
            e.preventDefault()
            let response = await fetch('http://127.0.0.1:8000/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"username":e.target.id_username.value,"password":e.target.id_password.value})
            })
            if (response.status === 200) {
                let data = await response.json()
                setAuthToken(data)
                setUser(jwtDecode(data.access))
                localStorage.setItem('authToken', JSON.stringify(data))
                navigate('/')
            } else {
                alert("Account doesn't exists, please re check your username or password")
            }
        } catch(err) {
            console.error(err)
            logoutUser()
        }
    }

    let registerUser = async (e) => {
        try {
            e.preventDefault()
            let response = await fetch('http://127.0.0.1:8000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"username":e.target.id_username.value,"password":e.target.id_password.value, "password2":e.target.id_password2.value, "email":e.target.id_email.value})
            })
            if (response.status === 200) {
                loginUser(e)
            } else {
                alert('The Username is taken')
            }
        } catch(err) {
            alert(err.message)
        }
    }


    let refreshToken = async () => {
        try {
            let response = await fetch('http://127.0.0.1:8000/api/token/refresh', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"refresh":authToken.refresh})
            })
            if (response.status === 200) {
                let data = await response.json()
                setAuthToken(data)
                setUser(jwtDecode(data.access))
                localStorage.setItem('authToken', JSON.stringify(data))
            }
        } catch(err) {
            console.error(err)
            logoutUser()
        }
    }

    let logoutUser = () => {
        setAuthToken(null)
        setUser(null)
        localStorage.removeItem('authToken')
        navigate('/login')
    }

    let contextData = {
        user:user,
        authToken:authToken,
        loginUser:loginUser,
        registerUser:registerUser,
        logoutUser:logoutUser,
        roomUid:roomUid,
        setRoomUid:setRoomUid,
        isEnteringRoom:isEnteringRoom,
        setisEnteringRoom:setisEnteringRoom
    }
    useEffect(() => {
        if (isLoading) {
            refreshToken()
            setIsLoading(false)
        }
        let func = setInterval(() => {
            if (authToken) { 
                refreshToken() 
            }}, 40000)
        
        return () => {
            clearInterval(func)
        }
    }, [authToken, isLoading])
    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}
