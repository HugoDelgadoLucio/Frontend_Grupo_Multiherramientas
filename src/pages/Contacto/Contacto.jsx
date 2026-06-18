import { useState } from "react";
import styles from "./Contacto.module.css";
import {
	FaWhatsapp,
	FaPaperPlane,
	FaMapMarkerAlt,
	FaPhone,
	FaEnvelope,
	FaClock,
	FaQuestionCircle,
} from "react-icons/fa";

const faqs = [
	{
		pregunta: "¿Hacen envíos a todo México?",
		respuesta:
			"Sí, realizamos envíos a todo el país. Contáctanos para cotizar el costo según tu ubicación y el peso del pedido.",
	},
	{
		pregunta: "¿Manejan garantía en herramientas?",
		respuesta:
			"Todas las herramientas nuevas incluyen garantía de fábrica. Los términos varían según marca y modelo.",
	},
	{
		pregunta: "¿Puedo solicitar una cotización?",
		respuesta:
			"Sí. Puedes contactarnos por teléfono, WhatsApp o mediante el formulario para recibir una cotización personalizada.",
	},
	{
		pregunta: "¿Venden herramientas para uso profesional?",
		respuesta:
			"Contamos con herramientas para uso doméstico, industrial y profesional de distintas marcas reconocidas.",
	},
];

function Contacto() {

	const [nombre, setNombre] = useState("");
	const [telefono, setTelefono] = useState("");
	const [correo, setCorreo] = useState("");
	const [asunto, setAsunto] = useState("");
	const [mensaje, setMensaje] = useState("");

	return (
		<div className={styles.contacto}>
			<div className={styles.formulario}>
				<h2>
					<FaEnvelope /> Formulario de Contacto
				</h2>

				<div className={styles.phoneName}>
					<div>
						<p>
							Nombre <span>*</span>
						</p>
						<input
							className={styles.inputBase}
							type="text"
							placeholder="Tu nombre completo"
							value={nombre} onChange={(e) => setNombre(e.target.value)} 
						/>
					</div>
					<div>
						<p>Teléfono</p>
						<input
							className={styles.inputBase}
							type="text"
							placeholder="(449) 000-0000"
							value={telefono} onChange={(e) => setTelefono(e.target.value)} 
						/>
					</div>
				</div>

				<p>
					Correo electroníco <span>*</span>
				</p>
				<input
					className={styles.inputBase}
					type="text"
					placeholder="correo@ejemplo.com"
					value={correo} onChange={(e) => setCorreo(e.target.value)} 
				/>

				<p>
					Asunto <span>*</span>
				</p>
				<select className={styles.inputBase} value={asunto} onChange={(e) => setAsunto(e.target.value)}>
					<option>Consulta de precio o disponibilidad</option>
					<option>Consultar metodos de pago</option>
					<option>Consultar pedidos</option>
				</select>

				<p>
					Mensaje <span>*</span>
				</p>
				<textarea
					className={styles.inputBase}
					placeholder="Describe tu consulta, incluye modelo o código si tienes…"
					value={mensaje} onChange={(e) => setMensaje(e.target.value)}
				/>

				<button className={styles.sendButton}>
					Enviar mensaje <FaPaperPlane />
				</button>
			</div>

			<div className={styles.ubicacionDatos}>
				<section className={styles.ubicacion}>
					<h2>
						{" "}
						<FaMapMarkerAlt /> Ubicación y datos
					</h2>

					<iframe
						className={styles.mapa}
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3701.9461821585187!2d-102.30000209170302!3d21.898148089251862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8429ee69ce5c28f7%3A0x581ef16b71288f46!2sGrupo%20multiherramientas!5e0!3m2!1ses-419!2sus!4v1780879256948!5m2!1ses-419!2sus"
						width="600px"
						height="400px"
						style={{ border: 0 }}
						allowFullScreen
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
						title="Ubicación de la empresa"
					/>

					<ul className={styles.datos}>
						<li>
							<strong>
								<FaMapMarkerAlt /> Dirección
							</strong>
							<br />
							Calle Ignacio Zaragoza #123, Col. Centro, Aguascalientes, Ags. C.P. 20000
						</li>
						<li>
							<strong>
								<FaPhone /> Teléfono
							</strong>
							<br />
							(449) 123-4567
						</li>
						<li>
							<strong>
								<FaEnvelope /> Correo
							</strong>
							<br />
							ventas@grupomultiherramientas.com
						</li>
						<li>
							<strong>
								<FaClock /> Horario de atención
							</strong>
							<br />
							Lun - Vie: 9:00 - 18:00 · Sábado: 9:00 - 14:00
						</li>
					</ul>
				</section>
			</div>

			<div className={styles.lateral}>
				<div className={styles.whatsapp}>
					<h2>
						<FaWhatsapp /> Atención por WhatsApp
					</h2>
					<p>
						Contáctanos directo y recibe respuesta en minutos durante horario de
						atención.
					</p>
					<button className={styles.sendButton}>
						<FaWhatsapp />
						Abrir WhatsApp · 449-3312-33-33
					</button>
				</div>

				<div className={styles.faq}>
					<h2>
						<FaQuestionCircle /> Preguntas frecuentes
					</h2>
					{faqs.map((item, i) => (
						<div key={i} className={styles.faqItem}>
							<p className={styles.faqPregunta}>{item.pregunta}</p>
							<p className={styles.faqRespuesta}>{item.respuesta}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default Contacto;
