import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

function ProtectedRoute({ children }) {

    const { usuario } = useAuth();

    if (usuario.rol !== "admin") {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;