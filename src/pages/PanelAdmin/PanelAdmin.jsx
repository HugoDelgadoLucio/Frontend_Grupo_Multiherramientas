import { useNavigate } from "react-router-dom";

function PanelAdmin() {

    const navigate = useNavigate();

    // ==========================
    // AQUÍ IRÁ LA OBTENCIÓN DE PRODUCTOS
    // ==========================
    //
    // useEffect(() => {
    //     fetch("URL_BACKEND/productos")
    //         .then(...)
    // }, []);
    //
    // ==========================

    const registrarProducto = async () => {

        // ==========================
        // AQUÍ IRÁ EL POST
        // ==========================
        //
        // await fetch("URL_BACKEND/productos",{
        //     method:"POST",
        //     headers:{},
        //     body: JSON.stringify(...)
        // })
        //
        // ==========================

        console.log("Registrar producto");
    };

    const modificarProducto = async () => {

        // ==========================
        // AQUÍ IRÁ EL PUT
        // ==========================
        //
        // await fetch(`URL_BACKEND/productos/${id}`,{
        //     method:"PUT"
        // })
        //
        // ==========================

        console.log("Modificar producto");
    };

    const eliminarProducto = async () => {

        // ==========================
        // AQUÍ IRÁ EL DELETE
        // ==========================
        //
        // await fetch(`URL_BACKEND/productos/${id}`,{
        //     method:"DELETE"
        // })
        //
        // ==========================

        console.log("Eliminar producto");
    };

    return (
        <div>
            <h1>Panel de Administración</h1>

            <p>
                Desde esta sección se administran los productos
                del catálogo.
            </p>

            <hr />

            <button onClick={registrarProducto}>Registrar producto</button>

            <br /><br />

            <button onClick={modificarProducto}>Modificar producto</button>

            <br /><br />

            <button onClick={eliminarProducto}>Eliminar producto</button>

            <br /><br />

            <button onClick={() => navigate("/productos")}>Ver catálogo completo</button>
        </div>
    );
}

export default PanelAdmin;