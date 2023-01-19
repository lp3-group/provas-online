import { useContext, useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import UsuarioContext from '../../contexts/UsuarioContext';

function Cabecalho() {
  const location = useLocation();
  const navigate = useNavigate();

  const { usuario, setUsuario } = useContext(UsuarioContext);

  useEffect(() => {
    document.title = "Provas online";
  }, []);

  function pegarTipoUsuario() {
    if (location.state && location.state.tipoUsuario) {
      return location.state.tipoUsuario;
    }

    return usuario.tipoUsuario;
  }

  function podeRenderizar() {
    return ["/login", "/alterarSenha"].includes(location.pathname);
  }

  return podeRenderizar() ?
    null :
    (
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Provas online</Navbar.Brand>

          <Nav className="me-auto">
            {
              pegarTipoUsuario() === "administrador" ?
                <OpcoesCabecalhoAdministrador />
                : <OpcoesCabecalhoEstudante />
            }

            <Nav.Link>
              <LinkEstilizado to="/login">Sair</LinkEstilizado>
            </Nav.Link>
          </Nav>

          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Logado como: <NomeUsuario>{usuario.nomeUsuario}</NomeUsuario>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}

function OpcoesCabecalhoAdministrador() {
  return (
    <>
      <Nav.Link>
        <LinkEstilizado to="/disciplinas">Disciplinas</LinkEstilizado>
      </Nav.Link>
      <Nav.Link>
        <LinkEstilizado to="/provas">Provas</LinkEstilizado>
      </Nav.Link>
      <Nav.Link>
        <LinkEstilizado to="/usuarios">Usuários</LinkEstilizado>
      </Nav.Link>
    </>
  );
}

function OpcoesCabecalhoEstudante() {
  return (
    <>
      <Nav.Link>
        <LinkEstilizado to="/provas">Provas</LinkEstilizado>
      </Nav.Link>
      <Nav.Link>
        <LinkEstilizado to="/provas/realizadas">Provas Realizadas</LinkEstilizado>
      </Nav.Link>
    </>
  );
}

const NomeUsuario = styled.span`
  color: white;
  font-weight: bold;
  font-size: 17px;
`;

const LinkEstilizado = styled(Link)`
  color: white;
  text-decoration: none;

  :hover {
    transition: 0.15s;
    color: #ffffffbc;
  }
`;

export default Cabecalho;
