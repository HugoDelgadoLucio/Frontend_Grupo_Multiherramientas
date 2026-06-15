import Swal from "sweetalert2";
import useProductos from "../../hooks/useProductos";
import styles from "./EliminarProducto.module.css";

function EliminarProducto() {

    const { productos, loading, error } = useProductos("", "", true);

    const eliminar = async (id) => {

        const confirmar = await Swal.fire({
            title: "¿Eliminar producto?",
            text: id,
            icon: "warning",
            showCancelButton: true
        });

        if (!confirmar.isConfirmed) return;

        try {

            const response = await fetch("http://localhost:3000/productos/eliminarLogico", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.mensaje);

            await Swal.fire({ icon: "success", title: "Producto eliminado" });

            window.location.reload();

        } catch (error) {
            Swal.fire({ icon: "error", title: error.message });
        }
    };

    if (loading) return <p className={styles.estado}>Cargando...</p>;
    if (error) return <p className={styles.estado}>{error}</p>;

    return (
        <div>
            <h2 className={styles.titulo}>Eliminar Producto</h2>

            {productos.map(producto => (
                <div className={styles.ProductCard} key={producto.id}>
                    <h4>{producto.nombre}</h4>
                    <div className={styles.cardFooter}>
                        <span className={styles.idTag}>ID: {producto.id}</span>
                        <button
                            className={styles.btnEliminar}
                            onClick={() => eliminar(producto.id)}
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default EliminarProducto;