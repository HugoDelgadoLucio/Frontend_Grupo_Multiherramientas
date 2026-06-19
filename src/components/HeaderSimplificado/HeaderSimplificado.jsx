import styles from "./HeaderSimplificado.module.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

export default function HeaderSimplificado() {

	const { usuario, logout } = useAuth();

	return (
		<header className={styles.header}>
			<div className={styles.marca}>
				<h1>GRUPO <span className={styles.titulo}>MULTI</span>HERRAMIENTAS</h1>
			</div>

			<nav className={styles.nav}>
				<NavLink to="/">Inicio</NavLink>
				<NavLink to="/noticias">Noticia</NavLink>
				<NavLink to="/productos">Productos</NavLink>

				{!usuario.token && (
					<>
						<NavLink to="/registro">Registro</NavLink>
						<NavLink to="/login">Ingresar</NavLink>
					</>
				)}

				{usuario.rol === "admin" && (
					<NavLink to="/admin">Panel admin</NavLink>
				)}

				{usuario.token && (
					<>
						<span>{usuario.email}</span>
						<button className={styles.btn} onClick={logout}>Cerrar sesión</button>
					</>
				)}
			</nav>
		</header>
	);
}