import { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import useCriarUsuario from '../../../hooks/api/useCriarUsuario';
import UsuarioContext from '../../../contexts/UsuarioContext';
import httpStatus from "../../../utils/httpStatus";

function ModalFormEstudante({ show, onHide, modalTitle, pegarUsuarios }) {
  const { criarUsuario, error, result, status } = useCriarUsuario();

  const { usuario } = useContext(UsuarioContext);

  const [payload, setPayload] = useState({
    matricula: '',
    nome: '',
    sobrenome: '',
    senha: '',
    nomeUsuario: ''
  });

  const [fieldsError, setFieldsError] = useState({});

  useEffect(() => {
    if(status === "error" && error.response && error.response.status === httpStatus.FORBIDDEN) {
      navigate('/login');
    }

    if(status === "success") {
      pegarUsuarios();
      onHide();
    }
  }, [status]);

  function handleForm(event) {
    if(fieldsError[event.target.name]) {
      delete fieldsError[event.target.name];
    }

    setPayload(prev => {
      return {
        ...prev,
        [event.target.name]: event.target.value
      };
    });
  }
  
  function saveStudent() {
    const invalidFieldsName = getInvalidFieldsName();

    if(invalidFieldsName.length > 0) {
      setFieldsError(invalidFieldsName.reduce((errorObject, currentField) => {
        return {
          ...errorObject,
          [currentField]: `Campo obrigatório!`
        }
      }, {}));

      return;
    }

    criarUsuario({ ...payload, tipoUsuario: 'estudante', token: usuario.token });
  }

  function getInvalidFieldsName() {
    return Object.keys(payload).filter(key => payload[key] === '');
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {modalTitle}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="matricula">
            <Form.Label>Matrícula:</Form.Label>
            <Form.Control
              name="matricula"
              type="text"
              placeholder="Digite a matrícula do estudante"
              required
              isInvalid={fieldsError.matricula}
              value={payload.matricula}
              onChange={handleForm}
            />
            <Form.Control.Feedback type="invalid">
              {fieldsError.matricula}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="nome">
            <Form.Label>Nome:</Form.Label>
            <Form.Control
              name="nome"
              type="text"
              placeholder="Digite o nome do estudante"
              required
              isInvalid={fieldsError.nome}
              value={payload.nome}
              onChange={handleForm}
            />
            <Form.Control.Feedback type="invalid">
              {fieldsError.nome}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="sobrenome">
            <Form.Label>Sobrenome:</Form.Label>
            <Form.Control
              name="sobrenome"
              type="text"
              placeholder="Digite o sobrenome do estudante"
              required
              isInvalid={fieldsError.sobrenome}
              value={payload.sobrenome}
              onChange={handleForm}
            />
            <Form.Control.Feedback type="invalid">
              {fieldsError.sobrenome}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="senha">
            <Form.Label>Senha:</Form.Label>
            <Form.Control
              name="senha"
              type="password"
              placeholder="Digite a senha do estudante"
              required
              isInvalid={fieldsError.senha}
              value={payload.senha}
              onChange={handleForm}
            />
            <Form.Control.Feedback type="invalid">
              {fieldsError.sobrenome}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="nomeUsuario">
            <Form.Label>Nome de usuário:</Form.Label>
            <Form.Control
              name="nomeUsuario"
              type="text"
              placeholder="Digite o nome de usuário do estudante"
              required
              isInvalid={fieldsError.nomeUsuario}
              value={payload.nomeUsuario}
              onChange={handleForm}
            />
            <Form.Control.Feedback type="invalid">
              {fieldsError.sobrenome}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancelar</Button>
        <Button variant="primary" onClick={saveStudent}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalFormEstudante;
