import useProductos from "../../hooks/useProductos";

function CatalogoAdmin() {

	const {
		productos,
		loading,
		error
	} = useProductos();

	if (loading)
		return <p>Cargando productos...</p>;

	if (error)
		return <p>{error}</p>;

	return (
		<div>

			<h2>Catálogo Administrativo</h2>

			{
				productos.map(producto => (

					<div
						key={producto.id}
						style={{
							border: "1px solid black",
							margin: "10px",
							padding: "10px"
						}}
					>

						<h4>
							{producto.nombre}
						</h4>

						<p>
							{producto.descripcion}
						</p>

						<p>
							Precio:
							{" "}
							{producto.precio}
						</p>

						<p>
							ID:
							{" "}
							{producto.id}
						</p>

					</div>

				))
			}

		</div>
	);
}

export default CatalogoAdmin;