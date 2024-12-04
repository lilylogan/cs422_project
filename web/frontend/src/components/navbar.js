/* 
navbar.js
Description: Component for displaying a navigation bar that hosts options for page selection that reroutes the user when an option is clicked.
Date: October 20th, 2024
Inital Author: Will Marceau
Modified By: Ellison Largent
*/
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <nav className="navBar">
      <div className="hamburger-menu" onClick={toggleMenu}>
        <div className={`hamburger-icon ${isMenuOpen ? 'open' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      
      <ul className={`navList ${isMenuOpen ? 'mobile-menu-open' : ''}`}>
        <li> 
          <NavLink 
            className={({ isActive }) => isActive ? 'active' : 'navElement'} 
            to="settings"
            onClick={toggleMenu}
          >
            Settings
          </NavLink> 
        </li>
        <li className="filler"> ~ </li>
        <li> 
          <NavLink 
            className={({ isActive }) => isActive ? 'active' : 'navElement'} 
            to="liked"
            onClick={toggleMenu}
          >
            Liked
          </NavLink> 
        </li>
        <li className="filler"> ~ </li>
        <li> 
          <NavLink 
            className={({ isActive }) => isActive ? 'active' : 'navElement'} 
            to="home"
            onClick={toggleMenu}
          >
            Home
          </NavLink> 
        </li>
        <li className="filler"> ~ </li>
        <li> 
          <NavLink 
            className={({ isActive }) => isActive ? 'active' : 'navElement'} 
            to="mealPlanner"
            onClick={toggleMenu}
          >
            Meal Planner & Shopping List
          </NavLink> 
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;