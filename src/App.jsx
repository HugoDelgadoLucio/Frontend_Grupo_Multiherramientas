import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Inicio from './pages/Inicio/Inicio';
import NotFound from './pages/NotFound/NotFound';
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

// Lazy loading para las demás páginas
const Contacto = lazy(() => import('./pages/Contacto/Contacto'));
const Login = lazy(() => import('./pages/Login/Login'));
const Registro = lazy(() => import('./pages/Registro/Registro'));
const Productos = lazy(() => import('./pages/Productos/Productos'));
const PanelAdmin = lazy(() => import("./pages/PanelAdmin/PanelAdmin"));
const CatalogoAdmin = lazy(() => import("./pages/CatalogoAdmin/CatalogoAdmin"));
const EliminarProducto = lazy(() => import("./pages/EliminarProducto/EliminarProducto"));
const RegistrarProducto = lazy(() => import("./pages/RegistrarProducto/RegistrarProducto"));

function App() {
	return (
		<>
			<BrowserRouter>
				<Header />

				<main>
					<Suspense fallback={<p>Cargando...</p>}>
						<Routes>
							<Route path="/" element={<Inicio />} />
							<Route path="/contacto" element={<Contacto />} />
							<Route path="/login" element={<Login />} />
							<Route path="/registro" element={<Registro />} />
							<Route path="/productos" element={<Productos />} />
							<Route path="/admin" element={
								<ProtectedRoute>
									<PanelAdmin />
								</ProtectedRoute>
							}>
								<Route path="catalogo" element={<CatalogoAdmin />} />
								<Route path="eliminar" element={<EliminarProducto />} />
								<Route path="registrar" element={<RegistrarProducto />} />
							</Route>
							<Route path="*" element={<NotFound />} />
						</Routes>
					</Suspense>
				</main>

				<Footer />
			</BrowserRouter>
		</>
	);
}

export default App;