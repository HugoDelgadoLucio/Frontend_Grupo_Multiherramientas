import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CatalogoNotis.module.css";

function CatalogoNotis() {
    const navigate = useNavigate();

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

    if (loading) return <p>Cargando noticias...</p>;
    if (error) return <p>{error}</p>;

    return (
    <div>
        <h2 className={styles.titulo}>Catálogo de Noticias</h2>

        {noticias.map(noticia => (
            <div
                className={styles.NoticiaCard}
                key={noticia.id}
                onClick={() => navigate(`/noticias/${noticia.id}`)}
            >
                <h4>{noticia.titulo}</h4>
                <p>{noticia.contenido}</p>
                <div className={styles.cardFooter}>
                    <span
                        className={
                            noticia.publicada
                                ? styles.estadoPublicada
                                : styles.estadoBorrador
                        }
                    >
                        {noticia.publicada ? "Publicada" : "No publicada"}
                    </span>
                    <span className={styles.idTag}>ID: {noticia.id}</span>
                </div>
            </div>
        ))}
    </div>
);
}

export default CatalogoNotis;