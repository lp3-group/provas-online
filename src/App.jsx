import Login from './components/pages/Login';
import AlterarSenha from './components/pages/AlterarSenha';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Inicial from './components/pages/Inicial';
import Cabecalho from './components/shared/Cabecalho';
import Disciplinas from './components/pages/Disciplinas';
import Provas from './components/pages/Provas';
import { useEffect, useState } from 'react';
import UsuarioContext from './contexts/UsuarioContext';
import useLocalStorage from './hooks/useLocalStorage';
import FormProva from './components/pages/FormProva';

function ProtectedRoutes({ user, redirectPath = '/login' }) {
  if(!user) {
    return <Navigate to={redirectPath} />;
  }

  return <Outlet />;
}

function App() {
  const [storedUsuario, setStoredUsuario] = useLocalStorage("usuario", null);
  const [usuario, setUsuario] = useState(storedUsuario);

  useEffect(() => {
    setStoredUsuario(usuario);
  }, [usuario]);

  return (
    <BrowserRouter>
      <UsuarioContext.Provider value={{ usuario, setUsuario }}>
        <Cabecalho />
        <Routes>
          <Route path='/login' element={<Login />} />

          <Route element={<ProtectedRoutes user={usuario} />}>
            <Route path='/alterarSenha' element={<AlterarSenha />} />
            <Route path='/' element={<Inicial />} />
            <Route path='/disciplinas' element={<Disciplinas />} />
            <Route path='/provas' element={<Provas />} />
            <Route path='/provas/formulario' element={<FormProva />} />
            <Route path='/provas/formulario/:provaId/editar' element={<FormProva />} />
          </Route>
        </Routes>
      </UsuarioContext.Provider>
    </BrowserRouter>
  );
}

export default App;
