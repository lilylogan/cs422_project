import React from 'react'

import {Outlet} from 'react-router-dom'

import Banner from "./banner"
import NavBar from "./navbar"

function MainApp() {
    return (
        <>
            <Banner />
            <NavBar />
            <Outlet/>
        </>
    )
}

export default MainApp;

