import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { Link } from 'react-router-dom';


function Login() {
  // Estados para armazenar email e senha digitados pelo usuário
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('nome', data.nome);
        localStorage.setItem('carrinho', JSON.stringify(data.carrinho || []));
        localStorage.setItem('isAdmin', data.isAdmin || 'false');

        alert('Login realizado com sucesso!');
        navigate('/');
      } else {
        alert(data.message || 'Erro no login');
      }
    } catch (error) {
      console.error('Erro ao conectar com o servidor:', error);
      alert('Erro de conexão com o servidor');
    }
  };



  return (


    <div className="flex flex-col min-h-screen">
      <Header />
    <div className="flex flex-col min-h-screen justify-center items-center bg-[#fffaf2]">
        
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-[#5e3a1f] text-center">Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5e3a1f]"
          />
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Senha"
            required
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5e3a1f]"
          />
          <button
            type="submit"
            className="bg-[#5e3a1f] text-white py-2 rounded hover:bg-[#3e2f2f] transition"
          >
            Entrar
          </button>
        </form>
        <div className="text-center text-sm text-gray-600 mt-2">
            Não tem conta?{' '}
            <Link to="/cadastro" className="text-[#5e3a1f] font-semibold hover:underline">
                Cadastre-se
            </Link>
        </div>

      </div>
    </div>
  </div>
  );
}

export default Login;