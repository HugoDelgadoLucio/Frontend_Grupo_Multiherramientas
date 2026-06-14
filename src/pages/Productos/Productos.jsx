import { useSearchParams, useNavigate } from "react-router-dom";
import useProductos from "../../hooks/useProductos";

function Productos() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const categoriaParam = searchParams.get("categoria") || "";
    const marcaParam = searchParams.get("marca") || "";

    const { productos, loading, error } = useProductos(categoriaParam, marcaParam);

    return (
        <div>
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
                            <div
                                key={producto.id}
                                onClick={() => navigate(`/productos/${producto.id}`)}
                                style={{ cursor: "pointer", border: "1px solid #ccc", margin: "8px", padding: "8px" }}
                            >
                                <h4>{producto.nombre}</h4>
                                <p>{producto.descripcion}</p>
                                <p><strong>${producto.precio}</strong></p>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default Productos;