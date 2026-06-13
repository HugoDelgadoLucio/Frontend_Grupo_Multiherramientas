//import styles from "./Contacto.module.css"

function Contacto() {



	return (
		<div>

			<section>
				<h2>Ubicación</h2>

				<iframe
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3701.9461821585187!2d-102.30000209170302!3d21.898148089251862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8429ee69ce5c28f7%3A0x581ef16b71288f46!2sGrupo%20multiherramientas!5e0!3m2!1ses-419!2sus!4v1780879256948!5m2!1ses-419!2sus"
					width="600px"
					height="400px"
					style={{ border: 0 }}
					allowFullScreen
					loading="lazy"
					referrerPolicy="no-referrer-when-downgrade"
					title="Ubicación de la empresa"
				/>
			</section>

		</div>
	);
}

export default Contacto;