import { useState } from "react";
import Swal from "sweetalert2";
import LavaBackground from "./LavaBackground";
import styles from "./Registro.module.css";

function Registro() {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [contra, setContra] = useState("");
    const [contConf, setContConf] = useState("");

    async function enviar() {
        if (contra !== contConf) {
            Swal.fire({ icon: "error", title: "Error", text: "Las contraseñas no coinciden" });
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/usuarios", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nombre,
                    email,
                    password_hash: contra,
                    rol: "solo_lectura"
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.mensaje || "Error al registrar usuario");
            }

            await response.json();

            Swal.fire({ icon: "success", title: "¡Registro exitoso!", text: "Tu cuenta ha sido creada correctamente" });

            setNombre("");
            setEmail("");
            setContra("");
            setContConf("");

        } catch (error) {
            Swal.fire({ icon: "error", title: "Error", text: error.message });
        }
    }

    return (
        <div className={styles.register}>
                <LavaBackground />

            <div className={styles.registerLeft}>
                <div className={styles.registerBox}>
                    <h3>Registro</h3>

                    <div className={styles.campo}>
                        <label htmlFor="nombre">Nombre</label>
                        <input id="nombre" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </div>

                    <div className={styles.campo}>
                        <label htmlFor="email">Correo</label>
                        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className={styles.campo}>
                        <label htmlFor="contra">Contraseña</label>
                        <input id="contra" type="password" value={contra} onChange={(e) => setContra(e.target.value)} />
                    </div>

                    <div className={styles.campo}>
                        <label htmlFor="confirm">Confirmar contraseña</label>
                        <input id="confirm" type="password" value={contConf} onChange={(e) => setContConf(e.target.value)} />
                    </div>

                    <button className={styles.btn} onClick={enviar}>Registrar</button>
                </div>
            </div>

            <div className={styles.registerRight}>
<div className={styles.rightContent}>
    <p className={styles.tagline}>Bienvenido a <br/><span>Grupo Multiherramientas</span></p>
    <p className={styles.subtagline}>Crea tu <span>cuenta</span> y accede a nuestro catálogo</p>

        <img 
            src="/GirlMultiHerramientas.png" 
            alt="Img descripción" 
            className={styles.imgDerecha} 
        />
    </div>            </div>

        </div>
    );
}

export default Registro;