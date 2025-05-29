import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CartItem } from '../Paginas/CarrinhoContext';

interface AdminStats {
  carrosVendidos: number;
  faturamento: number;
}

interface AdminStatsContextType extends AdminStats {
  registrarVenda: (items: CartItem[]) => void;
}

// Cria o contexto para estatísticas de vendas
const AdminStatsContext = createContext<AdminStatsContextType | undefined>(undefined);

// Provider que envolve a aplicação e disponibiliza o contexto
export function AdminStatsProvider({ children }: { children: ReactNode }) {
  const [carrosVendidos, setCarrosVendidos] = useState(0);
  const [faturamento, setFaturamento] = useState(0);

  // Carrega estatísticas do localStorage ao montar
  useEffect(() => {
    const statsJSON = localStorage.getItem('adminStats');
    if (statsJSON) {
      const stats = JSON.parse(statsJSON);
      setCarrosVendidos(stats.carrosVendidos || 0);
      setFaturamento(stats.faturamento || 0);
    }
  }, []);

  // Persiste estatísticas no localStorage sempre que mudam
  useEffect(() => {
    localStorage.setItem(
      'adminStats',
      JSON.stringify({ carrosVendidos, faturamento })
    );
  }, [carrosVendidos, faturamento]);

  // Função para registrar uma nova venda
  const registrarVenda = (items: CartItem[]) => {
    const vendidos = items.reduce((sum, item) => sum + item.quantidade, 0);
    const valor = items.reduce((sum, item) => sum + item.precoNumero * item.quantidade, 0);

    setCarrosVendidos(prev => prev + vendidos);
    setFaturamento(prev => prev + valor);
  };

  return (
    <AdminStatsContext.Provider value={{ carrosVendidos, faturamento, registrarVenda }}>
      {children}
    </AdminStatsContext.Provider>
  );
}

// Hook para consumir o contexto de estatísticas
export function useAdminStats() {
  const context = useContext(AdminStatsContext);
  if (!context) {
    throw new Error('useAdminStats deve ser usado dentro de AdminStatsProvider');
  }
  return context;
}
