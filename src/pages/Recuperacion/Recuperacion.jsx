import { useState } from "react";

function Recuperacion() {
    const [correo, setCorreo] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [cargando, setCargando] = useState(false);

    async function handleRecuperar() {
        if (!correo) return;

        setCargando(true);
        setMensaje("");

        try {
            const response = await fetch("http://localhost:3000/usuarios/recover", {
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

        } catch (err) {
            console.log(err);
            setMensaje("Error de conexión con el servidor");
        } finally {
            setCargando(false);
        }
    }

    return (
        <div>
            <label htmlFor="email">Ingresa tu correo</label>
            <input
                type="email"
                id="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
            />
            <br />
            <button onClick={handleRecuperar} disabled={cargando}>
                {cargando ? "Enviando..." : "Recuperar"}
            </button>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
}

export default Recuperacion;