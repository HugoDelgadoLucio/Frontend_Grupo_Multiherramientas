import { NavLink, Outlet } from "react-router-dom";

function PanelAdmin() {

    return (
        <div>
            <h1>Panel de Administración</h1>
            <p>Administración de productos.</p>
            <hr />
            <nav>
                <NavLink to="/admin/registrar">Registrar producto</NavLink>
                {" | "}
                <NavLink to="/admin/catalogo">Ver catálogo</NavLink>
                {" | "}
                <NavLink to="/admin/eliminar">Eliminar producto</NavLink>
            </nav>
            <hr />
            <Outlet />
        </div>
    );
}

export default PanelAdmin;