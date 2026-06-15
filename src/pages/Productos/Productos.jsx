import { useSearchParams, useNavigate } from "react-router-dom";
import useProductos from "../../hooks/useProductos";
import styles from "./Productos.module.css"

function Productos() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const categoriaParam = searchParams.get("categoria") || "";
    const marcaParam = searchParams.get("marca") || "";

    const { productos, loading, error } = useProductos(categoriaParam, marcaParam);

    return (
        <div className={styles.ProductBase}>
            <h2>Catálogo de Productos</h2>

            {/* Filtros activos */}
            {(categoriaParam || marcaParam) && (
                <div>
                    <p>
                        Filtrando por: <strong>{categoriaParam || marcaParam}</strong>
                    </p>
                    <button onClick={() => setSearchParams({})}>Limpiar filtros</button>
                </div>
            )}

            {/* Estados */}
            {loading && <p>Cargando productos...</p>}
            {error && <p>Error: {error}</p>}

            {/* Listado */}
            {!loading && !error && (
                <div>
                    {productos.length === 0 ? (
                        <p>No se encontraron productos.</p>
                    ) : (
                        productos.map(producto => (
                            <div className={styles.ProductCard}
                                key={producto.id}
                                onClick={() => navigate(`/productos/${producto.id}`)}
                                
                            >
                                <h4>{producto.nombre}</h4>
                                <p>{producto.descripcion}</p>
                                <p className={styles.priceCard}><strong>${producto.precio}</strong></p>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default Productos;