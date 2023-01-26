import { useContext, useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import dayjs from 'dayjs';
import TituloPaginaContainer from '../../layout/TituloPaginaContainer';
import usePegarProvas from '../../../hooks/api/usePegarProvas';
import UsuarioContext from '../../../contexts/UsuarioContext';
import httpStatus from '../../../utils/httpStatus';
import ModalExcluir from './ModalExcluir';

function Provas() {
  const navigate = useNavigate();

  const { error, pegarProvas, result, status } = usePegarProvas();

  const { usuario } = useContext(UsuarioContext);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    pegarProvas({ token: usuario.token });
  }, []);

  useEffect(() => {
    if(status === "error" && error.response && error.response.status === httpStatus.FORBIDDEN) {
      navigate('/login');
    }
  }, [status]);

  function excluirProva(provaId) {
    navigate('/provas?excluir=' + provaId);
    setShowDeleteModal(true);
  }

  return (
    <>
      <Container>
        <TituloPaginaContainer>
          <h1>Provas</h1>

          <div>
              <Button onClick={() => navigate('/provas/formulario')}>
                Cadastrar Prova
              </Button>
            </div>
        </TituloPaginaContainer>

        { result && result.data && result.data.length > 0 ? <Table size="sm" striped bordered hover>
          <thead>
            <tr>
              <th className='col-sm-1'>#</th>
              <th className='col-sm-5'>Título</th>
              <th className='col-sm-2 text-center'>Data da criação</th>
              <th className='col-sm-2 text-center'>Disciplina</th>
              <th className='col-sm-3 text-center'>Opções</th>
            </tr>
          </thead>
          <tbody>
            {result.data.map((prova, indice) => {
              return (
                <tr key={prova.id}>
                  <td className='col-sm-1'>{indice + 1}</td>
                  <td className='col-sm-5'>{prova.titulo}</td>
                  <td className='col-sm-2 text-center'>{dayjs(prova.criadaEm).format('DD/MM/YYYY')}</td>
                  <td className='col-sm-2 text-center'>{prova.disciplina.nome}</td>
                  <td className='col-sm-3 text-center'>
                    <Button variant="primary">Ver</Button>
                    <Button variant="danger" className="ms-2" onClick={() => excluirProva(prova.id)}>Excluir</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <th colSpan={4}>Total</th>
              <td className='text-center'>{result.data.length} resultado(s)</td>
            </tr>
          </tfoot>
        </Table> : <h6>Nenhuma prova encontrada</h6>}
      </Container>

      <ModalExcluir pegarProvas={pegarProvas} show={showDeleteModal} onHide={() => setShowDeleteModal(false)} />
    </>  
  );
}

export default Provas;
