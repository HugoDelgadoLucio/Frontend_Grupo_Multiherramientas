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
						GRUPO <span className={styles.titulo}>MULTI</span>HERRAMIENTAS
					</h1>

					<div className={styles.franja}>
						<p>DISTRIBUIDORES OFICIALES BOSCH · MAKITA · DREMEL</p>
					</div>
				</div>

				<nav>
					<NavLink className={styles.TextRight} to="/">Inicio</NavLink>
					{"|"}
					<NavLink to="/noticias">Noticias</NavLink>
					{"|"}
					<NavLink className={styles.TextRight} to="/contacto">Contacto</NavLink>
					{!usuario.token && (
						<>
							{"|"}
							<NavLink className={styles.TextRight} to="/registro">Registro</NavLink>
							{"|"}
							<NavLink className={styles.TextRight} to="/login">Ingresar</NavLink>
						</>
					)}

					{usuario.rol === "admin" && (
						<>
							{"|"}
							<NavLink className={styles.TextRight} to="/admin">Panel admin</NavLink>
						</>
					)}

					{usuario.token && (
						<>
							{"|"}
							<span>{usuario.email}</span>
							{"|"}
							<button className={styles.btn} onClick={logout}>Cerrar sesión</button>
						</>
					)}
				</nav>

			</div>

			<div className={styles.fila2}>
				<p>
					Herramientas para{" "}
					<span className={styles.destacado}>profesionales</span>
					<br />
					Encuentra herramientas eléctricas,
					accesorios y refacciones de las mejores marcas.
					<br />
					Consulta precios y disponibilidad en línea
				</p>

				<div className={styles.buscador}>
					<input className={styles.inputBuscador} placeholder="Buscar por modelo, descripción o categoría." />
					<button className={styles.btn}>
						<FiSearch />
						Buscar
					</button>
				</div>

			</div>

		</header>
	);
}