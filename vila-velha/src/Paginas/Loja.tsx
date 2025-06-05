// Importa bibliotecas e componentes necessários
import React from 'react';
import Header from '../components/Header'; // Cabeçalho do site
import Footer from '../components/Footer'; // Rodapé do site
import CardCarro from '../components/CardCarro'; // Componente para exibir informações de cada carro
import { useEstoque } from '../tools/useEstoque'; // Hook personalizado para acessar e atualizar o estoque

// Componente funcional que representa a página da loja
export default function Loja() {
  // Usa o hook personalizado para obter o estado do estoque e a função para atualizá-lo
  const { estoque, setEstoque } = useEstoque();

  // Verifica se o usuário é administrador (com base no valor salvo no localStorage)
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  // Função para atualizar uma propriedade de um item específico do estoque
  const handleUpdate = (
    index: number, // Índice do item no array
    campo: 'preco' | 'estoque' | 'descricao' | 'seloDilvan', // Campo a ser atualizado
    valor: string | number | boolean // Novo valor
  ) => {
    const novo = [...estoque]; // Cria uma cópia do estoque
    // Atualiza o campo com o novo valor (converte para número se for preco ou estoque)
    (novo[index] as any)[campo] =
      campo === 'preco' || campo === 'estoque' ? Number(valor) : valor;
    setEstoque(novo); // Atualiza o estado com o novo estoque
  };

  return (
    <div className="flex flex-col min-h-screen"> {/* Layout de coluna com altura mínima da tela */}
      <Header /> {/* Cabeçalho do site */}
      <main className="flex-grow py-10 px-4"> {/* Conteúdo principal com preenchimento interno */}
        <div className="container mx-auto"> {/* Centraliza o conteúdo */}
          <h2 className="text-4xl font-retro text-center text-[#5e3a1f] mb-4">
            Nossa Loja {/* Título da página */}
          </h2>
          {/* Grelha responsiva para exibir os carros */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Mapeia o array de carros do estoque e renderiza um CardCarro para cada um */}
            {estoque.map((carro, idx) => (
              <CardCarro
                key={carro.slug} // Chave única para o React
                {...carro} // Passa todas as props do carro como props para o componente
                preco={carro.preco.toString()} // Garante que o preço será passado como string
                isAdmin={isAdmin} // Indica se o usuário é admin (permite edição)
                onUpdate={(campo, valor) => handleUpdate(idx, campo, valor)} // Função para atualizar os dados
              />
            ))}
          </div>
        </div>
      </main>
      <Footer /> {/* Rodapé do site */}
    </div>
  );
}
