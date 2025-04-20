import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../App";

/**
 * Wrap any route you want to protect.
 * If not logged in, redirects to /login.
 */
const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const location = useLocation();

  if (!isLoggedIn) {
    // Redirect to login, but keep intended destination
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
