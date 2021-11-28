import React from 'react'
import DjangoLogo from '../images/django_logo.png'
import ReactLogo from '../images/react.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'

const AboutPage = () => {
    return (
        <div className="about-page">
            <div className="about-web">
            <h1>About This Web App</h1>
            <p>Connect is a chat web app developed by Maurice Yang. It uses a room system where people can be invited by another person into a room. The background image of the chat room is completely customizeable. Used Django as the backend and React JS as the frontend. Spent 1 month on developing the site</p>
            </div>
            <div className="about-tech">
                <h1>Technologies Used</h1>
                <div className="techs">
                    <div className="tech">
                        <img src={DjangoLogo} alt="Django Logo" />
                        <p>Django - Backend</p>
                    </div>
                    <div className="tech">
                        <img src={ReactLogo} alt="React Logo" />
                        <p>React JS - Frontend</p>
                    </div>
                </div>
            </div>
            <div className="about-creator">
                <h1>About Maurice Yang</h1>
                <p>Maurice Yang is an aspiring full-stack developer who specializes in Django and React JS</p>
                <p>Contact him through : </p>
                <ul className="sosmed">
                    <li><a href="//www.instagram.com/maurice_yang/" rel='noreferrer' target='_blank'><FontAwesomeIcon icon={faInstagram}/></a></li>
                    <li><a href="//www.linkedin.com/in/maurice-yang" rel='noreferrer' target='_blank'><FontAwesomeIcon icon={faLinkedin} /> </a></li>
                    <li><a href="//github.com/KirantiLoh" rel='noreferrer' target='_blank'><FontAwesomeIcon icon={faGithub}/></a></li>
                </ul>
            </div>
        </div>
    )
}

export default AboutPage
