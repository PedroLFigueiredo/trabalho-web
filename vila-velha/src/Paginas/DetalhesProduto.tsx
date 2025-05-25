import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import estoqueLoja from '../data/carros';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from './CarrinhoContext';

function DetalhesCarro() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const carro = estoqueLoja.find((c) => c.slug === slug);

  if (!carro) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl text-red-600">Carro não encontrado </h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-[#5e3a1f] text-white rounded"
        >
          Voltar
        </button>
      </div>
    );
  }

  const priceToNumber = (p: string): number =>
    Number(p.replace(/\s|R\$|\u00A0|\./g, '').replace(',', '.'));

  const handleAddToCart = () => {
    addToCart({
      modelo: carro.modelo,
      ano: carro.ano,
      descricao: carro.descricao,
      precoNumero: carro.preco,
      imagem: carro.imagem,
      estoque: carro.estoque,
      slug: carro.slug,
      quantidade: 1,
    });
    navigate('/carrinho'); 
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <img
            src={carro.imagem}
            alt={carro.modelo}
            className="w-full md:w-1/2 rounded-lg shadow"
          />
          <div className="flex flex-col gap-4">
            <h2 className="text-4xl font-retro text-[#5e3a1f]">
              {carro.modelo} ({carro.ano})
            </h2>
            <p className="text-xl font-serif text-[#3e2f2f]">{carro.descricao}</p>
            <p className="text-2xl font-bold text-[#9b4c28]">
              {carro.preco}
            </p>
            <p className="text-md text-[#5e3a1f] font-medium">
              {carro.estoque && carro.estoque > 0
                ? `${carro.estoque} unidade(s) em estoque`
                : 'Sem estoque disponível'}
            </p>
            <button
              onClick={handleAddToCart}
              disabled={carro.estoque === 0}
              className={`bg-[#3e2f2f] text-white px-6 py-2 rounded-md transition ${
                carro.estoque === 0
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-[#5e3a1f]'
              }`}
            >
              Adicionar ao carrinho
            </button>
            <button
              onClick={() => navigate(-1)}
              className="mt-2 px-4 py-2 text-sm border border-[#5e3a1f] text-[#5e3a1f] rounded hover:bg-[#f3e6d8]"
            >
              Voltar
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default DetalhesCarro;
