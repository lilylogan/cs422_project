import { NavLink } from 'react-router-dom'

function NavBar() {
    return (
        <nav className="navBar">
            <ul className="navList">
                <li>
                    <NavLink className={({ isActive }) => isActive ? 'active' : 'navElement'} to="/settings">Settings</NavLink>
                </li>
                <li className="filler">
                    ~
                </li>
                <li>
                    <NavLink className={({ isActive }) => isActive ? 'active' : 'navElement'} to="/liked">Liked</NavLink>
                </li>
                <li className="filler">
                    ~
                </li>
                <li>
                    <NavLink className={({ isActive }) => isActive ? 'active' : 'navElement'} to="/">Home</NavLink>
                </li>
                <li className="filler">
                    ~
                </li>
                <li>
                    <NavLink className={({ isActive }) => isActive ? 'active' : 'navElement'} to="/mealPlan">Meal Planner & Shopping List</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;