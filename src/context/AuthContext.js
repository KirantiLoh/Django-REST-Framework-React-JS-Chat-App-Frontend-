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
    const [chatBackground, setChatBackground] = useState(null)
    let navigate = useNavigate()

    let loginUser = async (e) => {
        try {
            e.preventDefault()
            let response = await fetch('https://connectchatapp-backend.herokuapp.com/api/token', {
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
        } finally {
            e.target.id_username.value = ''
            e.target.id_password.value = ''
            setRoomUid(null)
        }
    }

    let registerUser = async (e) => {
        try {
            e.preventDefault()
            let response = await fetch('https://connectchatapp-backend.herokuapp.com/api/register', {
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
            let response = await fetch('https://connectchatapp-backend.herokuapp.com/api/token/refresh', {
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

    let getChatBackground = async () => {
        try {
            let response = await fetch('https://connectchatapp-backend.herokuapp.com/api/profiles', {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                'Authorization': 'Bearer ' + String(authToken.access)
                }
            })
            let data = await response.json()
            if (response.status === 200) {
                let image_str = data.image_str
                setChatBackground(image_str)
                localStorage.setItem('chatBackground', image_str)
            }
        } catch (error) {
            console.error(error)
        }
    }

    let logoutUser = () => {
        setAuthToken(null)
        setUser(null)
        setRoomUid(null)
        setChatBackground(null)
        localStorage.removeItem('authToken')
        localStorage.removeItem('chatBackground')
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
        setisEnteringRoom:setisEnteringRoom,
        chatBackground:chatBackground,
        setChatBackground:setChatBackground,
        getChatBackground:getChatBackground
    }
    useEffect(() => {
        if (isLoading) {
            if (authToken) {
                refreshToken()
                setIsLoading(false)
            }
        }
        let func = setInterval(() => {
            if (authToken) { 
                refreshToken() 
            }}, 40000)
        
        return () => {
            clearInterval(func)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authToken, isLoading, chatBackground])
    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}
