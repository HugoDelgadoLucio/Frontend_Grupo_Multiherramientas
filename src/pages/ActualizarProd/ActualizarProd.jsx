import { useState, useRef } from "react";
import Swal from "sweetalert2";
import useProductos from "../../hooks/useProductos";
import { RiH2 } from "react-icons/ri";

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
        // Pequeño delay para que los refs estén montados antes de asignar
        setTimeout(() => {
            if (refNombre.current)        refNombre.current.value        = producto.nombre        ?? "";
            if (refModelo.current)        refModelo.current.value        = producto.modelo        ?? "";
            if (refDescripcion.current)   refDescripcion.current.value   = producto.descripcion   ?? "";
            if (refPrecio.current)        refPrecio.current.value        = producto.precio        ?? "";
            if (refExistencia.current)    refExistencia.current.value    = producto.existencia    ?? "";
            if (refMarcaId.current)       refMarcaId.current.value       = producto.marca_id      ?? "";
            if (refUbicacionId.current)   refUbicacionId.current.value   = producto.ubicacion_id  ?? "";
            if (refTipoCorriente.current) refTipoCorriente.current.value = producto.tipo_corriente ?? "";
            if (refCategoriaId.current)   refCategoriaId.current.value   = producto.categoria_id  ?? "";
            if (refActivo.current)        refActivo.current.checked      = producto.activo        ?? true;
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

        // Se toman los valores actuales de los inputs (hayan cambiado o no)
        const body = {
            id:             productoSeleccionado.id,
            nombre:         refNombre.current.value,
            modelo:         refModelo.current.value,
            descripcion:    refDescripcion.current.value,
            precio:         Number(refPrecio.current.value),
            existencia:     Number(refExistencia.current.value),
            marca_id:       refMarcaId.current.value,
            ubicacion_id:   refUbicacionId.current.value,
            tipo_corriente: refTipoCorriente.current.value,
            categoria_id:   refCategoriaId.current.value,
            activo:         refActivo.current.checked,
            descontinuado:  refDescontinuado.current.checked,
        };

        try {
            const response = await fetch("http://localhost:3000/productos/updateProduct", {
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
            <RiH2>Actualizar Producto</RiH2>

            {/* Lista de productos para seleccionar */}
            {!productoSeleccionado && productos.map(producto => (
                <div key={producto.id}>
                    <h4>{producto.nombre}</h4>
                    <div>
                        <span>ID: {producto.id}</span>
                        <button onClick={() => seleccionar(producto)}> Editar </button>
                    </div>
                </div>
            ))}

            {/* Formulario no controlado, aparece al seleccionar un producto */}
            {productoSeleccionado && (
                <div>
                    <h3>Editando: {productoSeleccionado.nombre}</h3>

                    <div>
                        <label>Nombre</label>
                        <input ref={refNombre} type="text" />
                    </div>
                    <div>
                        <label>Modelo</label>
                        <input ref={refModelo} type="text" />
                    </div>
                    <div>
                        <label>Descripción</label>
                        <textarea ref={refDescripcion} />
                    </div>
                    <div>
                        <label>Precio</label>
                        <input ref={refPrecio} type="number" step="0.01" />
                    </div>
                    <div>
                        <label>Existencia</label>
                        <input ref={refExistencia} type="number" />
                    </div>
                    <div>
                        <label>ID Marca</label>
                        <input ref={refMarcaId} type="text" />
                    </div>
                    <div>
                        <label>ID Ubicación</label>
                        <input ref={refUbicacionId} type="text" />
                    </div>
                    <div>
                        <label>Tipo corriente</label>
                        <select ref={refTipoCorriente}>
                            <option value="" disabled>Escoge un tipo</option>
                            <option value="bateria">Bateria</option>
                            <option value="alambre">Alambrico</option>
                        </select>
                    </div>
                    <div>
                        <label>ID Categoría</label>
                        <input ref={refCategoriaId} type="text" />
                    </div>
                    <div>
                        <label>Activo</label>
                        <input ref={refActivo} type="checkbox" />
                    </div>
                    <div>
                        <label>Descontinuado</label>
                        <input ref={refDescontinuado} type="checkbox" />
                    </div>

                    <button onClick={actualizar}>Guardar cambios</button>
                    <button onClick={cancelar}>Cancelar</button>
                </div>
            )}
        </div>
    );
}

export default ActualizarProd;