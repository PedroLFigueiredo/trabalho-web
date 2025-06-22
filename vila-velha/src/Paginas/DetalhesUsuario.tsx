import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Interface para um item dentro de um pedido
interface ItemDoPedido {
  carroId: {
    _id: string;
    modelo: string;
    ano: number;
    imagem?: string;
    slug?: string;
  };
  modelo: string; // Adicionado para facilitar a exibição
  quantidade: number;
  precoNaCompra: number;
  imagem?: string; // Imagem do carro no momento da compra
  _id: string; // ID do item do pedido
}

// Interface para um pedido (compra)
interface Pedido {
  _id: string;
  user: string; // ID do usuário
  itens: ItemDoPedido[];
  total: number;
  dataCompra: string; // Data da compra
  status: string;
  createdAt: string;
  updatedAt: string;
}

// Interface para o usuário, atualizada para incluir 'pedidos'
interface User {
  _id: string;
  nome: string;
  email: string;
  endereco: string;
  telefone: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  pedidos?: Pedido[]; // NOVO: Propriedade para o histórico de pedidos
}

function DetalhesUsuario() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const BACKEND_URL = 'http://localhost:3001';

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPromoting, setIsPromoting] = useState(false);

  const fetchUser = useCallback(async () => {
    if (!id) {
      setError("ID do usuário não fornecido na URL.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BACKEND_URL}/api/users/${id}`);
      if (!response.ok) {
        throw new Error('Usuário não encontrado.');
      }
      const data: User = await response.json();
      setUser(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
      alert('Acesso não autorizado. Apenas administradores podem ver detalhes de usuários.');
      navigate('/');
      return;
    }
    fetchUser();
  }, [fetchUser, navigate]);


  // Função para promover/rebaixar o usuário a admin
  const handleToggleAdminStatus = async () => {
    if (!user) return;

    const confirmMessage = user.isAdmin
      ? `Tem certeza que deseja REBAIXAR o usuário "${user.nome}"?`
      : `Tem certeza que deseja PROMOVER o usuário "${user.nome}" a admin?`;

    if (!window.confirm(confirmMessage)) {
      return;
    }

    setIsPromoting(true);
    try {
      const newAdminStatus = !user.isAdmin;
      const response = await fetch(`${BACKEND_URL}/api/users/${user._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isAdmin: newAdminStatus }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Falha ao atualizar status de admin.');
      }

      const updatedUser: User = await response.json();
      setUser(updatedUser);
      alert(`Status de admin de "${updatedUser.nome}" atualizado para: ${updatedUser.isAdmin ? 'Admin' : 'Usuário Comum'}.`);
    } catch (e: any) {
      console.error("Erro ao atualizar status de admin:", e);
      alert('Erro ao atualizar status de admin: ' + e.message);
    } finally {
      setIsPromoting(false);
    }
  };


  if (isLoading) return <div className="text-center p-10 text-xl font-retro">Carregando detalhes do usuário...</div>;

  if (error || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl text-red-600 mb-4">{error || 'Usuário não encontrado'}</h2>
        <button onClick={() => navigate('/paineladmin')} className="mt-4 px-4 py-2 bg-[#5e3a1f] text-white rounded">
          Voltar ao Painel Admin
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-retro text-[#5e3a1f] mb-8 text-center">Detalhes do Usuário</h1>
        
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl mx-auto mb-8"> {/* Adicionado mb-8 */}
          <h2 className="text-2xl font-bold text-[#5e3a1f] mb-4">Informações Pessoais</h2>
          <div className="space-y-4">
            <p className="text-lg"><strong>Nome:</strong> {user.nome}</p>
            <p className="text-lg"><strong>Email:</strong> {user.email}</p>
            <p className="text-lg"><strong>Endereço:</strong> {user.endereco}</p>
            <p className="text-lg"><strong>Telefone:</strong> {user.telefone}</p>
            <p className="text-lg"><strong>Status Admin:</strong> 
              <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.isAdmin ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {user.isAdmin ? 'Sim' : 'Não'}
              </span>
            </p>
            <p className="text-sm text-gray-500"><strong>Cadastro:</strong> {new Date(user.createdAt).toLocaleString()}</p>
            <p className="text-sm text-gray-500"><strong>Última Atualização:</strong> {new Date(user.updatedAt).toLocaleString()}</p>
          </div>

          <div className="mt-8 flex justify-between items-center">
            <button 
              onClick={handleToggleAdminStatus}
              disabled={isPromoting}
              className={`px-6 py-2 rounded-md text-white transition-colors ${user.isAdmin ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} ${isPromoting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isPromoting ? 'Processando...' : (user.isAdmin ? 'Remover Admin' : 'Promover a Admin')}
            </button>
            <button 
              onClick={() => navigate('/paineladmin')} 
              className="px-5 py-2 text-sm border border-[#5e3a1f] text-[#5e3a1f] rounded hover:bg-[#f3e6d8] transition-colors"
            >
              Voltar ao Painel
            </button>
          </div>
        </div>

        {/* NOVO: Seção de Histórico de Compras (Pedidos) */}
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-[#5e3a1f] mb-4">Histórico de Compras</h2>
          {user.pedidos && user.pedidos.length > 0 ? (
            <div className="space-y-6">
              {user.pedidos.map(pedido => (
                <div key={pedido._id} className="border-b pb-4 last:border-b-0">
                  <p className="text-md font-semibold text-gray-800">
                    Pedido #{pedido._id.substring(0, 8)} - Data: {new Date(pedido.dataCompra).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">Total: {pedido.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                  <p className="text-sm text-gray-600">Status: {pedido.status}</p>
                  
                  <div className="mt-2 space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">Itens:</h4>
                    {pedido.itens.map(item => (
                      <div key={item._id} className="flex items-center gap-3 bg-gray-50 p-2 rounded-md">
                        {/* Se a imagem for populada, use o caminho completo */}
                        {item.carroId?.imagem && (
                          <img
                            src={`${BACKEND_URL}${item.carroId.imagem}`}
                            alt={item.carroId.modelo}
                            className="w-16 h-12 object-cover rounded"
                          />
                        )}
                        <div>
                          <p className="text-sm font-semibold">{item.carroId ? `${item.carroId.modelo} (${item.carroId.ano})` : item.modelo}</p>
                          <p className="text-xs text-gray-600">Qtd: {item.quantidade} - Preço na compra: {item.precoNaCompra.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">Este usuário ainda não possui histórico de compras.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default DetalhesUsuario;