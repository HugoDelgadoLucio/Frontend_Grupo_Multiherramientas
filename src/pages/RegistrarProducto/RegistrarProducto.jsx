import { useRef } from "react";
import Swal from "sweetalert2";
import styles from "./RegistrarProducto.module.css";
import { useAuth } from "../../context/useAuth";

function RegistrarProducto() {
    const { usuario } = useAuth();

    const nombreRef = useRef();
    const modeloRef = useRef();
    const descripcionRef = useRef();
    const precioRef = useRef();
    const existenciaRef = useRef();
    const marcaRef = useRef();
    const categoriaRef = useRef();
    const pasilloRef = useRef();
    const estanteRef = useRef();
    const charolaRef = useRef();
    const cajonRef = useRef();
    const tipoCorrienteRef = useRef();
    const imagenesRef = useRef();

    const registrar = async (e) => {

        e.preventDefault();

        const nombre = nombreRef.current.value.trim();
        const modelo = modeloRef.current.value.trim();
        const descripcion = descripcionRef.current.value.trim();
        const precio = precioRef.current.value.trim();
        const existencia = existenciaRef.current.value.trim();
        const marca = marcaRef.current.value.trim();
        const categoria = categoriaRef.current.value.trim();
        const pasillo = pasilloRef.current.value.trim();
        const estante = estanteRef.current.value.trim();
        const charola = charolaRef.current.value.trim();
        const cajon = cajonRef.current.value.trim();
        const tipo_corriente = tipoCorrienteRef.current.value.trim();

        if (!nombre || !modelo || !descripcion || !precio || !existencia || !marca || !categoria || !pasillo || !estante || !charola || !cajon || !tipo_corriente) {
            Swal.fire({ icon: "error", title: "Error", text: "Debes llenar todos los campos" });
            return;
        }
        if (nombre.length < 5 || nombre.length > 200) {
            Swal.fire({ icon: "error", title: "Error", text: "La longitud del nombre no esta entre el rango especificado" });
            return;
        }
        if (modelo.length < 5 || modelo.length > 100) {
            Swal.fire({ icon: "error", title: "Error", text: "La longitud del modelo no esta entre el rango especificado" });
            return;
        }
        if (descripcion.length < 20 || descripcion.length > 400) {
            Swal.fire({ icon: "error", title: "Error", text: "La longitud de la descripción no esta entre el rango especificado" });
            return;
        }
        if (precio < 1) {
            Swal.fire({ icon: "error", title: "Error", text: "El precio no puedes ser cero ni negativo" });
            return;
        }
        if (existencia < 1) {
            Swal.fire({ icon: "error", title: "Error", text: "Las existencias no pueden ser de cero ni negativas" });
            return;
        }
        if (pasillo < 1 || pasillo > 5) {
            Swal.fire({ icon: "error", title: "Error", text: "El pasillo indicado no existe" });
            return;
        }
        if (charola < 1 || charola > 20) {
            Swal.fire({ icon: "error", title: "Error", text: "La charola indicada no existe" });
            return;
        }
        if (cajon < 1 || cajon > 24) {
            Swal.fire({ icon: "error", title: "Error", text: "El cajon indicado no existe" });
            return;
        }

        try {
            const formData = new FormData();

            formData.append("nombre", nombre);
            formData.append("modelo", modelo);
            formData.append("descripcion", descripcion);
            formData.append("precio", precio);
            formData.append("existencia", existencia);
            formData.append("marca", marca);
            formData.append("categoria", categoria);
            formData.append("pasillo", pasillo);
            formData.append("estante", estante);
            formData.append("charola", charola);
            formData.append("cajon", cajon);
            formData.append("tipo_corriente", tipo_corriente);

            const archivos = imagenesRef.current.files;

            for (let i = 0; i < archivos.length; i++) {
                formData.append(
                    "imagenes",
                    archivos[i]
                );
            }

            //const response = await fetch("http://localhost:3000/productos", {
            const response = await fetch("https://backend-grupo-multiherramientas.onrender.com/productos", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${usuario.token}`
                },
                body: formData
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.mensaje
                );
            }

            await Swal.fire({
                icon: "success",
                title: "Producto registrado",
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

        nombreRef.current.value = "";
        modeloRef.current.value = "";
        descripcionRef.current.value = "";
        precioRef.current.value = "";
        existenciaRef.current.value = "";
        marcaRef.current.value = "";
        categoriaRef.current.value = "";
        pasilloRef.current.value = "";
        estanteRef.current.value = "";
        charolaRef.current.value = "";
        cajonRef.current.value = "";
        tipoCorrienteRef.current.value = "";
        imagenesRef.current.value = "";
    };

    return (
        <div>
            <h2 className={styles.titulo}>Registrar Producto</h2>

            <form className={styles.form} onSubmit={registrar}>

                <span className={styles.seccion}>Información general</span>

                <label className={styles.label}>Nombre</label>
                <input className={styles.inputBase} ref={nombreRef} placeholder="Nombre del producto" />
                <small>El nombre debe contener entre 5 y 200 caracteres.</small>

                <label className={styles.label}>Modelo</label>
                <input className={styles.inputBase} ref={modeloRef} placeholder="Modelo" />
                <small>El modelo debe contener entre 5 y 100 caracteres.</small>

                <label className={styles.label}>Descripción</label>
                <textarea className={styles.inputBase} ref={descripcionRef} placeholder="Descripción del producto" />
                <small>La descripción debe contener entre 20 y 400 caracteres.</small>

                <div className={styles.grid2}>
                    <div>
                        <label className={styles.label}>Precio</label>
                        <input className={styles.inputBase} ref={precioRef} type="number" placeholder="0.00" />
                    </div>
                    <div>
                        <label className={styles.label}>Existencia</label>
                        <input className={styles.inputBase} ref={existenciaRef} type="number" placeholder="0" />
                        <small>Las existencias no pueden ser negativas ni cero</small>
                    </div>
                </div>

                <div className={styles.grid2}>
                    <div>
                        <label className={styles.label}>Marca</label>
                        <select className={styles.inputBase} ref={marcaRef} defaultValue="">
                            <option value="" disabled>Selecciona una marca</option>
                            <option value="Bosch">BOSCH</option>
                            <option value="Makita">MAKITA</option>
                            <option value="Dremel">DREMEL</option>
                        </select>
                    </div>
                    <div>
                        <label className={styles.label}>Categoría</label>
                        <select className={styles.inputBase} ref={categoriaRef} defaultValue="">
                            <option value="" disabled>Selecciona una categoría</option>
                            <option value="Herramientas Eléctricas">Herramientas Eléctricas</option>
                            <option value="Accesorios">Accesorios</option>
                            <option value="Refacciones">Refacciones</option>
                            <option value="Alámbricas">Alámbricas</option>
                            <option value="De Batería">De Batería</option>
                        </select>
                    </div>
                </div>

                <div className={styles.grid2}>
                    <div>
                        <label className={styles.label}>Tipo de corriente</label>
                        <select className={styles.inputBase} ref={tipoCorrienteRef} defaultValue="">
                            <option value="" disabled>Selecciona tipo</option>
                            <option value="bateria">Batería</option>
                            <option value="alambre">Alámbrica</option>
                        </select>
                    </div>
                </div>

                <span className={styles.seccion}>Ubicación en almacén</span>

                <div className={styles.grid2}>
                    <div>
                        <label className={styles.label}>Pasillo</label>
                        <input className={styles.inputBase} ref={pasilloRef} type="number" placeholder="Pasillo" />
                        <small>Entre 1 y 5.</small>
                    </div>
                    <div>
                        <label className={styles.label}>Estante</label>
                        <select className={styles.inputBase} ref={estanteRef} defaultValue="">
                            <option value="" disabled>Selecciona un estante</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                            <option value="E">E</option>
                            <option value="F">F</option>
                        </select>
                        <small>Selecciona un estante entre A y F.</small>
                    </div>
                    <div>
                        <label className={styles.label}>Charola</label>
                        <input className={styles.inputBase} ref={charolaRef} type="number" placeholder="Charola" />
                        <small>Entre 1 y 20.</small>
                    </div>
                    <div>
                        <label className={styles.label}>Cajón</label>
                        <input className={styles.inputBase} ref={cajonRef} type="number" placeholder="Cajón" />
                        <small>Entre 1 y 24.</small>
                    </div>
                </div>

                <span className={styles.seccion}>Imágenes</span>
                <input className={styles.inputFile} ref={imagenesRef} type="file" multiple />

                <button className={styles.btnSubmit} type="submit">
                    Registrar producto
                </button>
            </form>
        </div>
    );
}

export default RegistrarProducto;