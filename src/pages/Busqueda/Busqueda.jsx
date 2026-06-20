import { useLocation, Link } from "react-router-dom";
import styles from "./Busqueda.module.css"

function Busqueda() {
    const { state } = useLocation();
    const resultados = state?.resultados ?? [];

    return (
    <div className={styles.ProductBase}>
        <h2>Resultados de búsqueda</h2>

        {resultados.length === 0 ? (
            <p>No se encontraron productos.</p>
        ) : (
            <div className={styles.ProductGrid}>
                {resultados.map(producto => (
                    <Link to={`/productos/${producto.id}`} key={producto.id} className={styles.cardLink}>
                        <div className={styles.ProductCard}>
                            <h4>{producto.nombre}</h4>
                            <p>{producto.modelo}</p>
                            <p className={styles.priceCard}><strong>${producto.precio}</strong></p>
                        </div>
                    </Link>
                ))}
            </div>
        )}
    </div>
);
}

export default Busqueda;