import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import styles from "./CambioContra.module.css";
import FloatingBlobs from "../../components/FloatingBlobs/FloatingBlobs";

function CambioContra() {
    const [contra, setContra] = useState("");
    const [contConf, setContConf] = useState("");
    const [cargando, setCargando] = useState(false);

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    async function handleCambiar() {
        if (!contra || !contConf) {
            Swal.fire({ icon: "error", title: "Campos vacíos", text: "Los campos no pueden estar vacios" });
            return;
        }

        if (contra !== contConf) {
            Swal.fire({ icon: "error", title: "Error", text: "Las contraseñas no coinciden" });
            return;
        }

        if (contra.length < 8) {
            Swal.fire({ icon: "error", title: "Error", text: "La contraseña debe tener al menos 8 caracteres" });
            return;
        }

        if (!token) {
            Swal.fire({ icon: "error", title: "Enlace inválido", text: "Accede a esta página desde el enlace que te enviamos al correo" });
            return;
        }

        setCargando(true);

        try {
            const response = await fetch("http://localhost:3000/usuarios/changePassword", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, contra })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.mensaje || "Error al cambiar la contraseña");
            }

            Swal.fire({ 
                icon: "success", 
                title: "¡Listo!", 
                text: "Tu contraseña fue cambiada correctamente" 
            }).then(() => {
                window.location.href = "/login"; // redirige al login después de confirmar
            });

        } catch (error) {
            Swal.fire({ icon: "error", title: "Error", text: error.message });
        } finally {
            setCargando(false);
        }
    }

    return (
    <div className={styles.cambioWrapper}>

        <FloatingBlobs />

        <div className={styles.cambioCard}>

            <h3 className={styles.titulo}>Cambiar contraseña</h3>

            <div className={styles.campo}>
                <label htmlFor="password">Nueva contraseña</label>
                <input
                    id="password"
                    type="password"
                    className={styles.input}
                    value={contra}
                    onChange={(e) => setContra(e.target.value)}
                />
            </div>

            <div className={styles.campo}>
                <label htmlFor="passwordConf">Confirmar contraseña</label>
                <input
                    id="passwordConf"
                    type="password"
                    className={styles.input}
                    value={contConf}
                    onChange={(e) => setContConf(e.target.value)}
                />
            </div>

            <button onClick={handleCambiar} disabled={cargando} className={styles.btn}>
                {cargando ? "Guardando..." : "Cambiar contraseña"}
            </button>

        </div>
    </div>
);
}

export default CambioContra;