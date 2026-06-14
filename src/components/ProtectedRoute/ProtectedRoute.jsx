import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const rol = localStorage.getItem("rol");

    if (rol !== "admin") {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;