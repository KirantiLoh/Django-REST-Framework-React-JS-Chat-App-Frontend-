import React from 'react'
import { useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faPlusCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const RoomList = () => {
    let {user, authToken, setRoomUid, setisEnteringRoom} = useContext(AuthContext)

    const [rooms, setRooms] = useState([])

    let getRooms = async () => {
        try {
            let response = await fetch('https://connectchatapp-backend.herokuapp.com/api/rooms', {
            method: 'GET',
            headers:{
                'Content-Type' : 'application/json',
                'Authorization': "Bearer " + String(authToken.access)
                }
            })
            let data = await response.json()
            setRooms(data)
        } catch (err) {
            console.error(err);
        }
    }

    let createRoom = async (e) => {
        e.preventDefault()
        try {
            let response = await fetch('https://connectchatapp-backend.herokuapp.com/api/rooms', {
                method:'POST',
                headers: {
                    'Content-Type':'application/json',
                    'Authorization': 'Bearer ' + String(authToken.access)
                },
                body: JSON.stringify({'name':e.target.id_name.value,'creator':user.name})
            })
            let data = await response.json()
            if (response.status === 200) {
                setRoomUid(data.uid)
                getRooms()
            } else {
                alert(data.message)
            }
        } catch(err) {
            console.error(err)
        } finally {
            e.target.id_name.value = ''
        }
    }

    let handleEnterRoom = (room) => {
        setRoomUid(room.uid)
        setisEnteringRoom(true) 
    }

    let handleOpenCreateRoomForm = () => {
        let rooms_title = document.querySelector(".rooms-title")
        let rooms = document.querySelector(".rooms")
        let chatroom = document.querySelector(".chat-room")
        let empty_room = document.querySelector(".empty-chat-room")
        let rename_chk = document.querySelector("#rename-chk")
        
        if (document.querySelector('#chk').checked) {
            
            if (chatroom) {
                chatroom.style.filter = "brightness(0.7)"
                rename_chk.disabled = true
            } else {
                empty_room.style.filter = "brightness(0.7)"
            }
            rooms_title.style.filter = "brightness(0.7)"
            rooms.style.filter = "brightness(0.7)"
            
        } else {
            rooms_title.style.filter = "brightness(1)"
            rooms.style.filter = "brightness(1)"
            
            if (chatroom) {
                chatroom.style.filter = "brightness(1)"
                rename_chk.disabled = false
            } else {
                empty_room.style.filter = "brightness(1)"
            }
            
        }
    }

    useEffect(() => {
        let func = setInterval(() => getRooms(), 500)
        return () => clearInterval(func)
    })
    return (
        <div className='rooms-container'>
            <div className="rooms-title">
            <h1>Rooms</h1>
            <h1 className='show-room-options'><FontAwesomeIcon icon={faEllipsisV} /></h1>
            </div>
            
            <div className="rooms">
               <ul>
                {(rooms.length >= 1) ? (rooms.map((room, index) => {
                    return (
                        <li key={index} onClick={() => handleEnterRoom(room)} className='room'>
                            <div className="room-title-time">
                                <h3>{room.name}</h3>
                            <p className="room-time">{new Date(room.date_created).toLocaleTimeString(navigator.language, {hour:'2-digit', minute:'2-digit'})}</p>
                            </div>
                            <p className="last-message">{(room.messages.length >= 1) ? (String(room.messages.slice(-1)[0].sender) + ' : ' + String(room.messages.slice(-1)[0].content)) : null}</p>
                        </li>
                    )
                }
                )
                ): (
                        <div className="empty-room">
                            <h1>Syncing rooms...</h1>
                        </div>
                    )}
            </ul> 
            </div>
            
            <input type="checkbox" id="chk" onChange={() => handleOpenCreateRoomForm()} />
            <label htmlFor="chk" className='show-room-form' ><FontAwesomeIcon icon={faPlusCircle} /></label>
            <form onSubmit={(e) => createRoom(e)} className="create-room-form">
                <div className="create-room-form-title">
                    <h1>Create A Room</h1>
                    <label htmlFor="chk" className="hide-create-room"><FontAwesomeIcon icon={faTimesCircle}/></label>
                </div>
                <input type="text" id='id_name' placeholder='Room Name' required />
                <button type="submit">Create</button>
            </form>
        </div>
        
    )
}

export default RoomList
