import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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

                const response = await fetch(
                    "http://localhost:3000/noticias/publicadas",
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
        <div>
            <h2>Catálogo de Noticias</h2>

            {loading && <p>Cargando noticias...</p>}
            {error && <p>Error: {error}</p>}

            {!loading && !error && (
                <div>
                    {noticias.length === 0 ? (
                        <p>No se encontraron noticias.</p>
                    ) : (
                        noticias.map(noticia => (
                            <div key={noticia.id} onClick={() => navigate(`/noticias/${noticia.id}`)}>
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