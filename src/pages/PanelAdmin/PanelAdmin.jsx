import { NavLink, Outlet } from "react-router-dom";
import styles from "./PanelAdmin.module.css";

function PanelAdmin() {
    return (
        <div className={styles.adminBase}>
            <h1>Panel de Administración</h1>
            <p>Administración de productos.</p>
            <hr className={styles.divider} />
            <nav className={styles.adminNav}>
                <NavLink
                    to="/admin/registrar"
                    className={({ isActive }) =>
                        isActive
                            ? `${styles.navLink} ${styles.navLinkActive}`
                            : styles.navLink
                    }
                >
                    Registrar producto
                </NavLink>
                <NavLink
                    to="/admin/catalogo"
                    className={({ isActive }) =>
                        isActive
                            ? `${styles.navLink} ${styles.navLinkActive}`
                            : styles.navLink
                    }
                >
                    Ver catálogo
                </NavLink>
                <NavLink
                    to="/admin/actualizar"
                    className={({ isActive }) =>
                        isActive
                            ? `${styles.navLink} ${styles.navLinkActive}`
                            : styles.navLink
                    }
                >
                    Actualizar producto
                </NavLink>
                <NavLink
                    to="/admin/eliminar"
                    className={({ isActive }) =>
                        isActive
                            ? `${styles.navLink} ${styles.navLinkActive}`
                            : styles.navLink
                    }
                >
                    Eliminar producto
                </NavLink>
            </nav>
            <hr className={styles.divider} />
            <div className={styles.adminContent}>
                <Outlet />
            </div>
        </div>
    );
}

export default PanelAdmin;