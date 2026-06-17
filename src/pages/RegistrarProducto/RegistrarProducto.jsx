import { useRef } from "react";
import Swal from "sweetalert2";
import styles from "./RegistrarProducto.module.css";

function RegistrarProducto() {

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

        try {

            const formData = new FormData();

            formData.append("nombre", nombreRef.current.value);
            formData.append("modelo", modeloRef.current.value);
            formData.append("descripcion", descripcionRef.current.value);
            formData.append("precio", precioRef.current.value);
            formData.append("existencia", existenciaRef.current.value);
            formData.append("marca", marcaRef.current.value);
            formData.append("categoria", categoriaRef.current.value);
            formData.append("pasillo", pasilloRef.current.value);
            formData.append("estante", estanteRef.current.value);
            formData.append("charola", charolaRef.current.value);
            formData.append("cajon", cajonRef.current.value);
            formData.append("tipo_corriente", tipoCorrienteRef.current.value);

            const archivos = imagenesRef.current.files;

            for (let i = 0; i < archivos.length; i++) {
                formData.append(
                    "imagenes",
                    archivos[i]
                );
            }

            const response = await fetch("http://localhost:3000/productos",
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

                <label className={styles.label}>Modelo</label>
                <input className={styles.inputBase} ref={modeloRef} placeholder="Modelo" />

                <label className={styles.label}>Descripción</label>
                <textarea className={styles.inputBase} ref={descripcionRef} placeholder="Descripción del producto" />

                <div className={styles.grid2}>
                    <div>
                        <label className={styles.label}>Precio</label>
                        <input className={styles.inputBase} ref={precioRef} type="number" placeholder="0.00" />
                    </div>
                    <div>
                        <label className={styles.label}>Existencia</label>
                        <input className={styles.inputBase} ref={existenciaRef} type="number" placeholder="0" />
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
                        <input className={styles.inputBase} ref={pasilloRef} placeholder="Pasillo" />
                    </div>
                    <div>
                        <label className={styles.label}>Estante</label>
                        <input className={styles.inputBase} ref={estanteRef} placeholder="Estante" />
                    </div>
                    <div>
                        <label className={styles.label}>Charola</label>
                        <input className={styles.inputBase} ref={charolaRef} placeholder="Charola" />
                    </div>
                    <div>
                        <label className={styles.label}>Cajón</label>
                        <input className={styles.inputBase} ref={cajonRef} placeholder="Cajón" />
                    </div>
                </div>

                <span className={styles.seccion}>Imágenes</span>
                <input className={styles.inputBase} ref={imagenesRef} type="file" multiple />

                <button className={styles.btnSubmit} type="submit">
                    Registrar producto
                </button>

            </form>
        </div>
    );
}

export default RegistrarProducto;