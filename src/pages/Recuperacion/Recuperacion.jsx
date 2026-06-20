import { useState } from "react";
import styles from "./Recuperacion.module.css";
import { NavLink } from "react-router-dom"; 
import Swal from "sweetalert2";

function Recuperacion() {
    const [correo, setCorreo] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [cargando, setCargando] = useState(false);

    async function handleRecuperar() {
        if (!correo) return;

        if(!(correo.includes("@"))){
            Swal.fire({ icon: "error", title: "Error", text: "La dirección de correo no es válida" });
            setCorreo(" ");
            return;
        }

        setCargando(true);
        setMensaje("Esto puede tardar un tiempo, sea paciente.");

        try {
            //const response = await fetch("http://localhost:3000/usuarios/recover", {
            const response = await fetch("https://backend-grupo-multiherramientas.onrender.com/usuarios/recover", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ correo })
            });

            const data = await response.json();

            if (!response.ok) {
                setMensaje(data.mensaje || "Ocurrió un error");
                return;
            }
            setMensaje("¡Correo enviado! Revisa tu bandeja de entrada.");
            Swal.fire({ icon: "success", title: "Correo enviado", text: mensaje });

        } catch (err) {
            console.log(err);
            setMensaje("Error de conexión con el servidor");
        } finally {
            setCargando(false);
        }
    }

       return (
    <div className={styles.recuperarWrapper}>
        <div className={styles.blob1}></div>
        <div className={styles.blob2}></div>
        <div className={styles.blob3}></div>
        <div className={styles.blob4}></div>
        <div className={styles.blob5}></div>
        <div className={styles.blob6}></div>
        <div className={styles.blob7}></div>
        <div className={styles.blob8}></div>

        <div className={styles.recuperarBox}>

            <img
                src="PasswordWonder.png"
                alt="Recuperar contraseña"
                className={styles.recuperarImagen}
            />

            <div className={styles.recuperarForm}>

                <label
                    htmlFor="email"
                    className={styles.recuperarLabel}
                >
                    Ingresa tu correo
                </label>
                <p className={styles.recuperarSubtexto}>
                    Te enviaremos un enlace para restablecer tu contraseña
                </p>
                <input
                    type="email"
                    id="email"
                    className={styles.recuperarInput}
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    placeholder="correo@ejemplo.com"
                />

                <button
                    onClick={handleRecuperar}
                    disabled={cargando}
                    className={styles.recuperarBtn}
                >
                    {cargando ? "Enviando..." : "Recuperar"}
                </button>
            
                <NavLink to="/login" className={styles.recuperarVolver}>
                    ← Volver a iniciar sesión
                </NavLink>

                {mensaje && (
                    <p className={styles.recuperarMensaje}>
                        {mensaje}
                    </p>
                )}

            </div>

        </div>
    </div>
);
}

export default Recuperacion;