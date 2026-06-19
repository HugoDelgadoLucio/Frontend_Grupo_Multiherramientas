import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import styles from "./EliminarNoti.module.css";

function EliminarNoti() {

    const [noticias, setNoticias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        const fetchNoticias = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch("http://localhost:3000/noticias", {
                    signal: controller.signal
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.mensaje || "Error al obtener noticias");
                }

                const data = await response.json();
                setNoticias(data.data);
            } catch (err) {
                if (err.name !== "AbortError") {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchNoticias();
        return () => controller.abort();
    }, []);

    const eliminar = async (id) => {

        const confirmar = await Swal.fire({
            title: "¿Eliminar noticia?",
            text: `Id: ${id}`,
            icon: "warning",
            showCancelButton: true
        });

        if (!confirmar.isConfirmed) return;

        try {

            const response = await fetch("http://localhost:3000/noticias/eliminarNoticia", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.mensaje);

            await Swal.fire({ icon: "success", title: "Noticia eliminada" });

            setNoticias(prev => prev.filter(noticia => noticia.id !== id));

        } catch (error) {
            Swal.fire({ icon: "error", title: error.message });
        }
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    return (
    <div>
        <h2 className={styles.titulo}>Eliminar Noticia</h2>

        {noticias.map(noticia => (
            <div className={styles.NoticiaCard} key={noticia.id}>
                <h4>{noticia.titulo}</h4>
                <div className={styles.cardFooter}>
                    <span className={styles.idTag}>ID: {noticia.id}</span>
                    <button className={styles.btnEliminar} onClick={() => eliminar(noticia.id)}>
                        Eliminar
                    </button>
                </div>
            </div>
        ))}
    </div>
);
}

export default EliminarNoti;