import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router'
import AuthContext from '../context/AuthContext'

const SettingsPage = () => {

    let {authToken, getChatBackground} = useContext(AuthContext)

    const [image, setImage] = useState(null)

    let navigate = useNavigate()

    let handleSubmitChatBackground = async (e) => {
        e.preventDefault()
        if (image) {
            try {
                await fetch('https://connectchatapp-backend.herokuapp.com/api/profiles', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                    'Authorization': 'Bearer '+ String(authToken.access)
                },
                body: JSON.stringify({'image_str':image})
            })
            alert('Chat background was successfully changed!')
            getChatBackground()
            navigate('/')
            } catch (error) {
                console.error(error)
            }
        } else {
            alert('No image was selected...')
        }
    } 

    let getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload =() => resolve(reader.result)
            reader.onerror = error => reject(error)
            reader.readAsDataURL(file)
        })
    }

    let handleChange = (e) => {
        let file = e.target.files[0]
        getBase64(file).then(base64 => {
            setImage(base64)
            localStorage.setItem('chatBackground', base64)
        })
    }

    return (
        <div className="settings-container">
            <h1>Change Chat Background</h1>
            <p>Desktop : Landscape (Recommended)</p>
            <p>Mobile : Portrait (Recommended)</p>
            <form className="change-background-form" onSubmit={(e) => handleSubmitChatBackground(e)}>
                <input type="file" onChange={(e) => handleChange(e)} id="id_chat_background" accept="image/png, image/jpeg, image/jpg, image/jiff" />
                <button type="submit">Submit</button>
            </form>
            {image ? <img src={image} alt="Preview" /> : null}
        </div>
    )
}

export default SettingsPage
