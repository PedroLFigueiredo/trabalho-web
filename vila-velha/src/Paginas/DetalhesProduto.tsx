// Importações principais de bibliotecas, hooks e componentes
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEstoque, Carro } from '../tools/useEstoque'; // Hook e tipo para manipulação do estoque
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from './CarrinhoContext'; // Contexto para o carrinho de compras

// Componente da página de detalhes do carro
export default function DetalhesCarro() {
  const { slug } = useParams<{ slug: string }>(); // Obtém o parâmetro da URL (slug do carro)
  const navigate = useNavigate(); // Hook de navegação
  const { addToCart } = useCart(); // Função para adicionar item ao carrinho
  const { estoque, setEstoque } = useEstoque(); // Estado global do estoque

  const isAdmin = localStorage.getItem('isAdmin') === 'true'; // Verifica se é admin

  // Encontra o índice do carro pelo slug
  const idx = estoque.findIndex(c => c.slug === slug);
  if (idx === -1) {
    // Caso o carro não exista no estoque
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl text-red-600">Carro não encontrado</h2>
        <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-[#5e3a1f] text-white rounded">Voltar</button>
      </div>
    );
  }

  // Estado local para manipular as alterações do carro
  const [carro, setCarro] = useState<Carro>(estoque[idx]);

  // Atualiza campos editáveis (apenas para admin)
  const handleCampoChange = (campo: keyof Carro, valor: string | number) => {
    const novoValor = campo === 'preco' || campo === 'estoque' ? Number(valor) : valor;
    const atualizado = { ...carro, [campo]: novoValor };
    if (campo === 'estoque' && Number(valor) < 0) {
      return; // Ignora valores negativos para estoque
  }
    setCarro(atualizado);

    // Atualiza o estado global do estoque
    const novoArray = [...estoque];
    novoArray[idx] = atualizado;
    setEstoque(novoArray);
  };

  // Adiciona o carro ao carrinho e redireciona para a página do carrinho
  const handleAddToCart = () => {
    addToCart({ ...carro, precoNumero: carro.preco, quantidade: 1 });
    navigate('/carrinho');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Imagem do carro */}
          <img src={carro.imagem} alt={carro.modelo} className="w-full md:w-1/2 rounded-lg shadow" />

          {/* Detalhes do carro */}
          <div className="flex flex-col gap-4 w-full md:w-1/2">
            <h2 className="text-4xl font-retro text-[#5e3a1f]">
              {carro.modelo} ({carro.ano})
            </h2>

            {/* Se o usuário for admin, mostra campos editáveis */}
            {isAdmin ? (
              <>
                <label>
                  Descrição:
                  <input
                    type="text"
                    value={carro.descricao}
                    onChange={e => handleCampoChange('descricao', e.target.value)}
                    className="w-full border rounded px-2 py-1 mt-1"
                  />
                </label>
                <label>
                  Preço:
                  <input
                    type="number"
                    value={carro.preco}
                    onChange={e => handleCampoChange('preco', e.target.value)}
                    className="w-32 border rounded px-2 py-1 mt-1"
                  />
                </label>
                <label>
                  Estoque:
                  <input
                    type="number"
                    value={carro.estoque}
                    onChange={e => handleCampoChange('estoque', e.target.value)}
                    className="w-24 border rounded px-2 py-1 mt-1"
                  />
                </label>
              </>
            ) : (
              <>
                {/* Se for cliente, mostra os dados apenas para visualização */}
                <p className="text-xl font-serif text-[#3e2f2f]">{carro.descricao}</p>
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

            {/* Botões de ação */}
            <div className="mt-6 flex gap-4">
              {/* Botão "Adicionar ao carrinho" para usuários comuns */}
              {!isAdmin && (
                <button
                  onClick={handleAddToCart}
                  disabled={carro.estoque === 0}
                  className={`${
                    carro.estoque === 0
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-[#3e2f2f] hover:bg-[#5e3a1f]'
                  } px-6 py-2 rounded-md text-white transition`}
                >
                  Adicionar ao carrinho
                </button>
              )}

              {/* Botão de voltar */}
              <button
                onClick={() => navigate(-1)}
                className="px-4 py-2 text-sm border border-[#5e3a1f] text-[#5e3a1f] rounded hover:bg-[#f3e6d8]"
              >
                Voltar
              </button>
            </div>

            {/* Reprodutor de áudio (ronco do motor) visível apenas para clientes */}
            {!isAdmin && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-[#3e3a1f]">Ouça o ronco do motor</h3>
                <audio controls className="w-full mt-2">
                  <source src={`/audio/motor-75615.mp3`} type="audio/mpeg" />
                  Seu navegador não suporta reprodução de áudio.
                </audio>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
