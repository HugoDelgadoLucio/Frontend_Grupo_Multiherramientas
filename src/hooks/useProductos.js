import { useState, useEffect } from "react";

const useProductos = (categoriaFiltro = "", marcaFiltro = "") => {
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

                if (marcaFiltro) {
                    response = await fetch("http://localhost:3000/productos/productosMarca", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ marca: marcaFiltro }),
                        signal: controller.signal
                    });
                } else if (categoriaFiltro) {
                    response = await fetch("http://localhost:3000/productos/productosCategoria", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ categoria: categoriaFiltro }),
                        signal: controller.signal
                    });
                } else {
                    response = await fetch("http://localhost:3000/productos", {
                        signal: controller.signal
                    });
                }

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.mensaje || "Error al obtener productos");
                }

                const data = await response.json();
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
    }, [categoriaFiltro, marcaFiltro]);

    return { productos, loading, error };
};

export default useProductos;