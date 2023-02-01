import { Button, Modal } from "react-bootstrap";

function ModalResult({ result, show, onHide, amountQuestions }) {
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
          Resultado
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Você acertou {result.respostasCertas} de {amountQuestions} questão(ões). <br />
        Sua nota foi {result.nota}.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onHide}>Fechar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalResult;
