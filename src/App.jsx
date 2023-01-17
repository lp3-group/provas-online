import Login from './components/pages/Login';
import AlterarSenha from './components/pages/AlterarSenha';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inicial from './components/pages/Inicial';
import Cabecalho from './components/shared/Cabecalho';
import Disciplinas from './components/pages/Disciplinas';

function App() {
  return (
    <BrowserRouter>
      <Cabecalho />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/alterarSenha' element={<AlterarSenha />} />
        <Route path='/' element={<Inicial />} />
        <Route path='/disciplinas' element={<Disciplinas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
