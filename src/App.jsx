import Login from './components/pages/Login';
import AlterarSenha from './components/pages/AlterarSenha';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inicial from './components/pages/Inicial';
import Cabecalho from './components/shared/Cabecalho';
import Disciplinas from './components/pages/Disciplinas';
import { useEffect, useState } from 'react';
import UsuarioContext from './contexts/UsuarioContext';
import useLocalStorage from './hooks/useLocalStorage';

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
          <Route path='/alterarSenha' element={<AlterarSenha />} />
          <Route path='/' element={<Inicial />} />
          <Route path='/disciplinas' element={<Disciplinas />} />
        </Routes>
      </UsuarioContext.Provider>
    </BrowserRouter>
  );
}

export default App;
