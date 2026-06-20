import { useState, useEffect } from "react";

const useProductos = (categoriaFiltro = "", marcaFiltro = "", soloActivos = false) => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        const fetchProductos = async () => {
            setLoading(true);
            setError(null);

            try {
                let response;

                if (soloActivos) {
                    response = await fetch(
                        //"http://localhost:3000/productos/activos",
                        "https://backend-grupo-multiherramientas.onrender.com/productos/activos",
                        {
                            signal: controller.signal
                        }
                    );
                } else if (marcaFiltro) {
                    //response = await fetch("http://localhost:3000/productos/productosMarca", {
                    response = await fetch("https://backend-grupo-multiherramientas.onrender.com/productos/productosMarca", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ marca: marcaFiltro }),
                        signal: controller.signal
                    });
                } else if (categoriaFiltro) {
                    //response = await fetch("http://localhost:3000/productos/productosCategoria", {
                    response = await fetch("https://backend-grupo-multiherramientas.onrender.com/productos/productosCategoria", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ categoria: categoriaFiltro }),
                        signal: controller.signal
                    });
                } else {
                    //response = await fetch("http://localhost:3000/productos", {
                    response = await fetch("https://backend-grupo-multiherramientas.onrender.com/productos", {
                        signal: controller.signal
                    });
                }

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.mensaje || "Error al obtener productos");
                }

                const data = await response.json();
                console.log(data.data);
                setProductos(data.data);

            } catch (err) {
                if (err.name !== "AbortError") {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProductos();
        return () => controller.abort();
    }, [categoriaFiltro, marcaFiltro, soloActivos]);

    return { productos, loading, error };
};

export default useProductos;