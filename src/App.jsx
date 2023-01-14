import Login from './components/pages/Login';
import AlterarSenha from './components/pages/AlterarSenha';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/alterarSenha' element={<AlterarSenha />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
