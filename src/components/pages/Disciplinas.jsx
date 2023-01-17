import { useEffect } from 'react';
import { Button, Table, Container } from 'react-bootstrap';
import usePegarDisciplinas from '../../hooks/api/usePegarDisciplinas';
import useLocalStorage from '../../hooks/useLocalStorage';
import styled from 'styled-components';

function Disciplinas() {
  const { error, pegarDisciplinas, result, status } = usePegarDisciplinas();

  const [usuario] = useLocalStorage("usuario", null);

  useEffect(() => {
    pegarDisciplinas({ token: usuario.token });
  }, []);

  return (result && result.data) && (
    <Container className="my-3 col-sm-10">
      <TituloPaginaContainer>
        <h1>Disciplinas</h1>

        <div>
          <Button>
            Cadastrar Disciplina
          </Button>
        </div>
      </TituloPaginaContainer>

      <Table size="sm" striped bordered hover>
        <thead>
          <tr>
            <th className='col-sm-1'>#</th>
            <th className='col-sm-9'>Nome</th>
            <th className='col-sm-2 text-center'>Opções</th>
          </tr>
        </thead>
        <tbody>
          {result.data.map((disciplina, indice) => {
            return (
              <tr key={disciplina.id}>
                <td className='col-sm-1'>{indice + 1}</td>
                <td className='col-sm-9'>{disciplina.nome}</td>
                <td className='col-sm-2 text-center'>
                  <Button variant="secondary">Editar</Button>
                  <Button variant="danger" className="ms-2">Excluir</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={2}>Total</th>
            <td className='text-center'>{result.data.length} resultado(s)</td>
          </tr>
        </tfoot>
      </Table>
    </Container>
  );
}

const TituloPaginaContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
`;

export default Disciplinas;
