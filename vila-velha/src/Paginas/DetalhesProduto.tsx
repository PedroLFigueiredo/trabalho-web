// src/Paginas/DetalhesCarro.tsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEstoque, Carro } from '../tools/useEstoque';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from './CarrinhoContext';

export default function DetalhesCarro() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { estoque, setEstoque } = useEstoque();
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  // encontra índice no estoque global
  const idx = estoque.findIndex((c) => c.slug === slug);
  if (idx === -1) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl text-red-600">Carro não encontrado</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-[#5e3a1f] text-white rounded"
        >
          Voltar
        </button>
      </div>
    );
  }

  // estado local inicia com o objeto do estoque global
  const [carro, setCarro] = useState<Carro>(estoque[idx]);

  // atualiza tanto local quanto global
  const handleCampoChange = (
    campo: keyof Carro,
    valor: string | number
  ): void => {
    const novoValor =
      campo === 'preco' || campo === 'estoque' ? Number(valor) : valor;
    const atualizado = { ...carro, [campo]: novoValor };
    setCarro(atualizado);

    const novoArray = [...estoque];
    novoArray[idx] = atualizado;
    setEstoque(novoArray);
  };

  const handleAddToCart = () => {
    addToCart({ ...carro, precoNumero: carro.preco, quantidade: 1 });
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
          <div className="flex flex-col gap-4 w-full md:w-1/2">
            <h2 className="text-4xl font-retro text-[#5e3a1f]">
              {carro.modelo} ({carro.ano})
            </h2>

            {isAdmin ? (
              <>
                <label>
                  Descrição:
                  <input
                    type="text"
                    value={carro.descricao}
                    onChange={(e) =>
                      handleCampoChange('descricao', e.target.value)
                    }
                    className="w-full border rounded px-2 py-1 mt-1"
                  />
                </label>
                <label>
                  Preço:
                  <input
                    type="number"
                    value={carro.preco}
                    onChange={(e) =>
                      handleCampoChange('preco', e.target.value)
                    }
                    className="w-32 border rounded px-2 py-1 mt-1"
                  />
                </label>
                <label>
                  Estoque:
                  <input
                    type="number"
                    value={carro.estoque}
                    onChange={(e) =>
                      handleCampoChange('estoque', e.target.value)
                    }
                    className="w-24 border rounded px-2 py-1 mt-1"
                  />
                </label>
              </>
            ) : (
              <>
                <p className="text-xl font-serif text-[#3e2f2f]">
                  {carro.descricao}
                </p>
                <p className="text-2xl font-bold text-[#9b4c28]">
                  {carro.preco.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </p>
                <p className="text-md text-[#5e3a1f] font-medium">
                  {carro.estoque > 0
                    ? `${carro.estoque} unidade(s) em estoque`
                    : 'Sem estoque disponível'}
                </p>
              </>
            )}

            <div className="mt-6 flex gap-4">
              {!isAdmin && (
                <button
                  onClick={handleAddToCart}
                  disabled={carro.estoque === 0}
                  className={`px-6 py-2 rounded-md text-white transition ${
                    carro.estoque === 0
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-[#3e2f2f] hover:bg-[#5e3a1f]'
                  }`}
                >
                  Adicionar ao carrinho
                </button>
              )}
              <button
                onClick={() => navigate(-1)}
                className="px-4 py-2 text-sm border border-[#5e3a1f] text-[#5e3a1f] rounded hover:bg-[#f3e6d8]"
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
