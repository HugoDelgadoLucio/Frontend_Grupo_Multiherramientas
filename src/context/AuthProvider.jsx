import { useState } from "react";
import AuthContext from "./AuthContext";
import PropTypes from "prop-types";

export function AuthProvider({ children }) {

    const [usuario, setUsuario] = useState({
        id: localStorage.getItem("id") || "",
        email: localStorage.getItem("email") || "",
        rol: localStorage.getItem("rol") || "",
        token: localStorage.getItem("token") || ""
    });

    const login = (data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("rol", data.data.rol);
        localStorage.setItem("email", data.data.email);
        localStorage.setItem("id", data.data.id);

        setUsuario({
            id: data.data.id,
            email: data.data.email,
            rol: data.data.rol,
            token: data.token
        });
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("rol");
        localStorage.removeItem("email");
        localStorage.removeItem("id");

        setUsuario({ id: "", email: "", rol: "", token: "" });
    };

    return (
        <AuthContext.Provider value={{ usuario, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default AuthProvider;