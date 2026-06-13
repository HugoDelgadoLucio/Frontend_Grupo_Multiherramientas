import styles from "./Footer.module.css"

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.contenedor}>
                <p>©2026 Grupo Multiherramientas · Aguascalientes, Mexico</p>
                <nav>
                    <a href="#">Aviso de privacidad</a>
                    <span>|</span>
                    <a href="#">Contacto</a>
                    <span>|</span>
                    <a href="#">Ubicacion</a>
                </nav>    
            </div>
            
        </footer>
    );
}