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
import ModalProva from './ModalProva';

function Provas() {
  const navigate = useNavigate();

  const { error, pegarProvas, result, status } = usePegarProvas();

  const { usuario } = useContext(UsuarioContext);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showModalProva, setShowModalProva] = useState(false);

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

  function showProva(provaId) {
    navigate(`/provas?verProva=${provaId}`);
    setShowModalProva(true);
  }

  function isAdminUser() {
    return usuario && usuario.tipoUsuario === "administrador";
  }

  return (
    <>
      <Container>
        <TituloPaginaContainer>
          <h1>Provas</h1>

          { isAdminUser() && 
            <div>
              <Button onClick={() => navigate('/provas/formulario')}>
                Cadastrar Prova
              </Button>
            </div>
          }
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
                    { isAdminUser() ?
                      <>
                        <Button variant="primary" onClick={() => showProva(prova.id)}>Ver</Button>
                        <Button variant="danger" className="ms-2" onClick={() => excluirProva(prova.id)}>Excluir</Button>
                      </>
                      : <Button variant="primary" onClick={() => navigate(`/provas/${prova.id}/realizar`)}>Realizar</Button>
                    }                    
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

      { isAdminUser() &&
        <>
          <ModalExcluir pegarProvas={pegarProvas} show={showDeleteModal} onHide={() => setShowDeleteModal(false)} />

          <ModalProva show={showModalProva} onHide={() => setShowModalProva(false)} />
        </>
      }
    </>  
  );
}

export default Provas;
