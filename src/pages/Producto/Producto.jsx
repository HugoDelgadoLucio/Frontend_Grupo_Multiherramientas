import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Producto() {

    const { id } = useParams();

    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const obtenerProducto = async () => {

            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `http://localhost:3000/productos/${id}`
                );

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(
                        errorData.mensaje ||
                        "Error al obtener producto"
                    );
                }

                const data = await response.json();
                console.log(data.data);
                setProducto(data.data);

            }
            catch (err) {
                setError(err.message);
            }
            finally {
                setLoading(false);
            }
        };

        obtenerProducto();
    }, [id]);

    if (loading) {
        return <p>Cargando producto...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!producto) {
        return <p>Producto no encontrado.</p>;
    }

    return (
        <div>
            <div>
                {
                    producto.imagenes?.length > 0 ? (
                        producto.imagenes.map((imagen, index) => (
                            <img
                                key={index}
                                src={imagen.url}
                                alt={`${producto.nombre}-${index}`}
                                width="250"
                            />
                        ))
                    ) : (
                        <small>No hay imágenes disponibles</small>
                    )
                }
            </div>

            <h1>{producto.nombre}</h1>
            <p><strong>Modelo:</strong> {producto.modelo}</p>
            <p><strong>Descripción:</strong> {producto.descripcion}</p>
            <p><strong>Precio:</strong> ${producto.precio}</p>
            <p><strong>Existencia:</strong> {producto.existencia}</p>
            <p><strong>Tipo de corriente:</strong> {producto.tipo_corriente}</p>
        </div>
    );
}

export default Producto;