import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string[];
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole = []
}) => {
  const {
    currentUser,
    isAuthenticated,
    loading
  } = useAuth();
  const location = useLocation();
  if (loading) {
    return <div className="flex items-center justify-center h-screen">
        Loading...
      </div>;
  }
  //if (!isAuthenticated) {
    //return <Navigate to="/login" state={{
      //from: location
    //}} replace />;
  //}
  // Check if user has required role (if specified)
  if (requiredRole.length > 0 && currentUser && !requiredRole.includes(currentUser.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <>{children}</>;
};
export default ProtectedRoute;