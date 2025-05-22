import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Paginas/Home';
import Loja from './Paginas/Loja';
import DetalhesProduto from './Paginas/DetalhesProduto';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loja" element={<Loja />} />
        <Route path="/carro/:slug" element={<DetalhesProduto />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
