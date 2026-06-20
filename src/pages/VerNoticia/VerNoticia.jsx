import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./VerNoticia.module.css"; 
import { NavLink } from "react-router-dom";


function VerNoticia() {

    const { id } = useParams();

    const [noticia, setNoticia] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const obtenerNoticia = async () => {

            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `http://localhost:3000/noticias/${id}`
                );

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(
                        errorData.mensaje ||
                        "Error al obtener noticia"
                    );
                }

                const data = await response.json();
                console.log(data.data);
                setNoticia(data.data);

            }
            catch (err) {
                setError(err.message);
            }
            finally {
                setLoading(false);
            }
        };

        obtenerNoticia();
    }, [id]);

    if (loading) {
    return <p className={styles.estadoMsg}>Cargando noticia...</p>;
}

if (error) {
    return <p className={styles.estadoMsgError}>Error: {error}</p>;
}

if (!noticia) {
    return <p className={styles.estadoMsg}>Noticia no encontrada.</p>;
}

return (
    <div className={styles.pageWrapper}>
        <article className={styles.articulo}>

            <div className={styles.portadaWrap}>
                {noticia.imagen_url ? (
                    <img
                        src={noticia.imagen_url}
                        alt={noticia.titulo}
                        className={styles.portada}
                    />
                ) : (
                    <div className={styles.sinImagen}>
                        <FiImage className={styles.sinImagenIcono} />
                        <small>No hay imagen disponible</small>
                    </div>
                )}
            </div>

            <div className={styles.contenidoWrap}>
                <span className={noticia.publicada ? styles.badgePublicada : styles.badgeBorrador}>
                    {noticia.publicada ? "Publicada" : "No publicada"}
                </span>

                <h1 className={styles.titulo}>{noticia.titulo}</h1>

                <p className={styles.cuerpo}>{noticia.contenido}</p>
            </div>

                 <NavLink to="/noticias" className={styles.volverLink}>
        ← Volver a noticias
    </NavLink>

        </article>
    </div>
);
}

export default VerNoticia;