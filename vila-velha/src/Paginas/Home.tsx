import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardCarro from '../components/CardCarro';


import BelAir1957 from '../imagens/1957BelAir.jpg';
import Eldorado1959 from '../imagens/1959eldorado.jpg';
import Fusca1968 from '../imagens/1968Fusca.jpg';
import Mercedes300SL from '../imagens/300SL 1955.jpg';
import Barracuda1970 from '../imagens/Barracuda1970.jpg';
import Camaro1969 from '../imagens/Camaro1969.jpg';
import Charger1969 from '../imagens/Charger1969.jpg';
import Mustang1965 from '../imagens/Mustang 1965.jpg';
import OpalaSS1974 from '../imagens/OpalaSS1974.jpg';


function Home() {
const carrosExemplo = [
  {
    modelo: "Chevrolet Bel Air",
    ano: 1957,
    descricao: "Ícone da era dourada americana, com design de barbatanas traseiras e acabamento cromado deslumbrante.",
    preco: "R$ 195.000",
    imagem: BelAir1957
  },
  {
    modelo: "Cadillac Eldorado",
    ano: 1959,
    descricao: "Luxo sobre rodas com barbatanas lendárias e presença imponente nas ruas.",
    preco: "R$ 320.000",
    imagem: Eldorado1959
  },
  {
    modelo: "Volkswagen Fusca",
    ano: 1968,
    descricao: "O clássico alemão que conquistou o mundo com sua simplicidade, confiabilidade e design atemporal.",
    preco: "R$ 55.000",
    imagem: Fusca1968
  },
  {
    modelo: "Mercedes-Benz 300SL",
    ano: 1955,
    descricao: "Portas asa de gaivota e um visual lendário, símbolo de inovação e elegância.",
    preco: "R$ 990.000",
    imagem: Mercedes300SL
  },
  {
    modelo: "Plymouth Barracuda",
    ano: 1970,
    descricao: "Um muscle car feroz, com visual imponente e motor V8 de respeito.",
    preco: "R$ 210.000",
    imagem: Barracuda1970
  },
  {
    modelo: "Chevrolet Camaro Z28",
    ano: 1969,
    descricao: "Elegância e potência em um clássico imortal da linha Camaro.",
    preco: "R$ 250.000",
    imagem: Camaro1969
  },
  {
    modelo: "Dodge Charger R/T",
    ano: 1969,
    descricao: "Símbolo das perseguições de filme, com força bruta e visual agressivo.",
    preco: "R$ 270.000",
    imagem: Charger1969
  },
  {
    modelo: "Ford Mustang",
    ano: 1965,
    descricao: "O pony car original que definiu uma categoria e se tornou símbolo de liberdade e juventude americana.",
    preco: "R$ 240.000",
    imagem: Mustang1965
  },
  {
    modelo: "Opala SS",
    ano: 1974,
    descricao: "O muscle car brasileiro, com pegada esportiva e motor seis canecos.",
    preco: "R$ 95.000",
    imagem: OpalaSS1974
  }
];



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
            <div className="flex justify-center mt-8 gap-4 flex-wrap">
              <button className="bg-[#3e2f2f] text-white text-lg px-8 py-3 rounded-full hover:bg-[#5e3a1f] transition">
                Explorar Coleção
              </button>
              <button className="border-2 border-[#c4a484] text-[#5e3a1f] font-semibold rounded-full px-8 py-3 hover:bg-[#c4a484] hover:text-white transition-colors duration-300">
                Contato
              </button>
            </div>
          </section>
          
          <section>
            <h2 className="font-retro text-3xl text-[#5e3a1f] mb-6 text-center">Destaques da Coleção</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {carrosExemplo.map((carro, index) => (
                <CardCarro
                  key={index}
                  modelo={carro.modelo}
                  ano={carro.ano}
                  descricao={carro.descricao}
                  preco={carro.preco}
                  imagem={carro.imagem}
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
