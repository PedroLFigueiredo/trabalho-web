import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { Link } from 'react-router-dom';


function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulação
    if (email === 'admin@carros.com' && senha === '123456') {
      alert('Login bem-sucedido!');
      navigate('/');
    } else {
      alert('Credenciais inválidas');
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