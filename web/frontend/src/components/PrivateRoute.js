/* 
PrivateRoute.js
Description: Component for ensuring authorized access to protected routes. Navigates users to login if not authenticated 
while attempting to access a protected route.
Date: October 21st, 2024
Inital Author: Ellison Largent
Modified By: 
*/
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; 
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivateRoute;