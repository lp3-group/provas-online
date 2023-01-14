import { useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import Container from '../layout/Container';

function AlterarSenhaForm() {
  const navigate = useNavigate();

  return (
    <Form className="col-sm-4">
      <Form.Group className="mb-4" controlId="senha">
        <Form.Label>Nova senha</Form.Label>
        <Form.Control type="password" placeholder="Digite uma nova senha" name="senha" required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="confirmaSenha">
        <Form.Label>Confirmar senha</Form.Label>
        <Form.Control type="password" placeholder="Digite novamente" name="confirmaSenha" required />
      </Form.Group>
      <Button variant="danger" type="button" className="me-1" onClick={() => navigate(-1)}>
        Cancelar
      </Button>
      <Button variant="primary" type="submit">
        Salvar
      </Button>
    </Form>
  );
}

function AlterarSenha() {
  useEffect(() => {
    document.title = 'Provas online - Alterar senha ';
  }, []);

  return (
    <Container>
      <Alert variant="info" className="col-sm-4">
        <Alert.Heading>Bem-vindo (a) ao Provas Online!</Alert.Heading>
        Notamos que esse é seu primeiro login na plataforma. <br />
        Portanto, altere sua senha para sua segurança.
      </Alert>

      <AlterarSenhaForm />
    </Container>
  );
}

export default AlterarSenha;
