import { useRef } from "react";
import Swal from "sweetalert2";

function RegistroNoticia() {

    const tituloRef = useRef();
    const contenidoRef = useRef();
    const publicadaRef = useRef();
    const imagenRef = useRef();

    const registrar = async (e) => {

        e.preventDefault();

        try {

            const correo_usuario = localStorage.getItem("email");

            if (!correo_usuario) {
                throw new Error("Debes iniciar sesión como admin para registrar una noticia");
            }

            const formData = new FormData();

            formData.append("titulo", tituloRef.current.value);
            formData.append("contenido", contenidoRef.current.value);
            formData.append("publicada", publicadaRef.current.checked);
            formData.append("correo_usuario", correo_usuario);

            const archivo = imagenRef.current.files[0];

            if (archivo) {
                formData.append("imagen", archivo);
            }

            const response = await fetch("http://localhost:3000/noticias",
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
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.message
            });
        }

        tituloRef.current.value = "";
        contenidoRef.current.value = "";
        publicadaRef.current.checked = false;
        imagenRef.current.value = "";
    };

    return (
        <div>
            <h2>Registrar Noticia</h2>

            <form onSubmit={registrar}>

                <span>Información de la noticia</span>

                <label>Título</label>
                <input ref={tituloRef} placeholder="Título de la noticia" />

                <label>Contenido</label>
                <textarea ref={contenidoRef} placeholder="Contenido de la noticia" />

                <div>
                    <label>Publicada</label>
                    <input ref={publicadaRef} type="checkbox" />
                </div>

                <span>Imagen</span>
                <input ref={imagenRef} type="file" accept="image/*" />

                <button type="submit">
                    Registrar noticia
                </button>

            </form>
        </div>
    );
}

export default RegistroNoticia;