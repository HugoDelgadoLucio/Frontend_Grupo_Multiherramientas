import { useState } from "react";
import Swal from "sweetalert2";

function Login() {

	const [usuario, setUsuario] = useState("");
	const [contra, setContra] = useState("");

	async function logear() {
		try {
			const response = await fetch("http://localhost:3000/usuarios/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					usuario,
					contraseña: contra
				})
			});

			if (!response.ok) {
				const errorData = await response.json();
				Swal.fire({
					icon: "error",
					title: "Error",
					text: `Error al registrar usuario: ${errorData}`
				});
				return;
			}

			const data = await response.json();

			// Guardar token y rol en localStorage
			localStorage.setItem("token", data.token);
			localStorage.setItem("rol", data.rol);
			localStorage.setItem("usuario", data.usuario);

			Swal.fire({
				icon: "success",
				title: `¡Bienvenido, ${data.usuario}!`,
				timer: 2000,
				showConfirmButton: false
			});

			// Aquí después navegas según el rol, por ejemplo:
			// if (data.rol === "superadmin" || data.rol === "admin") navigate("/admin");
			// else navigate("/");

		} catch (error) {
			Swal.fire({
				icon: "error",
				title: "Error al iniciar sesión",
				text: error.message
			});
		}
	}

	return (
		<div>
			<h3>Login</h3>
			<label htmlFor="usuario">Nombre de usuario</label>
			<input id="usuario" type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
			<br />
			<label htmlFor="contra">Contraseña</label>
			<input id="contra" type="password" value={contra} onChange={(e) => setContra(e.target.value)} />
			<br />
			<button onClick={logear}>Iniciar sesión</button>
		</div>
	);
}

export default Login;