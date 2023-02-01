import { useContext, useEffect } from "react";
import { Accordion, Button, Modal } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import UsuarioContext from "../../../contexts/UsuarioContext";
import usePegarProva from '../../../hooks/api/usePegarProva';
import httpStatus from "../../../utils/httpStatus";
import styled from 'styled-components';

function ModalProva({ show, onHide }) {
  const location = useLocation();
  const navigate = useNavigate();

  const { error, pegarProvaPeloId, result, status } = usePegarProva();

  const { usuario } = useContext(UsuarioContext);

  useEffect(() => {
    if(!show) return;

    const query = new URLSearchParams(location.search);
    const provaId = parseInt(query.get('verProva'));

    if(isNaN(provaId)) return;

    pegarProvaPeloId({ token: usuario.token, provaId });
  }, [show]);

  useEffect(() => {
    if(status === "error" && error.response && error.response.status === httpStatus.FORBIDDEN) {
      navigate('/login');
    }
  }, [status]);

  function renderQuestionsAccordionItem(questions) {
    return questions.map((question, index) => (
      <Accordion.Item key={index} eventKey={index}>
        <Accordion.Header>Questão {index+1}</Accordion.Header>
        <Accordion.Body>
          <p>valor: {question.valor}</p>

          <p>{question.texto}</p>

          <Accordion>
            { renderAlternativesAccordionItem(question.alternativas) }
          </Accordion>
        </Accordion.Body>
      </Accordion.Item>
    ));
  }

  function renderAlternativesAccordionItem(alternatives) {
    return alternatives.map((alternative, index) => (
      <Accordion.Item key={index} eventKey={index}>
        <Accordion.Header>Alternativa {index+1}</Accordion.Header>
        <Accordion.Body>
          <p>{alternative.texto}</p>

          <p>Resposta {alternative.respostaCerta ? 'certa' : 'errada'}</p>
        </Accordion.Body>
      </Accordion.Item>
    ));
  }

  function calculateTotalValue(questions) {
    return questions.reduce((total, question) => total += question.valor, 0);
  }

  return result && result.data && (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <p>{result.data.titulo}</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ProvaTopInfo>
          <p>Disciplina: {result.data.disciplina.nome}</p>

          <p>Valor: { calculateTotalValue(result.data.questoes) } ponto(s)</p>
        </ProvaTopInfo>

        <Accordion>
          { renderQuestionsAccordionItem(result.data.questoes) }
        </Accordion>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Fechar</Button>
        <Button variant="primary" onClick={() => navigate(`/provas/formulario/${result.data.id}/editar`)}>
          Editar
        </Button>
      </Modal.Footer>
    </Modal>    
  );
}

const ProvaTopInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default ModalProva;
