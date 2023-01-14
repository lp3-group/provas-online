import { useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useLogin from '../../hooks/api/useLogin';
import useLocalStorage from '../../hooks/useLocalStorage';
import transformarFormEmObjeto from '../../utils/transformarFormEmObjeto';
import Container from '../layout/Container';

function LoginForm() {
  const navigate = useNavigate();
  const formEl = useRef();

  const [usuario, setUsuario] = useLocalStorage('usuario', null);

  const { login, error, result, status } = useLogin();

  useEffect(() => {
    if (status === 'success') {
      setUsuario(result);

      navigate(result.primeiroAcesso ? '/alterarSenha' : '/');
    }
  }, [status]);

  function handleForm(event) {
    event.preventDefault();

    const dados = transformarFormEmObjeto(formEl);

    login(dados);
  }

  return (
    <Form ref={formEl} className="col-sm-4" onSubmit={handleForm}>
      <Form.Group className="mb-4" controlId="nomeUsuario">
        <Form.Label>Nome de usuário</Form.Label>
        <Form.Control type="text" placeholder="Digite seu nome de usuário" name="nomeUsuario" required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="senha">
        <Form.Label>Senha</Form.Label>
        <Form.Control type="password" placeholder="Digite sua senha" name="senha" required />
      </Form.Group>
      <Button variant="primary" type="submit">
        Entrar
      </Button>
    </Form>
  );
}

function Login() {
  useEffect(() => {
    document.title = 'Provas online - Login';
  }, []);

  return (
    <Container>
      <Title>
        Login
      </Title>
      <LoginForm />
    </Container>
  );
}

const Title = styled.h1`
  font-size: 2.8rem;
  margin: 25px 0;
`;

export default Login;
