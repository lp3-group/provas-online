import { useContext, useEffect, useState } from 'react';
import { Button, Table, Container } from 'react-bootstrap';
import usePegarDisciplinas from '../../../hooks/api/usePegarDisciplinas';
import styled from 'styled-components';
import UsuarioContext from '../../../contexts/UsuarioContext';
import { useNavigate } from 'react-router-dom';
import httpStatus from '../../../utils/httpStatus';
import ModalDisciplina from './ModalDisciplina';
import ModalExcluir from './ModalExcluir';

function Disciplinas() {
  const navigate = useNavigate();

  const [mostrarModalCadastro, setMostrarModalCadastro] = useState(false);
  const [mostrarModalExcluir, setMostrarModalExcluir] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [selectedDiscipline, setSelectedDiscipline] = useState({ id: null, nome: '' });

  const { error, pegarDisciplinas, result, status } = usePegarDisciplinas();

  const { usuario } = useContext(UsuarioContext);

  useEffect(() => {
    pegarDisciplinas({ token: usuario.token });
  }, []);

  useEffect(() => {
    if (status === 'error') {
      if (error.response && error.response.status === httpStatus.FORBIDDEN) {
        navigate('/login');
      }
    }
  }, [status]);

  function excluirDisciplina(disciplina) {
    setSelectedDiscipline(disciplina);
    setMostrarModalExcluir(true);
  }

  function editarDisciplina(disciplina) {
    setSelectedDiscipline(disciplina);
    setMostrarModalEditar(true);
  }

  return (result && result.data) && (
    <>
      <Container className="my-3 col-sm-10">
        <TituloPaginaContainer>
          <h1>Disciplinas</h1>

          <div>
            <Button onClick={() => setMostrarModalCadastro(true)}>
              Cadastrar Disciplina
            </Button>
          </div>
        </TituloPaginaContainer>

        <Table size="sm" striped bordered hover>
          <thead>
            <tr>
              <th className='col-sm-1'>#</th>
              <th className='col-sm-9'>Nome</th>
              <th className='col-sm-2 text-center'>Opções</th>
            </tr>
          </thead>
          <tbody>
            {result.data.map((disciplina, indice) => {
              return (
                <tr key={disciplina.id}>
                  <td className='col-sm-1'>{indice + 1}</td>
                  <td className='col-sm-9'>{disciplina.nome}</td>
                  <td className='col-sm-2 text-center'>
                    <Button variant="secondary" onClick={() => editarDisciplina(disciplina)}>Editar</Button>
                    <Button variant="danger" className="ms-2" onClick={() => excluirDisciplina(disciplina)}>Excluir</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <th colSpan={2}>Total</th>
              <td className='text-center'>{result.data.length} resultado(s)</td>
            </tr>
          </tfoot>
        </Table>
      </Container>

      <ModalDisciplina
        show={mostrarModalCadastro}
        onHide={() => setMostrarModalCadastro(false)}
        modalTitle="Cadastrar disciplina"
        formActionType="create"
        submitFormButtonLabel="Cadastrar"
        successCallback={() => pegarDisciplinas({ token: usuario.token })}
      />

      <ModalDisciplina
        show={mostrarModalEditar}
        onHide={() => setMostrarModalEditar(false)}
        modalTitle="Editar disciplina"
        formActionType="update"
        submitFormButtonLabel="Salvar"
        successCallback={() => pegarDisciplinas({ token: usuario.token })}
        disciplineData={selectedDiscipline}
      />

      <ModalExcluir
        show={mostrarModalExcluir}
        onHide={() => setMostrarModalExcluir(false)}
        idDisciplina={selectedDiscipline.id}
        pegarDisciplinas={pegarDisciplinas}
      />
    </>
  );
}

const TituloPaginaContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
`;

export default Disciplinas;
