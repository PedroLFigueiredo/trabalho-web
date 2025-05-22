import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardCarro from '../components/CardCarro';

const carrosMock = [
  {
    modelo: "Chevrolet Bel Air",
    ano: 1957,
    descricao: "Ícone da era dourada americana, com design de barbatanas traseiras e acabamento cromado deslumbrante.",
    preco: "R$ 195.000",
    imagem: "/imagens/1957BelAir.jpg",
    estoque: 5
  },
  {
    modelo: "Cadillac Eldorado",
    ano: 1959,
    descricao: "Luxo sobre rodas com barbatanas lendárias e presença imponente nas ruas.",
    preco: "R$ 320.000",
    imagem: "/imagens/1959eldorado.jpg",
    estoque: 2
  },
  {
    modelo: "Volkswagen Fusca",
    ano: 1968,
    descricao: "O clássico alemão que conquistou o mundo com sua simplicidade, confiabilidade e design atemporal.",
    preco: "R$ 55.000",
    imagem: "/imagens/1968Fusca.jpg",
    estoque: 10
  }
];

function Home() {
  const [carros, setCarros] = useState(carrosMock);

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
              {carros.map((carro, index) => (
                <CardCarro
                  key={index}
                  modelo={carro.modelo}
                  ano={carro.ano}
                  descricao={carro.descricao}
                  preco={carro.preco}
                  imagem={carro.imagem}
                  estoque={carro.estoque}
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
