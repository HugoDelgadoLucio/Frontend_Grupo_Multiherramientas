import Swal from "sweetalert2";
import useProductos from "../../hooks/useProductos";

function EliminarProducto() {

    const {
        productos,
        loading,
        error
    } = useProductos("", "", true);

    const eliminar = async (id) => {

        const confirmar = await Swal.fire({
            title: "¿Eliminar producto?",
            text: id,
            icon: "warning",
            showCancelButton: true
        });

        if (!confirmar.isConfirmed)
            return;

        try {

            const response =
                await fetch(
                    "http://localhost:3000/productos/eliminarLogico",
                    {
                        method: "DELETE",
                        headers: {
                            "Content-Type":
                                "application/json"
                        },
                        body: JSON.stringify({
                            id
                        })
                    }
                );

            const data =
                await response.json();

            if (!response.ok)
                throw new Error(
                    data.mensaje
                );

            await Swal.fire({
                icon: "success",
                title: "Producto eliminado"
            });

            window.location.reload();

        }
        catch (error) {

            Swal.fire({
                icon: "error",
                title: error.message
            });
        }
    };

    if (loading)
        return <p>Cargando...</p>;

    if (error)
        return <p>{error}</p>;

    return (
        <div>

            <h2>
                Eliminar Producto
            </h2>

            {
                productos.map(producto => (

                    <div
                        key={producto.id}
                        style={{
                            border:
                                "1px solid red",
                            margin:
                                "10px",
                            padding:
                                "10px"
                        }}
                    >

                        <h4>
                            {producto.nombre}
                        </h4>

                        <p>
                            {producto.id}
                        </p>

                        <button
                            onClick={() =>
                                eliminar(
                                    producto.id
                                )
                            }
                        >
                            Eliminar
                        </button>

                    </div>

                ))
            }

        </div>
    );
}

export default EliminarProducto;