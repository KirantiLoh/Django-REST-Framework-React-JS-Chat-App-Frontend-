import React from 'react'
import RoomList from '../component/RoomList'
import ChatRoom from './ChatRoom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

const HomePage = () => {
    
    let {roomUid} = useContext(AuthContext)

    return (
        <div className="container">
            <div className="home-page">
            <RoomList/>
            {roomUid ? <ChatRoom uid={roomUid}/> : (
                <div className="empty-chat-room">
                    <h1><FontAwesomeIcon icon={faEnvelope} /></h1>
                    <p>Start Messaging someone :)</p>
                </div>
            )}
        </div>
        </div>
        
    )
}

export default HomePage
