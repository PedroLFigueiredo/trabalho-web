import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import CRUD from './Paginas/CRUD'
import Login from './Paginas/Login'
import Cadastro from './Paginas/Cadastro'
import Home from './Paginas/Home'
import Loja from './Paginas/Loja'
import DetalhesProduto from './Paginas/DetalheProduto'
import Carrinho from './Paginas/Carrinho'
import Pagamento from './Paginas/Pagamento'
import PainelAdmin from './Paginas/PainelAdmin'

function App() {
  return (
    <>
      {/* MENU DE NAVEGAÇÃO */}
      <nav style={{ padding: '1rem', backgroundColor: '#f5f5f5' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Início</Link>
        <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
        <Link to="/cadastro" style={{ marginRight: '1rem' }}>Cadastro</Link>
        <Link to="/loja" style={{ marginRight: '1rem' }}>Loja</Link>
        <Link to="/carrinho" style={{ marginRight: '1rem' }}>Carrinho</Link>
        <Link to="/admin" style={{ marginRight: '1rem' }}>Painel Admin</Link>
      </nav>

      {/* ROTAS */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/loja" element={<Loja />} />
        <Route path="/produto/:id" element={<DetalhesProduto />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/pagamento" element={<Pagamento />} />
        <Route path="/admin" element={<PainelAdmin />} />
        <Route path="/admin/gerenciar" element={<CRUD />} />
      </Routes>
    </>
  )
}

export default App
