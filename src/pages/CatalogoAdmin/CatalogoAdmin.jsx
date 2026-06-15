import useProductos from "../../hooks/useProductos";
import styles from "./CatalogoAdmin.module.css";

function CatalogoAdmin() {

    const { productos, loading, error } = useProductos();

    if (loading) return <p className={styles.estado}>Cargando productos...</p>;
    if (error) return <p className={styles.estado}>{error}</p>;

    return (
        <div>
            <h2 className={styles.titulo}>Catálogo Administrativo</h2>

            {productos.map(producto => (
                <div className={styles.ProductCard} key={producto.id}>
                    <h4>{producto.nombre}</h4>
                    <p>{producto.descripcion}</p>
                    <div className={styles.cardFooter}>
                        <span className={styles.priceCard}>${producto.precio}</span>
                        <span className={styles.idTag}>ID: {producto.id}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CatalogoAdmin;