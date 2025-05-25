import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Paginas/Home';
import Loja from './Paginas/Loja';
import DetalhesProduto from './Paginas/DetalhesProduto';
import Carrinho from './Paginas/Carrinho';
import { CartProvider } from './Paginas/CarrinhoContext'; 
import Login from './Paginas/Login'
import Cadastro from './Paginas/Cadastro'
import Pagamento from './Paginas/Pagamento';
import PainelAdmin from './Paginas/PainelAdmin';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loja" element={<Loja />} />
          <Route path="/carro/:slug" element={<DetalhesProduto />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/pagamento" element={<Pagamento />} />
          <Route path="/paineladmin" element={<PainelAdmin />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
