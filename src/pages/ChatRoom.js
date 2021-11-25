import React, { useContext, useRef } from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import AuthContext from '../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faPaperPlane, faSmile, faTrashAlt, faTimesCircle, faCog, faTimes, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import Emojis from '../component/Emojis'
import { faEdit } from '@fortawesome/free-regular-svg-icons'

const ChatRoom = ({uid}) => {

    let {user, authToken, setRoomUid, isEnteringRoom, setisEnteringRoom} = useContext(AuthContext)

    const [roomDetail, setRoomDetail] = useState([])
    const [messages, setMessages] = useState([])
    let navigate = useNavigate()

    const divRef = useRef(null)

    let getRoomDetail = async () => {
        try {
            let response = await fetch(`https://connectchatapp-backend.herokuapp.com/api/rooms/${uid}`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization':'Bearer ' + String(authToken.access)
            },
        })
        if (response.status === 200) {
            let data = await response.json()
            setRoomDetail(data)
            let messages = data.messages
            setMessages(messages)
        } else {
            navigate('/')
            setRoomUid(null)
        }
        } catch (err) {
            console.error(err)
            setRoomUid(null)
        }
        
    }
    let sendMessage = async (e) => {
        e.preventDefault()
        let response = await fetch(`https://connectchatapp-backend.herokuapp.com/api/rooms/${uid}`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': "Bearer " + String(authToken.access)
            },
            body:JSON.stringify({'room':uid, 'sender':user.name,'content':e.target.id_message.value})
        })
        e.target.id_message.value = ''
        if (response.status === 200) {
            getRoomDetail()
            setisEnteringRoom(true)
        } else {
            navigate('/')
        }
    }

    let deleteRoom = async () => {
        let confirmation = window.confirm('Are you sure you want to delete this room?')
        if (confirmation) {
            let response = await fetch(`https://connectchatapp-backend.herokuapp.com/api/rooms/${uid}`, {
            method : 'DELETE',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer '+String(authToken.access)
            },
            body: JSON.stringify({'uid':uid,'creator':roomDetail.creator,'cur_user':user.name})
            })
            let data = await response.json()
            if (response.status === 200) {
                setRoomUid(null)
                alert(data.message)
                navigate('/')
            }
        }
    }

    let renameRoom = async (e) => {
        e.preventDefault()
        let rename_chk = document.querySelector("#rename-chk")
        try {
            let response = await fetch(`https://connectchatapp-backend.herokuapp.com/api/rooms/${uid}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type':'application/json',
                    'Authorization': 'Bearer '+String(authToken.access)
                },
                body: JSON.stringify({'uid':uid, 'name':e.target.id_name.value})
            })
            let data = await response.json()
            if (response.status === 200) {
                getRoomDetail()
                rename_chk.click()
            } else {
                alert(data.message)
            }
        } catch(err) {
            console.error(err)
        } finally {
            e.target.id_name.value = ""
        }
    }

    let add_member = async (e) => {
        e.preventDefault()
        try {
            let response = await fetch(`https://connectchatapp-backend.herokuapp.com/api/profiles`,
            {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                    'Authorization': 'Bearer '+ String(authToken.access)
                },
                body: JSON.stringify({'uid':uid, 'creator':roomDetail.creator, 'user':e.target.id_user.value})
            })
            let data = await response.json()
            alert(data.message)
        } catch (error) {
            console.error(error)
        }
        e.target.id_user.value = ''
        document.querySelector('#add-member-chk').click()
    }

    let showEmoji = () => {
        let emojis = document.querySelector('.emojis')
        emojis.style.display = 'block'
    }

    let hideEmoji = () => {
        let emojis = document.querySelector('.emojis')
        emojis.style.display = 'none'
    }

    let exitRoom = () => {
        setRoomUid(null)
    }

    let handleInputChange = (e) => {
        if (e.which === 13 && !e.shiftKey) {
            document.querySelector('.submit-btn').click()
        } 
    }

    let handleOpenRenameForm = () => {
        let rename_chk = document.querySelector("#rename-chk")
        let creator_chk = document.querySelector("#creator-chk")

        rename_chk.click()
        creator_chk.click()
    }

    let handleAddMemberClick =() => {
        document.querySelector('#add-member-chk').click()
        document.querySelector('#creator-chk').click()
    }

    useEffect(() => {
        
        let func = setInterval(() => getRoomDetail(), 500)
        if (isEnteringRoom) {
            setTimeout(divRef.current.scrollIntoView({behaviour:'smooth'}), 1000)
            setTimeout(() => setisEnteringRoom(false), 1000)
        }
        
        return () => {
            clearInterval(func)
        }
    })

    return (
        roomDetail ? (
        <div className='chat-room' >
            <div className="room-detail">
                <div className="left-detail">
                   <h1 className="exit-room" onClick={() => exitRoom()} ><FontAwesomeIcon icon={faArrowLeft} /></h1>
                    <h1>{roomDetail.name ? roomDetail.name : "..."}</h1> 
                </div>
                {(user.name === roomDetail.creator) ? 
                <div className="creator-opt-container">
                    <input type="checkbox" id="creator-chk" />
                    <label htmlFor="creator-chk" className="show-creator-opt-btn"><FontAwesomeIcon icon={faCog} /></label>
                    <div className="creator-opt">
                        <h1 className='title'>Room Settings</h1>
                        <div>
                            <h1 className="edit-room-name" onClick={() => handleOpenRenameForm()} ><FontAwesomeIcon icon={faEdit} /> Edit Room Name</h1>
                            <h1 className="add-member-btn" onClick={() => handleAddMemberClick()}><FontAwesomeIcon icon={faUserPlus} /> Add Member</h1>
                            <h1 className="delete-room-btn" onClick={() => deleteRoom()}><FontAwesomeIcon icon={faTrashAlt} /> Delete Room</h1>
                        </div>
                        <label htmlFor="creator-chk" className='hide-creator-opt-btn'><FontAwesomeIcon icon={faTimes} /></label>
                    </div>
                </div> :  <p>Creator : {roomDetail.creator}</p> }
            </div>
            <div className="messages" onClick={() => hideEmoji()}>
            {
                messages ? (
                    <ul>
                {messages.map((message) => {
                    return (
                        <li key={message.id} className={(user.name === message.sender) ? "my-message" : "their-message"}>            
                            <p className="message-sender">{message.sender}</p>
                            <p className="message">
                                {message.content}
                            </p>
                            <p className="message-time">{String(new Date(message.date_added).toLocaleTimeString(navigator.language, {hour:'2-digit',minute:'2-digit'}))}</p>
                        </li>
                        )})}
                    <div ref={divRef}></div>
                </ul>
                ) : (
                    <h1>Start Chatting</h1>
                )
            }
            </div>
            
            <div className="chat-form-container">
            <Emojis />
            <form className='chat-form' onSubmit={(e) => sendMessage(e)}>
                <button type="button" className="show-emoji-btn" onClick={() => showEmoji()}><FontAwesomeIcon icon={faSmile} /></button>
                <textarea id='id_message' placeholder='Enter a message' required onKeyPress={(e)=>handleInputChange(e)}></textarea>
                <button type="submit"  className="submit-btn"><FontAwesomeIcon icon={faPaperPlane} /></button>
            </form>
            </div>

            <input type="checkbox" id="rename-chk"  />
            <form className="rename-form" onSubmit={(e) => renameRoom(e)}>
                <div className="rename-form-title">
                    <h1>Rename Room</h1>
                    <label htmlFor="rename-chk" className="hide-create-room"><FontAwesomeIcon icon={faTimesCircle}/></label>
                </div>
                
                <input type="text" autoComplete="off" placeholder="Room Name" id="id_name" />
                <button type="submit" className="submit-rename-btn">Rename</button>
            </form>

            <input type="checkbox" id="add-member-chk"  />
            <form className="add-member-form" onSubmit={(e) => add_member(e)}>
                <div className="rename-form-title">
                    <h1>Add Member</h1>
                    <label htmlFor="add-member-chk" className="hide-add-member-form"><FontAwesomeIcon icon={faTimesCircle}/></label>
                </div>
                
                <input type="text" autoComplete="off" placeholder="Username" id="id_user" />
                <button type="submit" className="submit-rename-btn">Add User To Room</button>
            </form>
            
        </div>
        ) : (
            <div className="loading-screen">
                <div className="loader"></div>
                <input type='text' id='id_message' placeholder='Enter a message' />
                <textarea id='id_message' placeholder='Enter a message'></textarea>
            </div>
        )
    )
}

export default ChatRoom
