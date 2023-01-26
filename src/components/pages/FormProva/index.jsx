import { useContext, useEffect, useState } from "react";
import { Accordion, Button, Container, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import UsuarioContext from "../../../contexts/UsuarioContext";
import usePegarDisciplinas from "../../../hooks/api/usePegarDisciplinas";
import httpStatus from '../../../utils/httpStatus';
import QuestaoFormGroup from "./QuestaoFormGroup";
import QuestionContext from "../../../contexts/QuestionContext";
import useCriarProva from "../../../hooks/api/useCriarProva";

function FormProva() {
  const {state} = useLocation();
  const navigate = useNavigate();

  const { error, pegarDisciplinas, result, status } = usePegarDisciplinas();

  const { error: errorCriarProva, criarProva, result: resultCriarProva, status: statusCriarProva } = useCriarProva();

  const { usuario } = useContext(UsuarioContext);

  const [form, setForm] = useState({
    titulo: '',
    idDisciplina: '',
    questoes: [
      {
        texto: '',
        valor: 0,
        alternativas: [
          {
            texto: '',
            respostaCerta: true
          },
          {
            texto: '',
            respostaCerta: false
          }
        ]
      }
    ]
  });

  useEffect(() => {
    pegarDisciplinas({ token: usuario.token });
  }, []);

  useEffect(() => {
    if((status === "error" && forbiddenError(status, error)) ||
    statusCriarProva === "error" && forbiddenError(statusCriarProva, errorCriarProva)) {
      navigate('/login');
    }

    if(statusCriarProva === "success") {
      navigate('/provas');
    }
  }, [status, statusCriarProva]);

  function conflictError(status, err) {
    return status === "error" && err.response && err.response.status === httpStatus.CONFLICT;
  }

  function forbiddenError(status, err) {
    return status === "error" && err.response && err.response.status === httpStatus.FORBIDDEN;
  }

  function buildDisciplineOptions() {
    if(status !== "success") return;

    return result.data.map(discipline => {
      return (
        <option key={discipline.id} value={discipline.id}>{discipline.nome}</option>
      );
    });
  }

  function buildQuestionsFields() {
    return (form.questoes || []).map((questao, index) => <QuestaoFormGroup key={index} index={index} question={questao} />);
  }

  function newQuestion() {
    setForm(prev => {
      return {
        ...prev,
        questoes: [ ...prev.questoes, {
          texto: '',
          valor: 0,
          alternativas: [
            {
              texto: '',
              respostaCerta: true
            },
            {
              texto: '',
              respostaCerta: false
            }
          ]
        }]
      };
    });
  }

  function handleForm(event) {
    setForm(prev => {
      return {
        ...prev,
        [event.target.name]: event.target.value
      }
    });
  }
  
  function calculateTotalValue() {
    return form.questoes.reduce((acc, question) => acc + parseInt(question.valor), 0);
  }

  function handleSubmit(event) {
    event.preventDefault();

    criarProva({ ...form, token: usuario.token });
  }

  function provaIsInvalid() {
    return form.idDisciplina === '' || form.questoes.some(question => !question.valor || question.valor <= 0);
  }

  return (
    <Container className="my-3">
      <QuestionContext.Provider value={{ form, setForm }}>
        <TituloPaginaContainer>
          <h1>{state ? state.title : "Cadastrar prova"}</h1>
          
          <ProvaInfo>
            <p>Quant. questões: {form.questoes.length}</p>
            <p>Valor total: {calculateTotalValue()}</p>
          </ProvaInfo>
        </TituloPaginaContainer>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="titulo" hasValidation>
            <Form.Label>Título:</Form.Label>
            <Form.Control value={form.titulo} onChange={handleForm} name="titulo" isInvalid={conflictError(statusCriarProva, errorCriarProva)} type="text" required placeholder="Digite o título da prova" />
            <Form.Control.Feedback type="invalid">
              Já existe uma prova com esse título
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="disciplina">
            <Form.Label>Disciplina:</Form.Label>
            <Form.Select onChange={handleForm} value={form.idDisciplina} name="idDisciplina" required aria-label="Selecione a disciplina da prova">
              <option value="" disabled defaultValue>Selecione uma disciplina</option>
              { buildDisciplineOptions() }
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2" controlId="questoes">
            <Form.Label>Questões:</Form.Label> <br />
            <Accordion>
              { buildQuestionsFields() }
            </Accordion>
            <Button className="my-2" onClick={newQuestion}>Nova questão</Button>
          </Form.Group>

          <div>
            <Button variant="secondary" className="me-2" onClick={() => navigate(-1)}>Cancelar</Button>
            <Button variant="success" type="submit" disabled={provaIsInvalid()}>Salvar</Button>
          </div>
        </Form>
      </QuestionContext.Provider>
    </Container>
  );
}

const TituloPaginaContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
`;

const ProvaInfo = styled.div`
  p {
    margin: 0;
  }
`;

export default FormProva;
