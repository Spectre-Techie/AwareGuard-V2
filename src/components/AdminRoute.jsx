import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) return <Navigate to="/signin" replace />;

  if (user.role !== 'admin') {
    return (
      <div className="flex items-center justify-center h-[60vh] text-center">
        <div>
          <h1 className="text-4xl font-bold text-red-600">403</h1>
          <p className="text-gray-600 mt-2">Access denied. Admin privileges required.</p>
        </div>
      </div>
    );
  }

  return children;
};

export default AdminRoute;
