import { useState } from "react";
import Swal from "sweetalert2";

function UbicacionProds() {

    const [pasillo, setPasillo] = useState("");
    const [estante, setEstante] = useState("");
    const [cajon, setCajon] = useState("");
    const [charola, setCharola] = useState("");

    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [buscado, setBuscado] = useState(false);

    const pasillos = Array.from({ length: 5 }, (_, i) => String(i + 1));
    const estantes = Array.from({ length: 6 }, (_, i) => String.fromCharCode(65 + i));
    const cajones = Array.from({ length: 4 }, (_, i) => String(i + 1));
    const charolas = Array.from({ length: 20 }, (_, i) => String(i + 1));

    const buscar = async (e) => {
        e.preventDefault();

        if (!pasillo || !estante || !cajon || !charola) {
            Swal.fire({ icon: "warning", title: "Completa todos los campos" });
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            Swal.fire({ icon: "error", title: "Sin sesión", text: "Debes iniciar sesión" });
            return;
        }

        setLoading(true);
        setError("");
        setBuscado(true);

        try {
            const response = await fetch("http://localhost:3000/ubicaciones/productosPorUbicacion", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ pasillo, estante, charola, cajon })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.mensaje || "Error al buscar productos");
            }

            setProductos(data.data);

        } catch (err) {
            setError(err.message);
            setProductos([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Buscar productos por ubicación</h2>

            <form onSubmit={buscar}>

                <div>
                    <div>
                        <label>Pasillo</label>
                        <select value={pasillo} onChange={(e) => setPasillo(e.target.value)}>
                            <option value="" disabled>Selecciona pasillo</option>
                            {pasillos.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                    </div>

                    <div>
                        <label>Estante</label>
                        <select value={estante} onChange={(e) => setEstante(e.target.value)}>
                            <option value="" disabled>Selecciona estante</option>
                            {estantes.map(e => <option key={e} value={e}>{e}</option>)}
                        </select>
                    </div>

                    <div>
                        <label>Cajón</label>
                        <select value={cajon} onChange={(e) => setCajon(e.target.value)}>
                            <option value="" disabled>Selecciona cajón</option>
                            {cajones.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    <div>
                        <label>Charola</label>
                        <select value={charola} onChange={(e) => setCharola(e.target.value)}>
                            <option value="" disabled>Selecciona charola</option>
                            {charolas.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                </div>

                <button type="submit">
                    Buscar productos
                </button>

            </form>

            {loading && <p>Buscando...</p>}
            {error && <p>{error}</p>}

            {!loading && !error && buscado && (
                <div>
                    {productos.length === 0 ? (
                        <p>No se encontraron productos en esa ubicación.</p>
                    ) : (
                        productos.map(producto => (
                            <div key={producto.id}>
                                <h4>{producto.nombre}</h4>
                                <div>
                                    <span>${producto.precio}</span>
                                    <span>ID: {producto.id}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default UbicacionProds;