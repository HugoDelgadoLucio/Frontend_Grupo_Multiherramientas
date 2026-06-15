import styles from "./Header.module.css";
import { FiSearch } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

export default function Header() {

	const { usuario, logout } = useAuth();

	return (
		<header className={styles.header}>

			<div className={styles.fila1}>

				<div className={styles.marca}>
					<h1>
						GRUPO <span>MULTI</span>HERRAMIENTAS
					</h1>

					<div className={styles.franja}>
						<p>DISTRIBUIDORES OFICIALES BOSCH · MAKITA · DREMEL</p>
					</div>
				</div>

				<nav>
					<NavLink to="/">Inicio</NavLink>
					{" | "}
					<NavLink to="/contacto">Contacto</NavLink>
					{" | "}
					<NavLink to="/productos">Productos</NavLink>
					{!usuario.token && (
						<>
							{" | "}
							<NavLink to="/registro">Registro</NavLink>
							{" | "}
							<NavLink to="/login">Ingresar</NavLink>
						</>
					)}

					{usuario.rol === "admin" && (
						<>
							{" | "}
							<NavLink to="/admin">Panel admin</NavLink>
						</>
					)}

					{usuario.token && (
						<>
							{" | "}
							<span>{usuario.email}</span>
							{" | "}
							<button onClick={logout}>Cerrar sesión</button>
						</>
					)}
				</nav>

			</div>

			<div className={styles.fila2}>

				<p>
					Herramientas para{" "}
					<span className={styles.destacado}>
						profesionales
					</span>
					<br />
					Encuentra herramientas eléctricas,
					accesorios y refacciones de las mejores marcas.
					<br />

					Consulta precios y disponibilidad en línea
				</p>

				<div className={styles.buscador}>
					<input
						className={styles.input}
						placeholder="Buscar por modelo, descripción o categoría."
					/>

					<button>
						<FiSearch />
						Buscar
					</button>
				</div>

			</div>

		</header>
	);
}