import { Accordion, Button, Form } from 'react-bootstrap';
import styled from 'styled-components';
import { BsFillTrashFill } from "react-icons/bs";
import { useContext } from 'react';
import QuestionContext from '../../../contexts/QuestionContext';
import ProvaItemContainer from '../../layout/ProvaItemContainer';
import AlternativaFormGroup from './AlternativaFormGroup';

function ProvaFormGroup({ index }) {
  const { form, setForm } = useContext(QuestionContext);

  function buildAlternativesFields(questionIndex) {
    return (form.questoes[questionIndex].alternativas || []).map((_, index) =>
      <AlternativaFormGroup key={index} index={index} questionIndex={questionIndex} />);
  }

  function disableDeleteQuestionButton() {
    return form.questoes.length === 1;
  }

  function handleDeleteQuestion(event, questionIndex) {
    event.preventDefault();

    setForm(prev => {
      return {
        ...prev,
        questoes: form.questoes.filter((_, index) => index !== questionIndex)
      };
    });
  }

  function newAlternative(questionIndex) {
    form.questoes[questionIndex].alternativas.push({
      texto: '',
      respostaCerta: false
    });

    setForm(prev => {
      return {
        ...prev,
        questoes: [ ...form.questoes ]
      };
    });
  }

  function handleQuestion(event, questionIndex) {
    event.preventDefault();

    form.questoes[questionIndex] = {
      ...form.questoes[questionIndex],
      [event.target.name]: event.target.value
    };

    setForm(prev => {
      return {
        ...prev,
        questoes: [...form.questoes]
      };
    });
  }

  function isInvalidValue() {
    return form.questoes[index].valor === '' || +form.questoes[index].valor <= 0;
  }

  return (
    <ProvaItemContainer>
      <Accordion.Item key={index} style={{ width: '100%' }} eventKey={`${index}`}>
        <Accordion.Header>Questão {index+1}</Accordion.Header>
        <Accordion.Body>
          <Form.Group className="mb-3" controlId={`titulo-questao-${index+1}`} hasValidation>
            <Form.Label>Texto da questão:</Form.Label>
            <Form.Control value={form.questoes[index].texto} name="texto" required onChange={(event) => handleQuestion(event, index)} as="textarea" rows={3} />
          </Form.Group>
          <Form.Group className="mb-3" controlId={`valor-questao-${index+1}`}>
            <Form.Label>Valor:</Form.Label>
            <Form.Control value={form.questoes[index].valor} name="valor" required isInvalid={isInvalidValue()} onChange={(event) => handleQuestion(event, index)} type="number" min={0} placeholder="Digite o título da prova" />
            <Form.Control.Feedback type="invalid">
              O valor da questão deve ser maior do que zero!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId={`valor-questao-${index+1}`}>
            <Form.Label>Alternativas:</Form.Label>
            <Accordion>
              { buildAlternativesFields(index) }
            </Accordion>
            <Button className="mt-3" onClick={() => newAlternative(index)}>
              Nova alternativa
            </Button>
          </Form.Group>
        </Accordion.Body>
      </Accordion.Item>

      <DeleteButton disabled={disableDeleteQuestionButton(index)} className="ms-3" onClick={(event) => handleDeleteQuestion(event, index)}>
        <BsFillTrashFill />
      </DeleteButton>
    </ProvaItemContainer>
  );
}

export default ProvaFormGroup;

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  color: red;
  font-size: 22px;

  :disabled {
    color: gray
  }
`;
