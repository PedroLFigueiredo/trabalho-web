// Em src/pages/Loja.tsx

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardCarro from '../components/CardCarro';
import { useEstoque } from '../tools/useEstoque';

export default function Loja() {
  // O hook agora retorna mais informações!
  const { estoque, isLoading, error, refetchEstoque } = useEstoque();
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  // O handleUpdate agora fará uma chamada de API
  const handleUpdate = async (
    carroId: string,
    campo: 'preco' | 'estoque' | 'descricao',
    valor: string | number
  ) => {
    try {
      await fetch(`http://localhost:3001/api/carros/${carroId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [campo]: valor }),
      });
      // Após atualizar, buscamos a lista nova
      refetchEstoque();
    } catch (e) {
      console.error("Falha ao atualizar o carro", e);
      alert("Erro ao atualizar. Tente novamente.");
    }
  };

  // Lógica de renderização condicional
  const renderContent = () => {
    if (isLoading) {
      return <p className="text-center text-xl">Carregando nossa garagem...</p>;
    }
    if (error) {
      return <p className="text-center text-xl text-red-500">Erro ao buscar carros: {error}</p>;
    }
    if (estoque.length === 0) {
      return <p className="text-center text-xl">Nenhum carro em exposição no momento.</p>;
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {estoque.map((carro) => (
          <CardCarro
            key={carro.slug}
            {...carro}
            isAdmin={isAdmin}
            // Passamos o ID do carro para a função de update
            onUpdate={(campo, valor) => handleUpdate(carro._id, campo, valor)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* Aplicando o mesmo container e espaçamento do Carrinho.tsx */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-4xl font-retro text-center text-[#5e3a1f] mb-8">
          Nossa Loja
        </h2>
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}