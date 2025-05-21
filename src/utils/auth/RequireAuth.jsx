import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function RequireAuth() {
  const { token } = useAuth();
  console.log(token);
  return token ? <Outlet /> : <Navigate to="/login" />;
}
