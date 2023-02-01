import { Accordion, Form } from "react-bootstrap";

function QuestionContainer({ question, questionIndex, setPayload, payload }) {
  function buildAlternatives() {
    return question.alternativas.map((alternativa, index) => (
      <Form.Check 
        type="radio"
        name={`alternativa-questao-${questionIndex}`}
        id={`alternativa-${index}-questao-${questionIndex}`}
        label={alternativa.texto}
        checked={payload[questionIndex] && payload[questionIndex].id === alternativa.id}
        onChange={() => selectAlternative(alternativa.id)}
      />
    ));
  }

  function selectAlternative(alternativaId) {
    setPayload(prevPayload => {
      prevPayload[questionIndex].id = alternativaId;

      return [ ...prevPayload ];
    });
  }

  return (
    <Accordion.Item eventKey={questionIndex}>
      <Accordion.Header>Questão {questionIndex+1}</Accordion.Header>
      <Accordion.Body>
        {question.texto}

        <div>
          { buildAlternatives() }
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default QuestionContainer;
