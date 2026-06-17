import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";

function CambiarContra() {
    const [password, setPassword] = useState("");
    const [passwordConf, setPasswordConf] = useState("");
    const [cargando, setCargando] = useState(false);

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token"); // lee el ?token=... de la URL

    async function handleCambiar() {
        if (!password || !passwordConf) {
            Swal.fire({ icon: "warning", title: "Campos vacíos", text: "Completa ambos campos" });
            return;
        }

        if (password !== passwordConf) {
            Swal.fire({ icon: "error", title: "Error", text: "Las contraseñas no coinciden" });
            return;
        }

        if (password.length < 8) {
            Swal.fire({ icon: "error", title: "Error", text: "La contraseña debe tener al menos 8 caracteres" });
            return;
        }

        if (!token) {
            Swal.fire({ icon: "error", title: "Token inválido", text: "El enlace de recuperación no es válido o ya expiró" });
            return;
        }

        setCargando(true);

        try {
            const response = await fetch("http://localhost:3000/usuarios/changePassword", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password })  // token del link, password nueva
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.mensaje || "Error al cambiar la contraseña");
            }

            Swal.fire({ icon: "success", title: "¡Listo!", text: "Tu contraseña fue cambiada correctamente" });

            setPassword("");
            setPasswordConf("");

        } catch (error) {
            Swal.fire({ icon: "error", title: "Error", text: error.message });
        } finally {
            setCargando(false);
        }
    }

    return (
        <div>
            <h3>Cambiar contraseña</h3>

            <label htmlFor="password">Nueva contraseña</label>
            <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <label htmlFor="passwordConf">Confirmar contraseña</label>
            <input
                id="passwordConf"
                type="password"
                value={passwordConf}
                onChange={(e) => setPasswordConf(e.target.value)}
            />

            <button onClick={handleCambiar} disabled={cargando}>
                {cargando ? "Guardando..." : "Cambiar contraseña"}
            </button>
        </div>
    );
}

export default CambiarContra;