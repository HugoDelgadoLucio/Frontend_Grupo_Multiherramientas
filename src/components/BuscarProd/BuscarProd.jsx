import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import styles from "./BuscarProd.module.css";

function BuscarProd() {
    const [cargando, setCargando] = useState(false);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    const buscar = async () => {
        const query = inputRef.current.value.trim();
        if (!query) return;

        setCargando(true);

        try {
            const response = await fetch("http://localhost:3000/productos/buscar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query })
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.mensaje || "Error al buscar");

            navigate("/busqueda", { state: { resultados: data.data } });

        } catch (error) {
            console.error(error.message);
        } finally {
            setCargando(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") buscar();
    };

    return (
        <div className={styles.buscador}>
            <input
                ref={inputRef}
                className={styles.input}
                placeholder="Buscar por modelo, descripción o categoría."
                onKeyDown={handleKeyDown}
            />
            <button onClick={buscar}>
                <FiSearch />
                {cargando ? "Buscando..." : "Buscar"}
            </button>
        </div>
    );
}

export default BuscarProd;