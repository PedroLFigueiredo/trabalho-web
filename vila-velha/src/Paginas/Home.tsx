import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardCarro from '../components/CardCarro';
import estoqueLoja from '../data/carros';

function Home() {
  const [carros] = useState(estoqueLoja.filter(carro => carro.estoque > 0));

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-8 px-4">
        <div className="container mx-auto">
          <section className="mb-12 text-center">
            <h2 className="font-retro text-4xl text-[#5e3a1f] mb-4">Bem-vindo à Vila Velha</h2>
            <p className="font-serif text-xl text-[#3e2f2f] max-w-3xl mx-auto">
              Especialistas em carros antigos e clássicos que contam histórias de épocas douradas do automobilismo.
            </p>
          </section>

          <section>
            <h2 className="font-retro text-3xl text-[#5e3a1f] mb-6 text-center">Destaques da Coleção</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {carros.slice(0, 3).map((carro, index) => (
                <CardCarro
                  key={index}
                  modelo={carro.modelo}
                  ano={carro.ano}
                  descricao={carro.descricao}
                  preco={carro.preco.toString()}
                  imagem={carro.imagem}
                  estoque={carro.estoque}
                  slug={carro.slug}
                />
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
