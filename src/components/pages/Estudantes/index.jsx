import { useContext, useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import UsuarioContext from "../../../contexts/UsuarioContext";
import usePegarUsuarios from '../../../hooks/api/usePegarUsuarios';
import httpStatus from "../../../utils/httpStatus";
import ModalExcluirEstudante from "./ModalExcluirEstudante";
import ModalFormEstudante from "./ModalFormEstudante";

function Estudantes() {
  const navigate = useNavigate();

  const { error, pegarUsuarios, result, status } = usePegarUsuarios();

  const { usuario } = useContext(UsuarioContext);

  const [showEstudanteFormModal, setShowEstudanteFormModal] = useState(false);
  const [showExcluirEstudanteModal, setShowExcluirEstudanteModal] = useState(false);

  useEffect(() => {
    pegarUsuarios({ token: usuario.token });
  }, []);

  useEffect(() => {
    if(status === "error" && error.response && error.response.status === httpStatus.FORBIDDEN) {
      navigate('/login');
    }
  }, [status]);

  function deleteUser(studentId) {
    navigate(`/estudantes?excluirEstudante=${studentId}`);
    setShowExcluirEstudanteModal(true);
  }

  return (
    <>
      <Container className="my-3 col-sm-10">
        <TituloPaginaContainer>
            <h1>Estudantes</h1>

            <div>
              <Button onClick={() => setShowEstudanteFormModal(true)}>
                Cadastrar Estudante
              </Button>
            </div>
          </TituloPaginaContainer>


          { result && result.data && result.data.estudantes.length > 0 ? <Table size="sm" striped bordered hover>
            <thead>
              <tr>
                <th className='col-sm-1'>#</th>
                <th className='col-sm-3'>Nome</th>
                <th className='col-sm-2'>Sobrenome</th>
                <th className='col-sm-2'>Nome de Usuário</th>
                <th className='col-sm-2'>Matrícula</th>
                <th className='col-sm-2 text-center'>Opções</th>
              </tr>
            </thead>
            <tbody>
              {result.data.estudantes.map((estudante, indice) => {
                return (
                  <tr key={estudante.id}>
                    <td className='col-sm-1'>{indice + 1}</td>
                    <td className='col-sm-3'>{estudante.nome}</td>
                    <td className='col-sm-2'>{estudante.sobrenome}</td>
                    <td className='col-sm-2'>{estudante.nomeUsuario}</td>
                    <td className='col-sm-2'>{estudante.matricula}</td>
                    <td className='col-sm-2 text-center'>
                      <Button variant="danger" onClick={() => deleteUser(estudante.id)}>Excluir</Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <th colSpan={5}>Total</th>
                <td className='text-center'>{result.data.estudantes.length} resultado(s)</td>
              </tr>
            </tfoot>
          </Table> : <h6>Nenhum estudante encontrado</h6> }
      </Container>

      <ModalFormEstudante pegarUsuarios={pegarUsuarios} show={showEstudanteFormModal} onHide={() => setShowEstudanteFormModal(false)} modalTitle="Cadastrar estudante" />

      <ModalExcluirEstudante pegarUsuarios={pegarUsuarios} show={showExcluirEstudanteModal} onHide={() => setShowExcluirEstudanteModal(false)} />
    </>
  )
}

const TituloPaginaContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
`;

export default Estudantes;
