import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Guards nested routes behind authentication, and optionally a role list.
 * Usage: <PrivateRoute allowedRoles={['admin']} />
 */
const PrivateRoute = ({ allowedRoles }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  if (isLoading) return <div className="page-loader">Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
