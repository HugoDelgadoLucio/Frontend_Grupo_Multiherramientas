import { useRef } from "react";
import Swal from "sweetalert2";

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

            formData.append("nombre",nombreRef.current.value);
            formData.append("modelo",modeloRef.current.value);
            formData.append("descripcion",descripcionRef.current.value);
            formData.append("precio",precioRef.current.value);
            formData.append("existencia",existenciaRef.current.value);
            formData.append("marca",marcaRef.current.value);
            formData.append("categoria",categoriaRef.current.value);
            formData.append("pasillo",pasilloRef.current.value);
            formData.append("estante",estanteRef.current.value);
            formData.append("charola",charolaRef.current.value);
            formData.append("cajon",cajonRef.current.value);
            formData.append("tipo_corriente",tipoCorrienteRef.current.value);

            const archivos = imagenesRef.current.files;

            for(let i = 0; i < archivos.length; i++) {
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
    };

    return (
        <div>
            <h2>Registrar Producto</h2>

            <form onSubmit={registrar}>
                <input ref={nombreRef} placeholder="Nombre" />
                <br />
                <input ref={modeloRef} placeholder="Modelo" />
                <br />
                <textarea ref={descripcionRef} placeholder="Descripción" />
                <br />
                <input ref={precioRef} type="number" placeholder="Precio" />
                <br />
                <input ref={existenciaRef} type="number" placeholder="Existencia" />
                <br />
                <select ref={marcaRef} defaultValue="">
                    <option value="" disabled>Selecciona una marca</option>
                    <option value="Bosch">BOSCH</option>
                    <option value="Makita">MAKITA</option>
                    <option value="Dremel">DREMEL</option>
                </select>
                <br />
                <select ref={categoriaRef} defaultValue="">
                    <option value="" disabled>Selecciona una categoría</option>
                    <option value="Herramientas Eléctricas">Herramientas Eléctricas</option>
                    <option value="Accesorios">Accesorios</option>
                    <option value="Refacciones">Refacciones</option>
                    <option value="Alámbricas">Alámbricas</option>
                    <option value="De Batería">De Batería</option>
                </select>
                <br />
                <input ref={pasilloRef} placeholder="Pasillo" />
                <br />
                <input ref={estanteRef} placeholder="Estante" />
                <br />
                <input ref={charolaRef} placeholder="Charola" />
                <br />
                <input ref={cajonRef} placeholder="Cajón" />
                <br />
                <select ref={marcaRef} defaultValue="">
                    <option value="" disabled>Tipo corriente</option>
                    <option value="bateria">Bateria</option>
                    <option value="alambre">Alambrica</option>
                </select>
                <br />
                <input ref={imagenesRef} type="file" multiple />
                <br />
                <br />
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
}

export default RegistrarProducto;