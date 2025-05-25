import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardCarro from '../components/CardCarro';
import estoqueLoja from '../data/carros';

function Loja() {
  const [carros, setCarros] = useState(estoqueLoja);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-10 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-retro text-center text-[#5e3a1f] mb-4">Nossa Loja</h2>
          <p className="text-center text-[#3e2f2f] mb-8 font-serif max-w-2xl mx-auto">
            Explore nosso estoque de clássicos disponíveis para compra. Todos os veículos são verificados e conservados com carinho.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {carros.map((carro, index) => (
              <CardCarro
                key={index}
                modelo={carro.modelo}
                ano={carro.ano}
                descricao={carro.descricao}
                preco={carro.preco.toString()}
                imagem={carro.imagem}
                estoque={carro.estoque}
                slug={carro.slug}
                seloDilvan={carro.seloDilvan}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Loja;
