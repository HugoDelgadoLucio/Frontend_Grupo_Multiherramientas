import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Producto.module.css";
import { FiTool } from "react-icons/fi"; 

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

                //const response = await fetch( `http://localhost:3000/productos/${id}` );
                const response = await fetch( `https://backend-grupo-multiherramientas.onrender.com/productos/${id}` );

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
    return <p className={styles.estadoMsg}>Cargando producto...</p>;
}

if (error) {
    return <p className={styles.estadoMsgError}>Error: {error}</p>;
}

if (!producto) {
    return <p className={styles.estadoMsg}>Producto no encontrado.</p>;
}

return (
        <div className={styles.pageWrapper}>
    <div className={styles.detalleBase}>
        <div className={styles.layout}>

            <div className={styles.galeria}>
                {producto.imagenes?.length > 0 ? (
                    <div className={styles.galeriaGrid}>
                        {producto.imagenes.map((imagen, index) => (
                            <img
                                key={index}
                                src={imagen.url}
                                alt={`${producto.nombre}-${index}`}
                                className={styles.imagen}
                            />
                        ))}
                    </div>
                ) : (
                    <div className={styles.sinImagen}>
                        <FiTool className={styles.sinImagenIcono} />
                        <small>No hay imágenes disponibles</small>
                    </div>
                )}
            </div>

            <div className={styles.info}>
                {producto.categoria && (
                    <span className={styles.badgeCategoria}>{producto.categoria}</span>
                )}

                <h1 className={styles.nombre}>{producto.nombre}</h1>
                <p className={styles.modelo}>Modelo: {producto.modelo}</p>

                <p className={styles.descripcion}>{producto.descripcion}</p>

                <div className={styles.precioRow}>
                    <div className={styles.precioBox}>
                        <span className={styles.precioLabel}>Precio</span>
                        <span className={styles.precio}>${producto.precio}</span>
                    </div>
                    <span className={styles.stockBadge}>
                        En stock: {producto.existencia} uds
                    </span>
                </div>

                <div className={styles.detallesGrid}>
                    <div className={styles.detalleItem}>
                        <span className={styles.detalleLabel}>Existencia</span>
                        <span className={styles.detalleValor}>{producto.existencia} unidades</span>
                    </div>
                    <div className={styles.detalleItem}>
                        <span className={styles.detalleLabel}>Tipo de corriente</span>
                        <span className={styles.detalleValor}>{producto.tipo_corriente}</span>
                    </div>
                </div>
            </div>

        </div>
    </div>
    </div>
    
);
}

export default Producto;