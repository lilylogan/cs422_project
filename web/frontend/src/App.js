import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Banner from "./components/banner"
import NavBar from "./components/navbar"
import Home from "./components/home"
import Liked from "./components/liked"
import MealPlan from "./components/mealPlan"
import Settings from './components/settings'



function App() {
  // This is the container for all the pages
  return (
    <Router>
      <div>
        <Banner />
        <NavBar />
        <Routes>
          {/* change this to the login page later */}
          <Route path="/" element={<Home />} />
          <Route path="/liked" element={<Liked />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/mealPlan" element={<MealPlan />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
