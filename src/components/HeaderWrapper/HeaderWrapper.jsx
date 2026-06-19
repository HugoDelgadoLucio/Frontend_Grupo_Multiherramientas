import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import HeaderSimplificado from "../HeaderSimplificado/HeaderSimplificado";

export default function HeaderWrapper() {
  const location = useLocation();
  const esInicio = location.pathname === "/";

  return esInicio ? <Header /> : <HeaderSimplificado />;
}