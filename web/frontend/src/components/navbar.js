import { NavLink } from 'react-router-dom'

function NavBar() {
    return (
        <nav className="navBar">
            <ul className="navList">
                <li>
                    <NavLink className={({ isActive }) => isActive ? 'active' : 'navElement'} to="settings">Settings</NavLink>
                </li>
                <li>
                    ~
                </li>
                <li>
                    <NavLink className={({ isActive }) => isActive ? 'active' : 'navElement'} to="liked">Liked</NavLink>
                </li>
                <li>
                    ~
                </li>
                <li>
                    <NavLink className={({ isActive }) => isActive ? 'active' : 'navElement'} to="home">Home</NavLink>
                </li>
                <li>
                    ~
                </li>
                <li>
                    <NavLink className={({ isActive }) => isActive ? 'active' : 'navElement'} to="mealPlan">Meal Planner & Shopping List</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;