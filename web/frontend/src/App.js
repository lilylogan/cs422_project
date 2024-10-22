import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import Home from "./components/home"
import Liked from "./components/liked"
import MealPlan from "./components/mealPlan"
import Settings from './components/settings'
import SignUp from './components/signup'
import Login from './components/login'
import MainApp from './components/mainapp';



function App() {
  // This is the container for all the pages
  return (
    <Router>
      <Routes>
        {/* may need some changing around */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/main" element={<MainApp />}>
          <Route index element={<Navigate to="/login" />} />
          <Route path="home" element={<Home />} />
          <Route path="liked" element={<Liked />} />
          <Route path="settings" element={<Settings />} />
          <Route path="mealPlan" element={<MealPlan />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
