import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './Paginas/CarrinhoContext';
import { AdminStatsProvider } from './tools/useAdminStats';
import Home from './Paginas/Home';
import Loja from './Paginas/Loja';
import DetalhesProduto from './Paginas/DetalhesProduto';
import Carrinho from './Paginas/Carrinho';
import Pagamento from './Paginas/Pagamento';
import PainelAdmin from './Paginas/PainelAdmin';
import Login from './Paginas/Login';
import Cadastro from './Paginas/Cadastro';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AdminStatsProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/loja" element={<Loja />} />
            <Route path="/carro/:slug" element={<DetalhesProduto />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/pagamento" element={<Pagamento />} />
            <Route path="/paineladmin" element={<PainelAdmin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
          </Routes>
        </AdminStatsProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;