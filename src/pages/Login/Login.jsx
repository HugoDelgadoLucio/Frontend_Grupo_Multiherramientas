import { useState } from "react";
import Swal from "sweetalert2";

function Login() {

    const [correo, setCorreo] = useState("");
    const [contra, setContra] = useState("");

    async function enviar() {
        try {
            const response = await fetch("http://localhost:3000/usuarios/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    correo,       // el backend espera "correo"
                    password: contra  // el backend espera "password"
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.mensaje || "Credenciales incorrectas");
            }

            const data = await response.json();

            // Guardar en localStorage lo que devuelve el backend
            localStorage.setItem("token", data.token);
            localStorage.setItem("rol", data.data.rol);
            localStorage.setItem("email", data.data.email);
            localStorage.setItem("id", data.data.id);

            Swal.fire({
                icon: "success",
                title: `¡Bienvenido!`,
                text: data.mensaje
            });

            // Aquí navegas según el rol:
            // if (data.data.rol === "superadmin" || data.data.rol === "admin") navigate("/admin");
            // else navigate("/");

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error al iniciar sesión",
                text: error.message
            });
        }
    }

    return (
        <div>
            <h3>Login</h3>
            <label htmlFor="correo">Correo</label>
            <input id="correo" type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} />
            <br />
            <label htmlFor="contra">Contraseña</label>
            <input id="contra" type="password" value={contra} onChange={(e) => setContra(e.target.value)} />
            <br />
            <button onClick={enviar}>Iniciar sesión</button>
        </div>
    );
}

export default Login;