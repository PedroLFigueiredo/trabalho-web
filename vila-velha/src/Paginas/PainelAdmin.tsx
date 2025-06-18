// Em src/pages/PainelAdmin.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAdminStats } from '../tools/useAdminStats';
import { useEstoque } from '../tools/useEstoque';
import { ChartBar, DollarSign, Box, PlusCircle } from 'lucide-react';
import FormAdicionarCarro from '../components/FormAdicionarCarro';

function PainelAdmin() {
  const navigate = useNavigate();
  const { carrosVendidos, faturamento } = useAdminStats();
  const { estoque, refetchEstoque } = useEstoque();
  
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
      alert('Acesso não autorizado');
      navigate('/');
    }
  }, [navigate]);

  const totalEstoque = estoque.reduce((sum, item) => sum + (item.estoque || 0), 0);

  const handleSuccess = () => {
    setIsFormVisible(false);
    refetchEstoque();
    // Idealmente, você também recarregaria as estatísticas aqui.
  };

  return (
    // Estrutura principal seguindo o padrão de Carrinho.tsx
    <div className="flex flex-col min-h-screen">
      <Header />

      {isFormVisible && (
        <FormAdicionarCarro 
          onSuccess={handleSuccess}
          onCancel={() => setIsFormVisible(false)}
        />
      )}

      {/* Conteúdo principal com container e espaçamento padrão */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <h1 className="text-4xl font-retro text-[#5e3a1f] mb-4 sm:mb-0">Painel do Administrador</h1>
            <button 
                onClick={() => setIsFormVisible(true)}
                className="flex items-center space-x-2 bg-[#5e3a1f] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#3e2f2f] transition-colors"
            >
                <PlusCircle className="w-6 h-6" />
                <span>Adicionar Novo Carro</span>
            </button>
        </div>

        {/* Seção dos cards de estatísticas preenchida */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card: Carros Vendidos */}
          <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center space-x-4">
            <ChartBar className="w-12 h-12 text-[#5e3a1f]" />
            <div>
              <h2 className="text-xl font-semibold text-[#3e3e3e]">Carros Vendidos</h2>
              <p className="text-3xl font-bold text-[#9b4c28]">{carrosVendidos}</p>
            </div>
          </div>

          {/* Card: Faturamento */}
          <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center space-x-4">
            <DollarSign className="w-12 h-12 text-[#5e3a1f]" />
            <div>
              <h2 className="text-xl font-semibold text-[#3e3e3e]">Faturamento</h2>
              <p className="text-3xl font-bold text-[#9b4c28]">
                {faturamento.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </p>
            </div>
          </div>

          {/* Card: Estoque Atual */}
          <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center space-x-4">
            <Box className="w-12 h-12 text-[#5e3a1f]" />
            <div>
              <h2 className="text-xl font-semibold text-[#3e3e3e]">Unidades em Estoque</h2>
              <p className="text-3xl font-bold text-[#9b4c28]">{totalEstoque}</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default PainelAdmin;