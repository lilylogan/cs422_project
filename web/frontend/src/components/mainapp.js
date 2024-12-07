/* 
mainapp.js
Description: Component for the main app pages to display the banner, navbar and an outlet for page specific content to be displayed.
Date: October 20th, 2024
Inital Author: Will Marceau
Modified By: 
*/
import React from 'react'

import {Outlet} from 'react-router-dom'

import Banner from "./banner"
import NavBar from "./navbar"

function MainApp() {
    // this function starts the main portion of the app
    return (
        <>
            <Banner />
            <NavBar />
            <Outlet/>
        </>
    )
}

export default MainApp;

