import styles from "./Header.module.css"
import { FiSearch } from "react-icons/fi"
import { NavLink } from "react-router-dom";

export default function Header() {

	const rol = localStorage.getItem("rol");

	return (
		<header className={styles.header}>
			<div className={styles.fila1}>
				<div className={styles.marca}>
					<h1>GRUPO <span>MULTI</span>HERRAMIENTAS</h1>
					<div className={styles.franja}>
						<p>DISTRIBUIDORES OFICIALES BOSCH · MAKITA · DREMEL</p>
					</div>
				</div>

				<nav>
					<NavLink to="/">Inicio</NavLink> |{" "}
					<NavLink to="/contacto">Contacto</NavLink> |{" "}
					<NavLink to="/registro">Registro</NavLink> |{" "}
					<NavLink to="/login">Ingresar</NavLink>

					{rol === "admin" && (
						<>
							{" | "}
							<NavLink to="/admin">
								Panel de administrador
							</NavLink>
						</>
					)}
				</nav>

			</div>
			<div className={styles.fila2}>
				<p>Herramientas para <span className={styles.destacado}>profesionales</span><br />
					Encuentra herramientas eléctricas, accesorios y refacciones de las mejores marcas.<br />
					Consulta precios y disponibilidad en línea</p>

				<div className={styles.buscador}>
					<input className={styles.input} placeholder="Buscar por modelo, descripción o categoría." />
					<button><FiSearch /> Buscar </button>
				</div>
			</div>
		</header>
	);
}