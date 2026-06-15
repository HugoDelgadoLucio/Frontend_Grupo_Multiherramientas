import { useNavigate } from "react-router-dom";
import styles from "./Inicio.module.css"

function Inicio() {
	const navigate = useNavigate();

	return (
		<div className={styles.StartContenedor}>
			<section className={styles.MarcaSeccion}>
				<h2>Marcas</h2>
				<button onClick={() => navigate("/productos?marca=Bosch")}>Bosch</button>
				<button onClick={() => navigate("/productos?marca=Makita")}>Makita</button>
				<button onClick={() => navigate("/productos?marca=Dremel")}>Dremel</button>
			</section>

			<br />

			<section className={styles.CategoriaSeccion}>
				<div className={styles.CategoriaAcomodo}>
					<h3>Categorías</h3>
					<button className={styles.noHover}
							onClick={() => navigate("/productos")} style={{ cursor: "pointer" }}>Ver todo →</button>
				</div>
				<button onClick={() => navigate("/productos?categoria=Herramientas Eléctricas")}>Herr. Eléctricas</button>
				<button onClick={() => navigate("/productos?categoria=Accesorios")}>Accesorios</button>
				<button onClick={() => navigate("/productos?categoria=Refacciones")}>Refacciones</button>
				<button onClick={() => navigate("/productos?categoria=Alámbricas")}>Alámbricas</button>
				<button onClick={() => navigate("/productos?categoria=De Batería")}>De Batería</button>
			</section>
		</div>
	);
}

export default Inicio;