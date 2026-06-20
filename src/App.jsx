import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import HeaderWrapper from './components/HeaderWrapper/HeaderWrapper';
import Footer from './components/Footer/Footer';
import Inicio from './pages/Inicio/Inicio';
import NotFound from './pages/NotFound/NotFound';
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const Contacto = lazy(() => import('./pages/Contacto/Contacto'));
const Login = lazy(() => import('./pages/Login/Login'));
const Registro = lazy(() => import('./pages/Registro/Registro'));
const Productos = lazy(() => import('./pages/Productos/Productos'));
const PanelAdmin = lazy(() => import('./pages/PanelAdmin/PanelAdmin'));
const CatalogoAdmin = lazy(() => import('./pages/CatalogoAdmin/CatalogoAdmin'));
const EliminarProducto = lazy(() => import('./pages/EliminarProducto/EliminarProducto'));
const RegistrarProducto = lazy(() => import('./pages/RegistrarProducto/RegistrarProducto'));
const ActualizarProd = lazy(() => import('./pages/ActualizarProd/ActualizarProd'));
const ActualizarNoti = lazy(() => import('./pages/ActualizarNoti/ActualizarNoti'));
const RegistroNoticia = lazy(() => import('./pages/RegistroNoticia/RegistroNoticia'));
const EliminarNoti = lazy(() => import('./pages/EliminarNoti/EliminarNoti'));
const CatalogoNotis = lazy(() => import('./pages/CatalogoNotis/CatalogoNotis'));
const Producto = lazy(() => import("./pages/Producto/Producto"));
const Recuperacion = lazy(() => import('./pages/Recuperacion/Recuperacion'));
const CambioContra = lazy(() => import('./pages/CambioContra/CambioContra'));
const Busqueda = lazy(() => import('./pages/Busqueda/Busqueda'));
const ListNoticias = lazy(() => import('./pages/ListNoticias/ListNoticias'));
const VerNoticia = lazy(() => import('./pages/VerNoticia/VerNoticia'));
const UbicacionProds = lazy(() => import('./pages/UbicacionProds/UbicacionProds'));

function App() {
	return (
		<>
			<HashRouter>
				<HeaderWrapper />

				<main>
					<Suspense fallback={<p>Cargando...</p>}>
						<Routes>
							<Route path="/" element={<Inicio />} />
							<Route path="/contacto" element={<Contacto />} />
							<Route path="/login" element={<Login />} />
							<Route path="/recuperarContrasena" element={<Recuperacion />} />
							<Route path="/reset-password" element={<CambioContra />} />
							<Route path="/registro" element={<Registro />} />
							<Route path="/productos" element={<Productos />} />
							<Route path="/productos/:id" element={<Producto />} />
							<Route path="/noticias" element={<ListNoticias />} />
							<Route path="/noticias/:id" element={<VerNoticia />} />
							<Route path="/busqueda" element={<Busqueda />} />
							<Route path="/admin" element={
								<ProtectedRoute>
									<PanelAdmin />
								</ProtectedRoute>
							}>
								<Route path="catalogo" element={<CatalogoAdmin />} />
								<Route path="eliminar" element={<EliminarProducto />} />
								<Route path="actualizar" element={<ActualizarProd />} />
								<Route path="registrar" element={<RegistrarProducto />} />
								<Route path="ubicacion" element={<UbicacionProds />} />
								<Route path="actualizarNoti" element={<ActualizarNoti />} />
								<Route path="registroNoticia" element={<RegistroNoticia />} />
								<Route path="eliminarNoti" element={<EliminarNoti />} />
								<Route path="catalogoNoti" element={<CatalogoNotis />} />
							</Route>
							<Route path="*" element={<NotFound />} />
						</Routes>
					</Suspense>
				</main>

				<Footer />
			</HashRouter>
		</>
	);
}

export default App;