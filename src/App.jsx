import './App.css'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Inicio from './pages/Inicio/Inicio';
import Contacto from './pages/Contacto/Contacto';
import Login from './pages/Login/Login';
import Registro from './pages/Registro/Registro';

function App() {

	return (
		<BrowserRouter>

			<nav>
				<Link to="/">Inicio</Link> | { }
				{/*<Link to="/login">Productos</Link> |*/}
				<Link to="/contacto">Contacto</Link> | { }
				{/*<Link to="/login">Marcas</Link> |
				<Link to="/">Promociones</Link> |*/}
				<Link to="/registro">Registro</Link> | { }
				<Link to="/login">Ingresar</Link> 
			</nav>

			<Routes>
				<Route path="/" element={<Inicio />} />
				<Route path="/registro" element={<Registro />} />
				<Route path="/login" element={<Login />} />
				<Route path="/contacto" element={<Contacto />} /> 
			</Routes>

		</BrowserRouter>
	)
}

export default App