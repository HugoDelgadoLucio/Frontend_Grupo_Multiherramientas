import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

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
        return <p>Cargando noticia...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!noticia) {
        return <p>Noticia no encontrada.</p>;
    }

    return (
        <div>
            <div>
                {
                    noticia.imagen_url ? (
                        <img
                            src={noticia.imagen_url}
                            alt={noticia.titulo}
                            width="250"
                        />
                    ) : (
                        <small>No hay imagen disponible</small>
                    )
                }
            </div>

            <h1>{noticia.titulo}</h1>
            <p>{noticia.contenido}</p>
            <p><strong>Publicada:</strong> {noticia.publicada ? "Sí" : "No"}</p>
        </div>
    );
}

export default VerNoticia;