import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./components/home";
import Liked from "./components/liked";
import MealPlanner from "./components/mealPlanner/index";
import Settings from './components/settings';
import SignUp from './components/signup';
import Login from './components/login';
import MainApp from './components/mainapp';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/main"
            element={
              <PrivateRoute>
                <MainApp />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="home" />} />
            <Route path="home" element={<Home />} />
            <Route path="liked" element={<Liked />} />
            <Route path="settings" element={<Settings />} />
            <Route path="mealPlanner" element={<MealPlanner />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;