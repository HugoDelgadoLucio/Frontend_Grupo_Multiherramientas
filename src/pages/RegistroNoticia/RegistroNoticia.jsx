import { useRef } from "react";
import Swal from "sweetalert2";
import styles from "./RegistroNoticia.module.css"

function RegistroNoticia() {

    const tituloRef = useRef();
    const contenidoRef = useRef();
    const publicadaRef = useRef();
    const imagenRef = useRef();

    const registrar = async (e) => {

        e.preventDefault();

        const titulo = tituloRef.current.value;
        const contenido = contenidoRef.current.value;
        const publicada = publicadaRef.current.checked;

        const correo_usuario = localStorage.getItem("email");

        if (!correo_usuario) {
            Swal.fire({ icon: "error", title: "Error", text: "Debes iniciar sesión como administrador para registrar una noticia" });
            return;
        }
        if(!titulo || !contenido){
            Swal.fire({ icon: "error", title: "Error", text: "Debes llenar todos los campos" });
            return;
        }
        if(titulo.length < 5 || titulo.length > 200){
            Swal.fire({ icon: "error", title: "Error", text: "La longitud del titulo no esta entre el rango especificado" });
            return;
        }
        if(contenido.length < 15 || contenido.length > 500){
            Swal.fire({ icon: "error", title: "Error", text: "La longitud del contenido no esta entre el rango especificado" });
            return;
        }

        try {
            const formData = new FormData();

            formData.append("titulo", titulo);
            formData.append("contenido", contenido);
            formData.append("publicada", publicada);
            formData.append("correo_usuario", correo_usuario);

            const archivo = imagenRef.current.files[0];

            if (archivo) {
                formData.append("imagen", archivo);
            }

            //const response = await fetch("http://localhost:3000/noticias",
            const response = await fetch("https://backend-grupo-multiherramientas.onrender.com/noticias",
                {
                    method: "POST",
                    body: formData
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.mensaje
                );
            }

            await Swal.fire({
                icon: "success",
                title: "Noticia registrada",
                text: data.mensaje
            });
        }
        catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Hubo un error al registrar la noticia"
            });
        }

        tituloRef.current.value = "";
        contenidoRef.current.value = "";
        publicadaRef.current.checked = false;
        imagenRef.current.value = "";
    };

    return (
    <div>
        <h2 className={styles.titulo}>Registrar Noticia</h2>

        <form className={styles.form} onSubmit={registrar}>

            <span className={styles.seccion}>Información de la noticia</span>

            <label className={styles.label}>Título</label>
            <input className={styles.inputBase} ref={tituloRef} placeholder="Título de la noticia" />
            <small>El titulo debe contener entre 5 y 200 caracteres.</small>

            <label className={styles.label}>Contenido</label>
            <textarea className={styles.inputBase} ref={contenidoRef} placeholder="Contenido de la noticia" />
            <small>El contenido debe contener entre 10 y 500 caracteres.</small>

            <div className={styles.checkboxRow}>
                <input className={styles.checkbox} ref={publicadaRef} type="checkbox" id="publicada" />
                <label className={styles.checkboxLabel} htmlFor="publicada">Publicada</label>
            </div>

            <span className={styles.seccion}>Imagen</span>
            <input className={styles.inputFile} ref={imagenRef} type="file" accept="image/*" />

            <button className={styles.btnSubmit} type="submit">Registrar noticia</button>
        </form>
    </div>
);
}

export default RegistroNoticia;