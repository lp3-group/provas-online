import { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useLocation, useNavigate } from 'react-router-dom';
import transformFormToObject from '../../utils/transformFormToObject';
import Container from '../layout/Container';
import useAlterarSenha from '../../hooks/api/useAlterarSenha';
import useLocalStorage from '../../hooks/useLocalStorage';

function AlterarSenhaForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const formEl = useRef();

  const [senhasInvalidas, setSenhasInvalidas] = useState(false);

  const { alterarSenha, error, result, status } = useAlterarSenha();

  const [usuario] = useLocalStorage('usuario', null);

  useEffect(() => {
    if (status === 'success') {
      navigate('/', {
        state: location.state
      });
    }
  }, [status]);

  function handleSubmit(event) {
    event.preventDefault();

    const dados = transformFormToObject(formEl);

    if (dados.senha !== dados.confirmaSenha) {
      setSenhasInvalidas(true);
      return;
    }

    alterarSenha({ ...dados, token: usuario.token });
  }

  function isLoading() {
    return status === 'pending';
  }

  function removerSenhasInvalidasErro() {
    setSenhasInvalidas((haErro) => {
      if (haErro) return false;
      return haErro;
    });
  }

  return (
    <Form ref={formEl} onSubmit={handleSubmit} className="col-sm-4">
      <Form.Group className="mb-4" controlId="senha">
        <Form.Label>Nova senha</Form.Label>
        <Form.Control onChange={() => removerSenhasInvalidasErro()} isInvalid={senhasInvalidas} disabled={isLoading()} type="password" placeholder="Digite uma nova senha" name="senha" required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="confirmaSenha">
        <Form.Label>Confirmar senha</Form.Label>
        <Form.Control onChange={() => removerSenhasInvalidasErro()} isInvalid={senhasInvalidas} disabled={isLoading()} type="password" placeholder="Digite novamente" name="confirmaSenha" required />
        <Form.Control.Feedback type="invalid">
          As senhas devem ser iguais!
        </Form.Control.Feedback>
      </Form.Group>
      <Button variant="danger" type="button" className="me-1" onClick={() => navigate(-1)}>
        Cancelar
      </Button>
      <Button variant="primary" type="submit" disabled={isLoading()}>
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
