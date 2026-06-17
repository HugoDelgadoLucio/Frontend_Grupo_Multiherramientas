import styles from "./Footer.module.css"
import { NavLink } from "react-router-dom";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.contenedor}>
                <p>©2026 Grupo Multiherramientas · Aguascalientes, Mexico</p>
                <nav>
                    <span>|</span>
                    <NavLink to="/contacto">Contacto</NavLink>
                    <span>|</span>
                </nav>    
            </div>
            
        </footer>
    );
}