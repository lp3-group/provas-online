import { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Provas() {
  const navigate = useNavigate();
  
  const [mostrarModalCriarProva, setMostrarModalProva] = useState(false);

  return (
    <Container>
      <TituloPaginaContainer>
        <h1>Provas</h1>

        <div>
            <Button onClick={() => navigate('/provas/formulario')}>
              Cadastrar Prova
            </Button>
          </div>
      </TituloPaginaContainer>

      {/* <h6>Nenhuma prova encontrada</h6> */}
    </Container>  
  );
}

const TituloPaginaContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
`;

export default Provas;
