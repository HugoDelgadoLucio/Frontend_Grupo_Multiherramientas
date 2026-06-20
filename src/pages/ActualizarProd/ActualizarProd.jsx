import { useState, useRef } from "react";
import Swal from "sweetalert2";
import useProductos from "../../hooks/useProductos";
import styles from "./ActualizarProd.module.css";

function ActualizarProd() {
    const { productos, loading, error } = useProductos("", "", true);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);

    // Refs para formulario no controlado
    const refNombre       = useRef(null);
    const refModelo       = useRef(null);
    const refDescripcion  = useRef(null);
    const refPrecio       = useRef(null);
    const refExistencia   = useRef(null);
    const refMarcaId      = useRef(null);
    const refUbicacionId  = useRef(null);
    const refTipoCorriente = useRef(null);
    const refCategoriaId  = useRef(null);
    const refActivo       = useRef(null);
    const refDescontinuado = useRef(null);

    const seleccionar = (producto) => {
        setProductoSeleccionado(producto);
        setTimeout(() => {
            if (refNombre.current) refNombre.current.value = producto.nombre ?? "";
            if (refModelo.current) refModelo.current.value = producto.modelo ?? "";
            if (refDescripcion.current) refDescripcion.current.value = producto.descripcion ?? "";
            if (refPrecio.current) refPrecio.current.value = producto.precio ?? "";
            if (refExistencia.current) refExistencia.current.value = producto.existencia ?? "";
            if (refMarcaId.current) refMarcaId.current.value = producto.marca_id ?? "";
            if (refUbicacionId.current) refUbicacionId.current.value = producto.ubicacion_id ?? "";
            if (refTipoCorriente.current) refTipoCorriente.current.value = producto.tipo_corriente ?? "";
            if (refCategoriaId.current) refCategoriaId.current.value = producto.categoria_id ?? "";
            if (refActivo.current) refActivo.current.checked = producto.activo ?? true;
            if (refDescontinuado.current) refDescontinuado.current.checked = producto.descontinuado ?? false;
        }, 0);
    };

    const actualizar = async () => {
        if (!productoSeleccionado) return;

        const token = localStorage.getItem("token");
        if (!token) {
            Swal.fire({ icon: "error", title: "Sin sesión", text: "Debes iniciar sesión como admin" });
            return;
        }

        const body = {
            id: productoSeleccionado.id,
            nombre: refNombre.current.value,
            modelo: refModelo.current.value,
            descripcion: refDescripcion.current.value,
            precio: Number(refPrecio.current.value),
            existencia: Number(refExistencia.current.value),
            marca_id: refMarcaId.current.value,
            ubicacion_id: refUbicacionId.current.value,
            tipo_corriente: refTipoCorriente.current.value,
            categoria_id: refCategoriaId.current.value,
            activo: refActivo.current.checked,
            descontinuado: refDescontinuado.current.checked,
        };

        try {
            //const response = await fetch("http://localhost:3000/productos/updateProduct", {
            const response = await fetch("https://backend-grupo-multiherramientas.onrender.com/productos/updateProduct", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(body)
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.mensaje || "Error al actualizar");

            await Swal.fire({ icon: "success", title: "Producto actualizado" });
            setProductoSeleccionado(null);
            window.location.reload();

        } catch (error) {
            Swal.fire({ icon: "error", title: "Error", text: error.message });
        }
    };

    const cancelar = () => setProductoSeleccionado(null);

    if (loading) return <p>Cargando...</p>;
    if (error)   return <p>{error}</p>;

    return (
        <div>
            <h2 className={styles.titulo}>Actualizar Producto</h2>

            {/* Lista de productos para seleccionar */}
        {!productoSeleccionado && productos.map(producto => (
            <div className={styles.ProductCard} key={producto.id}>
                <h4>{producto.nombre}</h4>
                <div className={styles.cardFooter}>
                    <span className={styles.idTag}>ID: {producto.id}</span>
                    <button
                        className={styles.btnEditar}
                        onClick={() => seleccionar(producto)}
                    >
                        Editar
                    </button>
                </div>
            </div>
        ))}

            {/* Formulario no controlado, aparece al seleccionar un producto */}
{productoSeleccionado && (
    <div className={styles.formCard}>
        <h3 className={styles.formTitulo}>Editando: {productoSeleccionado.nombre}</h3>

        <div className={styles.field}>
            <label className={styles.label}>Nombre</label>
            <input className={styles.inputBase} ref={refNombre} type="text" />
        </div>

        <div className={styles.field}>
            <label className={styles.label}>Modelo</label>
            <input className={styles.inputBase} ref={refModelo} type="text" />
        </div>

        <div className={styles.field}>
            <label className={styles.label}>Descripción</label>
            <textarea className={styles.inputBase} ref={refDescripcion} rows={4} />
        </div>

        <div className={styles.grid2}>
            <div className={styles.field}>
                <label className={styles.label}>Precio</label>
                <input className={styles.inputBase} ref={refPrecio} type="number" step="0.01" />
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Existencia</label>
                <input className={styles.inputBase} ref={refExistencia} type="number" />
            </div>
        </div>

        <div className={styles.grid2}>
            <div className={styles.field}>
                <label className={styles.label}>ID Marca</label>
                <input className={styles.inputBase} ref={refMarcaId} type="text" />
            </div>
            <div className={styles.field}>
                <label className={styles.label}>ID Ubicación</label>
                <input className={styles.inputBase} ref={refUbicacionId} type="text" />
            </div>
        </div>

        <div className={styles.grid2}>
            <div className={styles.field}>
                <label className={styles.label}>Tipo corriente</label>
                <select className={styles.inputBase} ref={refTipoCorriente}>
                    <option value="" disabled>Escoge un tipo</option>
                    <option value="bateria">Bateria</option>
                    <option value="alambre">Alambrico</option>
                </select>
            </div>
            <div className={styles.field}>
                <label className={styles.label}>ID Categoría</label>
                <input className={styles.inputBase} ref={refCategoriaId} type="text" />
            </div>
        </div>

        <div className={styles.checkboxGroup}>
            <div className={styles.checkboxRow}>
                <input className={styles.checkbox} ref={refActivo} type="checkbox" id="activoEdit" />
                <label className={styles.checkboxLabel} htmlFor="activoEdit">Activo</label>
            </div>
            <div className={styles.checkboxRow}>
                <input className={styles.checkbox} ref={refDescontinuado} type="checkbox" id="descontinuadoEdit" />
                <label className={styles.checkboxLabel} htmlFor="descontinuadoEdit">Descontinuado</label>
            </div>
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

export default ActualizarProd;