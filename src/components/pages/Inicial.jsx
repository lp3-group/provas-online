import { useContext } from "react";
import { Navigate } from "react-router-dom";
import UsuarioContext from "../../contexts/UsuarioContext";

function Inicial() {
  const { usuario } = useContext(UsuarioContext);

  if(!usuario) {
    return <Navigate to="/login" />;
  }

  if(usuario.tipoUsuario === "administrador") {
    return <Navigate to="/disciplinas" />;
  }

  return <Navigate to="/provas" />
}

export default Inicial;
