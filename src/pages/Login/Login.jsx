import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import styles from "./Login.module.css";
import { useAuth } from "../../context/useAuth";
import { NavLink } from "react-router-dom";

function Login() {

	const [correo, setCorreo] = useState("");
	const [contra, setContra] = useState("");

	const navigate = useNavigate();
	const { login } = useAuth();

	const [estado, setEstado] = useState("");
	const [mostrar, setMostrar] = useState("none");

	async function enviar() {

		try {

			const response = await fetch(
				"http://localhost:3000/usuarios/login",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						correo,
						password: contra
					})
				}
			);

			if (!response.ok) {

				const errorData = await response.json();

				throw new Error(
					errorData.mensaje ||
					"Credenciales incorrectas"
				);
			}

			const data = await response.json();
			login(data);

			await Swal.fire({
				icon: "success",
				title: "¡Bienvenido!",
				text: data.mensaje
			});

			if (data.data.rol === "admin") {
				navigate("/admin");
			}
			else {
				navigate("/");
			}

		}
		catch (error) {
			Swal.fire({
				icon: "error",
				title: "Error al iniciar sesión",
				text: error.message
			});
			setEstado("Olvide mi contraseña");
			setMostrar("block");
		}
	}

	return (
		<div className={styles.loginBackground}>
			<div className={styles.loginInput}>
				<h3>Login</h3>

				<div className={styles.campo}>
					<label htmlFor="correo">Correo</label>
					<input
						id="correo"
						type="email"
						value={correo}
						onChange={(e) => setCorreo(e.target.value)}
					/>
				</div>

				<div className={styles.campo}>
					<label htmlFor="contra">Contraseña</label>
					<input
						id="contra"
						type="password"
						value={contra}
						onChange={(e) => setContra(e.target.value)}
					/>
				</div>
				<br />
				<NavLink style={{display: `${mostrar}`}} className={styles.estadoContra} to="/recuperarContrasena">{estado}</NavLink>
				<br />
				<button onClick={enviar}>Iniciar sesión</button>
			</div>
		</div>
	);
}

export default Login;