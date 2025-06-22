// Importação de módulos e componentes necessários
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardCarro from '../components/CardCarro';
// REMOVA a linha abaixo, pois carros.ts não está mais no frontend:
// import estoqueLoja from '../data/carros'; // Dados iniciais dos carros da loja

// Defina a interface Carro. Se você já tem uma interface global (ex: em 'src/types/Carro.ts' ou similar),
// importe-a de lá. Caso contrário, pode defini-la aqui temporariamente.
interface Carro {
  _id: string; // ID do MongoDB
  modelo: string;
  ano: number;
  descricao: string;
  descricaoDetalhada?: string;
  preco: number;
  imagem: string;
  estoque: number;
  slug: string;
  seloDilvan?: boolean;
  audio?: string;
}

// Componente funcional que representa a página inicial
function Home() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [estoque, setEstoque] = useState<Carro[]>([]); // Inicializa vazio, será preenchido pelo backend
  const [destaques, setDestaques] = useState<Carro[]>([]); // Inicializa vazio
  const [isLoading, setIsLoading] = useState(true); // Novo estado para carregamento
  const [error, setError] = useState<string | null>(null); // Novo estado para erros

  // Função para buscar os carros do backend
  const fetchEstoque = async () => {
    try {
      setIsLoading(true); // Inicia o carregamento
      setError(null); // Limpa erros anteriores
      const response = await fetch('http://localhost:3001/api/carros'); // REQUISIÇÃO AO BACKEND
      if (!response.ok) {
        throw new Error(`Erro ao carregar estoque: ${response.statusText}`);
      }
      const data: Carro[] = await response.json();
      setEstoque(data); // Define o estoque com dados do backend
    } catch (err: any) {
      console.error("Erro ao buscar dados do estoque:", err);
      setError("Erro ao buscar dados do estoque. Tente novamente mais tarde.");
    } finally {
      setIsLoading(false); // Finaliza o carregamento
    }
  };

  useEffect(() => {
    // Busca o estoque ao montar o componente
    fetchEstoque();

    // Verifica no localStorage se o usuário é admin
    const admin = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(admin);
  }, []); // Executa apenas uma vez ao montar

  // Este useEffect agora depende de 'estoque' para atualizar os destaques
  useEffect(() => {
    if (estoque.length > 0) { // Garante que o estoque já foi carregado
      const salvos = localStorage.getItem('destaques');
      if (salvos) {
        const slugsSalvos = JSON.parse(salvos); // Ex: ['fusca-1970', 'opala-1980', 'maverick-1974']

        const carrosSalvos = slugsSalvos
          .map((slug: string) => estoque.find(carro => carro.slug === slug))
          .filter(Boolean) as Carro[]; // Filtra e garante o tipo

        if (carrosSalvos.length === 3) {
          setDestaques(carrosSalvos);
        } else {
          // Se não encontrou 3, ou se os slugs salvos são inválidos, usa os 3 primeiros com estoque
          setDestaques(estoque.filter(c => c.estoque > 0).slice(0, 3));
        }
      } else {
        // Se não há destaques salvos, usa os 3 primeiros com estoque
        setDestaques(estoque.filter(c => c.estoque > 0).slice(0, 3));
      }
    }
  }, [estoque]); // Roda sempre que o estoque for atualizado

  // Função para trocar um carro de destaque por outro do estoque
  const handleTrocarDestaque = (index: number, slugSelecionado: string) => {
    const carroSelecionado = estoque.find(carro => carro.slug === slugSelecionado);
    if (!carroSelecionado) return;

    const novosDestaques = [...destaques];
    novosDestaques[index] = carroSelecionado;
    setDestaques(novosDestaques);

    // Atualiza os destaques no localStorage para persistência
    localStorage.setItem('destaques', JSON.stringify(novosDestaques.map(c => c.slug)));
  };

  // Renderização da página
  if (isLoading) {
    return <div className="text-center p-10 text-xl font-retro">Carregando estoque...</div>;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl text-red-600 mb-4">{error}</h2>
        <p className="text-lg">Por favor, verifique se seu servidor backend está rodando e se o banco de dados tem dados de carros.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-8 px-4">
        <div className="container mx-auto">

          {/* Seção de boas-vindas */}
          <section className="mb-12 text-center">
            <h2 className="font-retro text-4xl text-[#5e3a1f] mb-4">Bem-vindo à Vila Velha</h2>
            <p className="font-serif text-xl text-[#3e2f2f] max-w-3xl mx-auto">
              Especialistas em carros antigos e clássicos que contam histórias de épocas douradas do automobilismo.
            </p>
          </section>

          {/* Seção de destaques da coleção */}
          <section>
            <h2 className="font-retro text-3xl text-[#5e3a1f] mb-6 text-center">Destaques da Coleção</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {destaques.length > 0 ? ( // Renderiza destaques se existirem
                destaques.map((carro, index) => (
                  <div key={index} className="relative">
                    <CardCarro
                      modelo={carro.modelo}
                      ano={carro.ano}
                      descricao={carro.descricao}
                      preco={carro.preco.toString()}
                      imagem={carro.imagem}
                      slug={carro.slug}
                      seloDilvan={!!carro.seloDilvan}
                    />
                    {isAdmin && (
                      <div className="mt-2">
                        <label className="block text-sm text-[#5e3a1f] font-bold mb-1">
                          Trocar destaque {index + 1}:
                        </label>
                        <select
                          value={carro.slug}
                          onChange={(e) => handleTrocarDestaque(index, e.target.value)}
                          className="w-full border border-[#c4a484] rounded px-2 py-1"
                        >
                          {estoque
                            .filter(opcao => opcao.estoque > 0) // Garante que só carros em estoque apareçam para seleção
                            .map((opcao) => (
                              <option key={opcao.slug} value={opcao.slug}>
                                {opcao.modelo} ({opcao.ano})
                              </option>
                            ))}
                        </select>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="col-span-full text-center text-xl text-gray-600">Nenhum carro em destaque disponível no momento.</p>
              )}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;