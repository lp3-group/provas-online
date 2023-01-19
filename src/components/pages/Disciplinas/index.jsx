import { useContext, useEffect, useRef, useState } from 'react';
import { Button, Table, Container, Modal, Form } from 'react-bootstrap';
import usePegarDisciplinas from '../../../hooks/api/usePegarDisciplinas';
import useCriarDisciplina from '../../../hooks/api/useCriarDisciplina';
import styled from 'styled-components';
import transformarFormEmObjeto from '../../../utils/transformarFormEmObjeto';
import UsuarioContext from '../../../contexts/UsuarioContext';
import { useNavigate } from 'react-router-dom';
import httpStatus from '../../../utils/httpStatus';
import useExcluirDisciplina from '../../../hooks/api/useExcluirDisciplina';

function Disciplinas() {
  const navigate = useNavigate();

  const [mostrarModalCadastro, setMostrarModalCadastro] = useState(false);
  const [mostrarModalExcluir, setMostrarModalExcluir] = useState(false);
  const [idDisciplinaExcluir, setIdDisciplinaExcluir] = useState(null);

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

  function excluirDisciplina(disciplinaId) {
    setIdDisciplinaExcluir(disciplinaId);
    setMostrarModalExcluir(true);
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
                    <Button variant="secondary">Editar</Button>
                    <Button variant="danger" className="ms-2" onClick={() => excluirDisciplina(disciplina.id)}>Excluir</Button>
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

      <ModalCadastro
        show={mostrarModalCadastro}
        onHide={() => setMostrarModalCadastro(false)}
        pegarDisciplinas={pegarDisciplinas}
      />

      <ModalExcluir
        show={mostrarModalExcluir}
        onHide={() => setMostrarModalExcluir(false)}
        idDisciplina={idDisciplinaExcluir}
        pegarDisciplinas={pegarDisciplinas}
      />
    </>
  );
}

function ModalExcluir({ onHide, pegarDisciplinas, idDisciplina, show }) {
  const { usuario } = useContext(UsuarioContext);

  const { error, status, excluirDisciplina: excluir } = useExcluirDisciplina();

  useEffect(() => {
    if (status === 'success') {
      onHide();
      pegarDisciplinas({ token: usuario.token });
    }

    if (status === 'error') {
      if (error.response && error.response.status === httpStatus.FORBIDDEN) {
        navigate('/login');
      }
    }
  }, [status]);

  function excluirDisciplina() {
    excluir({ disciplinaId: idDisciplina, token: usuario.token });
  }

  function isLoading() {
    return status === 'pending';
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Excluir disciplina
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Deseja mesmo excluir esta disciplina?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancelar</Button>
        <Button variant="danger" disabled={isLoading()} onClick={excluirDisciplina}>
          Excluir
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function ModalCadastro(props) {
  const formEl = useRef();

  const { usuario } = useContext(UsuarioContext);

  const { criarDisciplina, error, status } = useCriarDisciplina();

  useEffect(() => {
    if (status === 'success') {
      props.onHide();
      props.pegarDisciplinas({ token: usuario.token });
    }

    if (status === 'error') {
      if (error.response && error.response.status === httpStatus.FORBIDDEN) {
        navigate('/login');
      }
    }
  }, [status]);

  function enviarFormulario() {
    const { nome } = transformarFormEmObjeto(formEl)

    criarDisciplina({ nome, token: usuario.token });
  }

  function isLoading() {
    return status === 'pending';
  }

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Cadastrar disciplina
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form ref={formEl}>
          <Form.Group className="mb-3" controlId="formBasicNome">
            <Form.Label>Nome:</Form.Label>
            <Form.Control disabled={isLoading()} name="nome" type="text" placeholder="Digite o nome da disciplina" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>Cancelar</Button>
        <Button variant="primary" disabled={isLoading()} onClick={enviarFormulario}>
          Cadastrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

const TituloPaginaContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
`;

export default Disciplinas;
