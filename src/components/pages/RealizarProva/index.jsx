import { useContext, useEffect, useState } from "react";
import { Accordion, Button, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import TituloPaginaContainer from "../../layout/TituloPaginaContainer";
import usePegarProvaParaRealizar from '../../../hooks/api/usePegarProvaParaRealizar';
import UsuarioContext from "../../../contexts/UsuarioContext";
import httpStatus from "../../../utils/httpStatus";
import QuestionContainer from "./QuestionContainer";
import useRealizarProva from "../../../hooks/api/useRealizarProva";
import ModalResult from "./ModalResult";

function RealizarProva() {
  const { provaId } = useParams();
  const navigate = useNavigate();

  const { usuario } = useContext(UsuarioContext);

  const { error, pegarProvaParaRealizar, result, status } = usePegarProvaParaRealizar();
  const { error: errorRealizarProva, realizarProva, result: resultRealizarProva, status: statusRealizarProva } = useRealizarProva();

  const [payload, setPayload] = useState([]);
  const [showModalResult, setShowModalResult] = useState(false);

  useEffect(() => {
    pegarProvaParaRealizar({ token: usuario.token, provaId });
  }, []);

  useEffect(() => {
    if(status === "error" && error.response && error.response.status === httpStatus.FORBIDDEN) {
      navigate('/login');
    }

    if(status === "success") {
      setPayload(result.data.questoes.map(question => ({ id: question.alternativas[0].id })));
    }

    if(statusRealizarProva === "error" && errorRealizarProva.response && errorRealizarProva.response.status === httpStatus.FORBIDDEN) {
      navigate('/login');
    }

    if(statusRealizarProva === "success") {
      setShowModalResult(true);
    }
  }, [status, statusRealizarProva]);

  function buildQuestionsContainer() {
    return result && result.data.questoes.map((question, index) => (
      <QuestionContainer questionIndex={index} question={question} payload={payload} setPayload={setPayload} />
    ));
  }

  function handleSubmit(event) {
    event.preventDefault();

    realizarProva({ token: usuario.token, payload, provaId });
  }

  function hideModal() {
    setShowModalResult(false);
    navigate('/provas');
  }

  return (
    <>
      <Container className="my-3 col-sm-10">
        <TituloPaginaContainer>
          <h1>{result && result.data.titulo}</h1>
        </TituloPaginaContainer>

        <Form onSubmit={handleSubmit}>
          <Accordion>
            { result && result.data.questoes && buildQuestionsContainer() }
          </Accordion>

          <Button type="submit" className="my-3">Finalizar</Button>
        </Form>
      </Container>

      { resultRealizarProva && resultRealizarProva.data && <ModalResult show={showModalResult} onHide={hideModal} amountQuestions={result.data.questoes.length} result={resultRealizarProva.data} /> }
    </>
  );
}

export default RealizarProva;
