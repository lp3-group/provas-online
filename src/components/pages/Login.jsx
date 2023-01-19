import { useContext, useEffect, useRef, useState } from 'react';
import { Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import UsuarioContext from '../../contexts/UsuarioContext';
import useLogin from '../../hooks/api/useLogin';
import useLocalStorage from '../../hooks/useLocalStorage';
import httpStatus from '../../utils/httpStatus';
import transformarFormEmObjeto from '../../utils/transformarFormEmObjeto';
import Container from '../layout/Container';

function LoginForm({ setErrorAlert }) {
  const navigate = useNavigate();
  const formEl = useRef();

  const { setUsuario } = useContext(UsuarioContext);

  const { login, error, result, status } = useLogin();

  useEffect(() => {
    setUsuario(null);
  }, []);

  useEffect(() => {
    if (status === 'success') {
      const { data } = result;

      setUsuario(data);

      navigate(data.primeiroAcesso ? '/alterarSenha' : '/', {
        state: {
          tipoUsuario: data.tipoUsuario
        }
      });
    }

    if (status === 'error') {
      if (error.response && error.response.status === httpStatus.UNAUTHORIZED) {
        setErrorAlert({ show: true, message: 'Usuário e/ou senha incorretos! Por favor, tente novamente! ' });
      }
    }
  }, [status]);

  function handleForm(event) {
    event.preventDefault();

    const dados = transformarFormEmObjeto(formEl);

    login(dados);
  }

  function isLoading() {
    return status === 'pending';
  }

  return (
    <Form ref={formEl} className="col-sm-4" onSubmit={handleForm}>
      <Form.Group className="mb-4" controlId="nomeUsuario">
        <Form.Label>Nome de usuário</Form.Label>
        <Form.Control isInvalid={error && error.response} type="text" placeholder="Digite seu nome de usuário" disabled={isLoading()} name="nomeUsuario" required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="senha">
        <Form.Label>Senha</Form.Label>
        <Form.Control isInvalid={error && error.response} type="password" placeholder="Digite sua senha" name="senha" disabled={isLoading()} required />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={isLoading()}>
        Entrar
      </Button>
    </Form>
  );
}

function Login() {
  const [errorAlert, setErrorAlert] = useState(null);

  useEffect(() => {
    document.title = 'Provas online - Login';
  }, []);

  return (
    <Container>
      <Title>
        Login
      </Title>
      {
        errorAlert !== null ?
          <Alert variant="danger" className="col-sm-4" onClose={() => setErrorAlert(null)} dismissible>
            {errorAlert.message || 'Ocorreu um erro ao realizar esta operação!'}
          </Alert>
          : null
      }
      <LoginForm setErrorAlert={setErrorAlert} />
    </Container>
  );
}

const Title = styled.h1`
  font-size: 2.8rem;
  margin: 25px 0;
`;

export default Login;
