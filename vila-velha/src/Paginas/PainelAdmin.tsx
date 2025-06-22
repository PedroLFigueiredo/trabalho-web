// Em src/pages/PainelAdmin.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAdminStats } from '../tools/useAdminStats';
import { useEstoque } from '../tools/useEstoque';
import { ChartBar, DollarSign, Box, PlusCircle, Users } from 'lucide-react';
import FormAdicionarCarro from '../components/FormAdicionarCarro';

// Definir uma interface para o usuário para tipagem
interface User {
  _id: string;
  nome: string;
  email: string;
  isAdmin: boolean;
  // Adicione outras propriedades do usuário que você queira exibir (endereço, telefone, etc.)
}

function PainelAdmin() {
  const navigate = useNavigate();
  const { carrosVendidos, faturamento } = useAdminStats();
  const { estoque, refetchEstoque } = useEstoque();
  
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState<string | null>(null);

  const BACKEND_URL = 'http://localhost:3001';

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
      alert('Acesso não autorizado');
      navigate('/');
    }
  }, [navigate]);

  // useEffect para buscar todos os usuários
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setUsersLoading(true);
        setUsersError(null);
        const response = await fetch(`${BACKEND_URL}/api/users`);
        if (!response.ok) {
          throw new Error('Falha ao buscar usuários do servidor.');
        }
        const data: User[] = await response.json();
        setUsers(data);
      } catch (err: any) {
        console.error("Erro ao buscar usuários:", err);
        setUsersError("Erro ao carregar usuários: " + err.message);
      } finally {
        setUsersLoading(false);
      }
    };

    if (localStorage.getItem('isAdmin') === 'true') {
        fetchUsers();
    }
  }, []);

  const totalEstoque = estoque.reduce((sum, item) => sum + (item.estoque || 0), 0);

  const handleSuccess = () => {
    setIsFormVisible(false);
    refetchEstoque();
    // Idealmente, você também recarregaria as estatísticas aqui.
  };

  // NOVA FUNÇÃO: Lógica para promover/rebaixar o usuário
  const handleToggleAdminStatus = async (userId: string, currentAdminStatus: boolean) => {
    const confirmMessage = currentAdminStatus
      ? `Tem certeza que deseja REBAIXAR este usuário?`
      : `Tem certeza que deseja PROMOVER este usuário a Admin?`;

    if (!window.confirm(confirmMessage)) {
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isAdmin: !currentAdminStatus }), // Envia o novo status
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Falha ao atualizar status de admin.');
      }

      // Atualiza o usuário na lista localmente após o sucesso do backend
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user._id === userId ? { ...user, isAdmin: !currentAdminStatus } : user
        )
      );
      alert(`Status de admin atualizado com sucesso!`);

      // Se o usuário logado rebaixar a si mesmo, força o logout
      if (userId === localStorage.getItem('userId') && !currentAdminStatus) {
        alert('Você rebaixou a si mesmo. Será necessário fazer logout.');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('userId');
        localStorage.removeItem('nome');
        localStorage.removeItem('carrinho');
        navigate('/login');
      }

    } catch (e: any) {
      console.error("Erro ao atualizar status de admin:", e);
      alert('Erro ao atualizar status de admin: ' + e.message);
    }
  };


  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {isFormVisible && (
        <FormAdicionarCarro 
          onSuccess={handleSuccess}
          onCancel={() => setIsFormVisible(false)}
        />
      )}

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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

        {/* Seção de Gerenciamento de Usuários */}
        <section className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-[#5e3a1f] mb-6 flex items-center space-x-2">
                <Users className="w-8 h-8" />
                <span>Gerenciar Usuários</span>
            </h2>

            {usersLoading ? (
                <p className="text-center text-gray-600">Carregando usuários...</p>
            ) : usersError ? (
                <p className="text-center text-red-500">Erro: {usersError}</p>
            ) : users.length === 0 ? (
                <p className="text-center text-gray-600">Nenhum usuário cadastrado.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        <Link to={`/admin/users/${user._id}`} className="text-blue-600 hover:text-blue-900">
                                            {user.nome}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.isAdmin ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {user.isAdmin ? 'Sim' : 'Não'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        {/* Botão de Promover/Remover Admin - AGORA ATIVADO */}
                                        <button 
                                            onClick={() => handleToggleAdminStatus(user._id, user.isAdmin)}
                                            className={`px-3 py-1 rounded text-white ${user.isAdmin ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} transition-colors`}
                                            // Desabilitar o botão se for o próprio admin logado tentando se rebaixar (para evitar bloqueio acidental)
                                            disabled={user._id === localStorage.getItem('userId') && user.isAdmin} 
                                        >
                                            {user.isAdmin ? 'Remover Admin' : 'Promover a Admin'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default PainelAdmin;