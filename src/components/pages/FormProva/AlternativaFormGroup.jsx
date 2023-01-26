import { Accordion, Form } from "react-bootstrap";
import ProvaItemContainer from "../../layout/ProvaItemContainer";
import { BsFillTrashFill } from "react-icons/bs";
import { useContext } from "react";
import QuestionContext from "../../../contexts/QuestionContext";
import styled from 'styled-components';

function AlternativaFormGroup({ index, questionIndex }) {
  const { form, setForm } = useContext(QuestionContext);

  function canDeleteAlternative(questionIndex) {
    return form.questoes[questionIndex].alternativas.length === 2;
  }

  function handleDeleteAlternative(event, questionIndex, alternativeIndex) {
    event.preventDefault();

    if(form.questoes[questionIndex].alternativas[alternativeIndex].respostaCerta) {
      form.questoes[questionIndex].alternativas[0].respostaCerta = true;
    }

    form.questoes[questionIndex].alternativas = form.questoes[questionIndex].alternativas.filter((_, index) => {
      return index !== alternativeIndex;
    });

    setForm(prev => {
      return {
        ...prev,
        questoes: [...form.questoes]
      };
    });
  }

  function handleAlternative(event, questionIndex, alternativeIndex) {
    if(event.target.name === 'respostaCerta' && !event.target.value) return;

    if(event.target.name === 'respostaCerta') {
      form.questoes[questionIndex].alternativas.forEach((alternative, index) => {
        alternative.respostaCerta = alternativeIndex === index;
      });
    } else {
      form.questoes[questionIndex].alternativas[alternativeIndex] = {
        ...form.questoes[questionIndex].alternativas[alternativeIndex],
        [event.target.name]: event.target.value
      }
    }

    setForm(prev => {
      return {
        ...prev,
        questoes: [ ...form.questoes ]
      };
    });
  }

  return (
    <ProvaItemContainer>
      <Accordion.Item style={{ width: '100%' }} key={index} eventKey={`${index}`}>
        <Accordion.Header>Alternativa {index+1}</Accordion.Header>
        <Accordion.Body>
          <Form.Group className="mb-3" controlId={`titulo-questao-${index+1}`}>
            <Form.Label>Texto da alternativa:</Form.Label>
            <Form.Control name="texto" value={form.questoes[questionIndex].alternativas[index].texto} onChange={(event) => handleAlternative(event, questionIndex, index)} as="textarea" rows={1} />
          </Form.Group>
          <Form.Group className="mb-3" controlId={`valor-questao-${index+1}`}>
            <Form.Check
              type="switch"
              id="resposta-certa"
              label="É a resposta certa"
              name="respostaCerta"
              checked={form.questoes[questionIndex].alternativas[index].respostaCerta}
              onChange={(event) => handleAlternative(event, questionIndex, index)}
            />
          </Form.Group>
        </Accordion.Body>
      </Accordion.Item>

      <DeleteButton disabled={canDeleteAlternative(questionIndex)} className="ms-3" onClick={(event) => handleDeleteAlternative(event, questionIndex, index)}>
        <BsFillTrashFill />
      </DeleteButton>
    </ProvaItemContainer>
  );
}

export default AlternativaFormGroup;

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  color: red;
  font-size: 22px;

  :disabled {
    color: gray
  }
`;
