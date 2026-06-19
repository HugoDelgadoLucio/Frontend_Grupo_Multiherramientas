import { NavLink, Outlet } from "react-router-dom";
import styles from "./PanelAdmin.module.css";

function PanelAdmin() {
    return (
        <div className={styles.adminBase}>
            <h1>Panel de Administración</h1>
            <div>
                <p>Administración de productos.</p>
                <hr className={styles.divider} />
                <nav className={styles.adminNav}>
                    <NavLink to="/admin/registrar" className={({ isActive }) => isActive
                        ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink } >
                        Registrar producto
                    </NavLink>
                    <NavLink to="/admin/catalogo" className={({ isActive }) => isActive
                        ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink } >
                        Ver catálogo
                    </NavLink>
                    <NavLink to="/admin/actualizar" className={({ isActive }) => isActive
                        ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink } >
                        Actualizar producto
                    </NavLink>
                    <NavLink to="/admin/eliminar" className={({ isActive }) => isActive
                        ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink } >
                        Eliminar producto
                    </NavLink>
                    <NavLink to="/admin/ubicacion" className={({ isActive }) => isActive
                        ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink } >
                        Buscar productos por ubicacion
                    </NavLink>
                </nav>
                <hr className={styles.divider} />
            </div>

            <div>
                <p>Administración de noticias.</p>
                <hr className={styles.divider} />
                <nav className={styles.adminNav}>
                    <NavLink to="/admin/registroNoticia" className={({ isActive }) => isActive
                        ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink } >
                        Publicar nueva noticia
                    </NavLink>
                    <NavLink to="/admin/catalogoNoti" className={({ isActive }) => isActive
                            ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink } >
                        Ver noticias
                    </NavLink>
                    <NavLink to="/admin/actualizarNoti" className={({ isActive }) => isActive
                        ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink } >
                        Actualizar noticia
                    </NavLink>
                    <NavLink to="/admin/eliminarNoti" className={({ isActive }) => isActive
                        ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink } >
                        Eliminar noticia
                    </NavLink>
                </nav>
                <hr className={styles.divider} />
            </div>
            <div className={styles.adminContent}>
                <Outlet />
            </div>
        </div>
    );
}

export default PanelAdmin;