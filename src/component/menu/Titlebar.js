// Designed by Ericarthurc
// https://github.com/Ericarthurc
// October 24, 2019
// Wildwood Tech

import React, { useState } from 'react';
import './Titlebar.css'

import { useHistory } from "react-router-dom";

import { FaArrowLeft, FaArrowRight, } from 'react-icons/fa';
import { HiRefresh } from 'react-icons/hi';
import logo from "./images/logo.png";
import {Card} from "react-bootstrap";

const ipcRenderer = window.require('electron').ipcRenderer

const Titlebar = () => {

    let history = useHistory();

    const [isActive, setIsActive] = useState()
    const [isMaximized, setIsMaximized] = useState()
    const [path, setPath] = useState()


    history.listen((location, action) => {
        setPath(location.pathname + location.search + location.hash)
    })


    ipcRenderer.on('focused', () => {
        setIsActive(true)
    })

    ipcRenderer.on('blurred', () => {
        setIsActive(false)
    })

    ipcRenderer.on('maximized', () => {
        setIsMaximized(true)
    })

    ipcRenderer.on('unmaximized', () => {
        setIsMaximized(false)
    })

    const minimizeHandler = () => {
        ipcRenderer.invoke('minimize-event')
    }

    const maximizeHandler = () => {
        ipcRenderer.invoke('maximize-event')
    }

    const unmaximizeHandler = () => {
        ipcRenderer.invoke('unmaximize-event')
    }

    const closeHandler = () => {
        ipcRenderer.invoke('close-event')
    }

    return (
        <div id="title-bar">
            <div id="container">
                <nav>
                    <div id="icon">
                        <img className="challenge-image" src={logo}  alt="icon"/>
                    </div>
                    <div id="titleShown">
                        LeagueChallenger
                    </div>
                    <div id="menu-navigation-buttons">
                            <div id="previous">
                                <span onClick={() => history.goBack()}><FaArrowLeft/></span>
                            </div>
                            <div id="forward">
                                <span onClick={() => history.goForward()}><FaArrowRight/></span>
                            </div>
                            <div id="refresh">
                                <span onClick={() => window.location.reload()}><HiRefresh/></span>
                            </div>
                    </div>
                    <div id="menu-navigation-path">
                        <span>{path}</span>
                    </div>
                    <div id="menu-control-buttons">
                        <div id="minimize" onClick={minimizeHandler}>
                            <span>-</span>
                        </div>
                        {isMaximized ?
                            <div id="maximize" onClick={unmaximizeHandler}>
                                <span>+</span>
                            </div>
                            :
                            <div id="maximize" onClick={maximizeHandler}>
                                <span>+</span>
                            </div>
                        }
                        <div id="close" onClick={closeHandler}>
                            <span>&times;</span>
                        </div>
                    </div>
                </nav>
            </div>
        </div >
    )
}

export default Titlebar