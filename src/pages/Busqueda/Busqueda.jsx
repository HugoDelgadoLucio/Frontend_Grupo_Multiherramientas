import { useLocation, Link } from "react-router-dom";
import styles from "./Busqueda.module.css"

function Busqueda() {
    const { state } = useLocation();
    const resultados = state?.resultados ?? [];

    return (
        <div>
            <h2>Resultados de búsqueda</h2>

            {resultados.length === 0 && <p>No se encontraron productos.</p>}

            {resultados.map(producto => (
                <Link to={`/productos/${producto.id}`} key={producto.id}>
                    <div>
                        <h4 className={styles.letra}>{producto.nombre}</h4>
                        <p className={styles.letra}>{producto.modelo}</p>
                        <p className={styles.letra}>${producto.precio}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default Busqueda;