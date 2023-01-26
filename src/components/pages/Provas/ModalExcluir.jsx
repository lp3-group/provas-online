import { useContext, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import UsuarioContext from "../../../contexts/UsuarioContext";
import useExcluirProva from '../../../hooks/api/useExcluirProva';
import httpStatus from "../../../utils/httpStatus";

function ModalExcluir({ show, onHide, pegarProvas }) {
  const location = useLocation();
  const navigate = useNavigate();

  const { usuario } = useContext(UsuarioContext);

  const { error, excluirProva, status } = useExcluirProva();

  useEffect(() => {
    if(status === "error" && error.response && error.response.status === httpStatus.FORBIDDEN) {
      navigate('/login');
    }

    if(status === "success") {
      pegarProvas({ token: usuario.token });
      navigate('/provas');
      onHide();
    }
  }, [status]);

  function handleDelete() {
    const query = new URLSearchParams(location.search);
    const provaId = parseInt(query.get('excluir'));

    if(isNaN(provaId)) return;

    excluirProva({ provaId, token: usuario.token });
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
          Excluir prova
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Deseja mesmo excluir esta prova?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancelar</Button>
        <Button variant="danger" onClick={handleDelete} disabled={status === 'pending'}>
          Excluir
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalExcluir;
