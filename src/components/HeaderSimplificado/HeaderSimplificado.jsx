import styles from "./HeaderSimplificado.module.css"

export default function HeaderSimplificado() {
  return (
    <header className={styles.header}>
      <div className={styles.marca}>
        <h1>GRUPO <span>MULTI</span>HERRAMIENTAS</h1>
      </div>
      <nav className={styles.nav}>
        <a href="#">Inicio</a>
        <a href="#">Productos</a>
        <a href="#">Contacto</a>
        <a href="#">Marcas</a>
        <a href="#">Promociones</a>
      </nav>
    </header>
  )
}