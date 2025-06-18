import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Carro } from '../tools/useEstoque'; 
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from './CarrinhoContext'; 

export default function DetalhesCarro() {
  // --- Hooks e Constantes ---
  const { slug } = useParams<{ slug: string }>(); 
  const navigate = useNavigate(); //
  const { addToCart } = useCart(); //
  const isAdmin = localStorage.getItem('isAdmin') === 'true'; 
  const BACKEND_URL = 'http://localhost:3001';

  // --- Estados do Componente ---
  const [carro, setCarro] = useState<Carro | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- Funções de Lógica ---

  const fetchCarro = useCallback(async () => {
    if (!slug) {
        setError("Slug do carro não fornecido na URL.");
        setIsLoading(false);
        return;
    }
    
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:3001/api/carros/${slug}`);
      if (!response.ok) throw new Error('Carro não encontrado.');
      const data: Carro = await response.json();
      setCarro(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchCarro();
  }, [fetchCarro]);

  // Atualiza campos editáveis (apenas para admin)
  const handleCampoChange = (campo: keyof Carro, valor: string | number) => { //
    if (!carro) return;
    const novoValor = campo === 'preco' || campo === 'estoque' ? Number(valor) : valor;
    if (campo === 'estoque' && Number(valor) < 0) return; //
    setCarro({ ...carro, [campo]: novoValor });
  };

  // Envia as alterações para a API (apenas para admin)
  const handleSaveChanges = async () => {
    if (!carro) return;
    try {
        const response = await fetch(`http://localhost:3001/api/carros/${carro._id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(carro)
        });
        if (!response.ok) throw new Error("Falha ao salvar. Tente novamente.");
        alert("Alterações salvas com sucesso!");
    } catch(e: any) {
        alert(e.message);
    }
  }

  // Adiciona o carro ao carrinho e redireciona
  const handleAddToCart = () => { //
    if (!carro) return;
    addToCart({ ...carro, precoNumero: Number(carro.preco), quantidade: 1 });
    navigate('/carrinho'); //
  };

  // --- Renderização ---

  if (isLoading) return <div className="text-center p-10 text-xl font-retro">Carregando detalhes do carro...</div>;

  if (error || !carro) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl text-red-600 mb-4">{error || 'Carro não encontrado'}</h2>
        <button onClick={() => navigate('/')} className="mt-4 px-4 py-2 bg-[#5e3a1f] text-white rounded">
          Voltar para a Loja
        </button>
      </div>
    );
  }

  // Lógica inteligente para o URL da imagem
  const imageUrl = carro.imagem && carro.imagem.startsWith('/uploads/')
    ? `${BACKEND_URL}${carro.imagem}`
    : carro.imagem;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          {/* Coluna da Imagem */}
          <div className="w-full md:w-1/2">
            <img 
              src={imageUrl} 
              alt={carro.modelo} 
              className="w-full h-auto object-cover rounded-lg shadow-xl" 
            />
          </div>

          {/* Coluna dos Detalhes */}
          <div className="flex flex-col gap-4 w-full md:w-1/2">
            <h2 className="text-4xl lg:text-5xl font-retro text-[#5e3a1f]">
              {carro.modelo} <span className="text-3xl lg:text-4xl text-gray-500">({carro.ano})</span>
            </h2>

            {isAdmin ? (
              // --- MODO DE EDIÇÃO (ADMIN) ---
              <div className="space-y-4 p-4 border-2 border-dashed border-[#c4a484] rounded-lg">
                <h3 className="font-bold text-lg text-[#5e3a1f]">Modo de Edição</h3>
                <div>
                  <label htmlFor="descricao" className="block text-sm font-bold text-gray-700">Descrição:</label>
                  <textarea
                    id="descricao"
                    value={carro.descricao}
                    onChange={e => handleCampoChange('descricao', e.target.value)}
                    className="w-full border rounded px-2 py-1 mt-1 shadow-sm"
                    rows={4}
                  />
                </div>
                <div className='flex gap-4'>
                    <div>
                        <label htmlFor="preco" className="block text-sm font-bold text-gray-700">Preço (R$):</label>
                        <input
                            id="preco"
                            type="number"
                            value={carro.preco}
                            onChange={e => handleCampoChange('preco', e.target.value)}
                            className="w-32 border rounded px-2 py-1 mt-1 shadow-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="estoque" className="block text-sm font-bold text-gray-700">Estoque:</label>
                        <input
                            id="estoque"
                            type="number"
                            value={carro.estoque}
                            onChange={e => handleCampoChange('estoque', e.target.value)}
                            className="w-24 border rounded px-2 py-1 mt-1 shadow-sm"
                        />
                    </div>
                </div>
                 <button onClick={handleSaveChanges} className="w-full bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800 transition">
                    Salvar Alterações
                 </button>
              </div>
            ) : (
              // --- MODO DE VISUALIZAÇÃO (CLIENTE) ---
              <>
                <p className="text-xl font-serif text-[#3e2f2f] leading-relaxed">{carro.descricaoDetalhada || carro.descricao}</p>
                <p className="text-4xl font-bold text-[#9b4c28]">
                  {Number(carro.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
                <p className="text-md font-medium">
                  {carro.estoque > 0
                    ? <span className='text-green-700'>{`${carro.estoque} unidade(s) em estoque`}</span>
                    : <span className='text-red-600'>Sem estoque disponível</span>}
                </p>
              </>
            )}

            {/* Botões de Ação */}
            <div className="mt-6 flex flex-wrap gap-4">
              {!isAdmin && (
                <button
                  onClick={handleAddToCart} //
                  disabled={carro.estoque === 0} //
                  className="bg-[#3e2f2f] text-white px-6 py-3 rounded-md hover:bg-[#5e3a1f] transition-transform duration-200 ease-in-out hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100"
                >
                  Adicionar ao carrinho
                </button>
              )}
              <button onClick={() => navigate(-1)} className="px-5 py-2 text-sm border border-[#5e3a1f] text-[#5e3a1f] rounded hover:bg-[#f3e6d8] transition-colors">
                Voltar
              </button>
            </div>

            {/* Reprodutor de Áudio */}
            {!isAdmin && carro.audio && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-[#3e3a1f]">Ouça o ronco do motor</h3>
                <audio controls className="w-full mt-2">
                  <source src={carro.audio} type="audio/mpeg" />
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