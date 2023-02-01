import { useContext, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import UsuarioContext from "../../../contexts/UsuarioContext";
import useExcluirUsuario from '../../../hooks/api/useExcluirUsuario';
import httpStatus from "../../../utils/httpStatus";

function ModalExcluirEstudante({ show, onHide, pegarUsuarios }) {
  const location = useLocation();

  const { error, excluirUsuario, result, status } = useExcluirUsuario();

  const { usuario } = useContext(UsuarioContext);

  useEffect(() => {
    if(status === "error" && error.response && error.response.status === httpStatus.FORBIDDEN) {
      navigate('/login');
    }

    if(status === "success") {
      pegarUsuarios({ token: usuario.token });
      onHide();
    }
  }, [status]);

  function handleDelete() {
    const query = new URLSearchParams(location.search);
    const studentId = parseInt(query.get('excluirEstudante'));

    if(isNaN(studentId)) return;

    excluirUsuario({ usuarioId: studentId, token: usuario.token });
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
          Excluir estudante
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Deseja mesmo excluir este estudante?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancelar</Button>
        <Button variant="danger" onClick={handleDelete}>
          Excluir
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalExcluirEstudante;
