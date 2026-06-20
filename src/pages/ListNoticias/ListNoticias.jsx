import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./ListNoticias.module.css";

function ListNoticias() {
    const navigate = useNavigate();

    const [noticias, setNoticias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        const fetchNoticias = async () => {
            try {
                setLoading(true);
                setError("");

                //const response = await fetch( "http://localhost:3000/noticias/publicadas",
                const response = await fetch("https://backend-grupo-multiherramientas.onrender.com/noticias/publicadas",
                    { signal: controller.signal }
                );

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

    return (
        <div className={styles.noticiasBase}>
            <h2 className={styles.titulo}>Catálogo de Noticias</h2>

            {loading && <p>Cargando noticias...</p>}
            {error && <p>Error: {error}</p>}

            {!loading && !error && (
                <div className={styles.noticiasGrid}>
                    {noticias.length === 0 ? (
                        <p>No se encontraron noticias.</p>
                    ) : (
                        noticias.map(noticia => (
                            <div
                                className={styles.NoticiaCard}
                                key={noticia.id}
                                onClick={() => navigate(`/noticias/${noticia.id}`)}
                            >
                                <h4>{noticia.titulo}</h4>
                                <p>{noticia.contenido}</p>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default ListNoticias;