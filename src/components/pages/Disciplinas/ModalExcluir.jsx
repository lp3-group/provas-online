import { useContext, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UsuarioContext from "../../../contexts/UsuarioContext";
import useExcluirDisciplina from "../../../hooks/api/useExcluirDisciplina";

function ModalExcluir({ onHide, pegarDisciplinas, idDisciplina, show }) {
  const { usuario } = useContext(UsuarioContext);

  const { error, status, excluirDisciplina: excluir } = useExcluirDisciplina();

  const navigate = useNavigate();

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

export default ModalExcluir;
