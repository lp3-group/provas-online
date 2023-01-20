import { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import UsuarioContext from "../../../contexts/UsuarioContext";
import useCriarDisciplina from "../../../hooks/api/useCriarDisciplina";
import useEditarDisciplina from "../../../hooks/api/useEditarDisciplina";
import httpStatus from "../../../utils/httpStatus";

function ModalDisciplina({
  show,
  onHide,
  modalTitle,
  submitFormButtonLabel = "Cadastrar",
  successCallback,
  formActionType = "create",
  disciplineData: { nome, id } = { nome: null, id: null }
}) {
  const { usuario } = useContext(UsuarioContext);

  const action = isCreateActionType() ? useCriarDisciplina() : useEditarDisciplina();

  const [form, setForm] = useState({ nome });

  useEffect(() => {
    if (action.status === 'success') {
      onHide();
      successCallback();
    }

    if (action.status === 'error') {
      if (action.error.response && action.error.response.status === httpStatus.FORBIDDEN) {
        navigate('/login');
      }
    }
  }, [action.status]);

  useEffect(() => {
    setForm({ nome });
  }, [nome]);

  function isCreateActionType() {
    return formActionType === "create";
  }

  function submitForm() {
    const payload = { ...form, ...(!isCreateActionType() && { disciplinaId: id}), token: usuario.token };

    action[isCreateActionType() ? 'criarDisciplina' : 'editarDisciplina'](payload);
  }

  function isLoading() {
    return action.status === 'pending';
  }

  function handleChange(event) {
    setForm({ nome: event.target.value });
  }

  return (
    <Modal
      show={show}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {modalTitle}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(event) => event.preventDefault()}>
          <Form.Group className="mb-3" controlId="formBasicNome">
            <Form.Label>Nome:</Form.Label>
            <Form.Control onChange={handleChange} value={form.nome} disabled={isLoading()} name="nome" type="text" placeholder="Digite o nome da disciplina" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancelar</Button>
        <Button variant="primary" disabled={isLoading()} onClick={submitForm}>
          {submitFormButtonLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalDisciplina;
