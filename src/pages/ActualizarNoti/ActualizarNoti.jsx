import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import styles from "./ActualizarNoti.module.css";

function ActualizarNoti() {
    const [noticias, setNoticias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [noticiaSeleccionada, setNoticiaSeleccionada] = useState(null);

    const refTitulo    = useRef(null);
    const refContenido = useRef(null);
    const refImagenUrl = useRef(null);
    const refPublicada = useRef(null);

    useEffect(() => {
        const controller = new AbortController();

        const fetchNoticias = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch("http://localhost:3000/noticias", {
                    signal: controller.signal
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.mensaje || "Error al obtener noticias");
                }
                const data = await response.json();
                setNoticias(data.data);
            } catch (err) {
                if (err.name !== "AbortError") {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchNoticias();
        return () => controller.abort();
    }, []);

    const seleccionar = (noticia) => {
        setNoticiaSeleccionada(noticia);
        setTimeout(() => {
            if (refTitulo.current) refTitulo.current.value = noticia.titulo ?? "";
            if (refContenido.current) refContenido.current.value = noticia.contenido  ?? "";
            if (refImagenUrl.current) refImagenUrl.current.value = noticia.imagen_url ?? "";
            if (refPublicada.current) refPublicada.current.checked = noticia.publicada ?? false;
        }, 0);
    };

    const actualizar = async () => {
        if (!noticiaSeleccionada) return;

        const correo_usuario = localStorage.getItem("email");
        if (!correo_usuario) {
            Swal.fire({ icon: "error", title: "Sin sesión", text: "Debes iniciar sesión como admin" });
            return;
        }

        const body = {
            id:             noticiaSeleccionada.id,
            titulo:         refTitulo.current.value,
            contenido:      refContenido.current.value,
            imagen_url:     refImagenUrl.current.value,
            publicada:      refPublicada.current.checked,
            correo_usuario,
        };

        try {
            const response = await fetch("http://localhost:3000/noticias/actualizarNoticia", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.mensaje || "Error al actualizar");

            await Swal.fire({ icon: "success", title: "Noticia actualizada" });
            setNoticiaSeleccionada(null);

            // Refrescar la lista sin recargar la página
            setNoticias(prev =>
                prev.map(n => n.id === data.data.id ? data.data : n)
            );

        } catch (err) {
            Swal.fire({ icon: "error", title: "Error", text: err.message });
        }
    };

    const cancelar = () => setNoticiaSeleccionada(null);

    if (loading) return <p>Cargando...</p>;
    if (error)   return <p>{error}</p>;

    return (
        <div>
             <h2 className={styles.titulo}>Actualizar Noticia</h2>

        {/* Lista de noticias */}
        {!noticiaSeleccionada && noticias.map(noticia => (
            <div className={styles.NoticiaCard} key={noticia.id}>
                <h4>{noticia.titulo}</h4>
                <div className={styles.cardFooter}>
                    <span
                        className={
                            noticia.publicada
                                ? styles.estadoPublicada
                                : styles.estadoBorrador
                        }
                    >
                        {noticia.publicada ? "Publicada" : "No publicada"}
                    </span>
                    <button
                        className={styles.btnEditar}
                        onClick={() => seleccionar(noticia)}
                    >
                        Editar
                    </button>
                </div>
            </div>
        ))}

            {/* Formulario */}
{noticiaSeleccionada && (
    <div className={styles.formCard}>
        <h3 className={styles.formTitulo}>Editando: {noticiaSeleccionada.titulo}</h3>

        <div className={styles.field}>
            <label className={styles.label}>Título</label>
            <input className={styles.inputBase} ref={refTitulo} type="text" />
        </div>

        <div className={styles.field}>
            <label className={styles.label}>Contenido</label>
            <textarea className={styles.inputBase} ref={refContenido} rows={6} />
        </div>

        <div className={styles.field}>
            <label className={styles.label}>URL de imagen</label>
            <input className={styles.inputBase} ref={refImagenUrl} type="text" />
        </div>

        <div className={styles.checkboxRow}>
            <input className={styles.checkbox} ref={refPublicada} type="checkbox" id="publicadaEdit" />
            <label className={styles.checkboxLabel} htmlFor="publicadaEdit">Publicada</label>
        </div>

        <div className={styles.btnRow}>
            <button className={styles.btnGuardar} onClick={actualizar}>Guardar cambios</button>
            <button className={styles.btnCancelar} onClick={cancelar}>Cancelar</button>
        </div>
    </div>
)}
        </div>
    );
}

export default ActualizarNoti;