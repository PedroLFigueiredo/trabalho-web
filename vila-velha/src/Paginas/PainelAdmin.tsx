import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAdminStats } from '../tools/useAdminStats';
import { useEstoque } from '../tools/useEstoque';
import { ChartBar, DollarSign, Box } from 'lucide-react';

function PainelAdmin() {
  const navigate = useNavigate();
  const { carrosVendidos, faturamento } = useAdminStats();
  const { estoque } = useEstoque();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin'); // Checa a chave admin no localstorage para definir se o usuário tem acesso ao painel de Admin
    if (isAdmin !== 'true') {
      alert('Acesso não autorizado');
      navigate('/');
    }
  }, [navigate]);

  // Estatística adicional: total de unidades em estoque
  const totalEstoque = estoque.reduce((sum, item) => sum + (item.estoque || 0), 0);

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f7f7]">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-[#5e3a1f] mb-6">Painel do Administrador</h1>

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
