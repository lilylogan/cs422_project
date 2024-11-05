import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const userID = localStorage.getItem('userID');
  const location = useLocation();

  if (!userID) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;