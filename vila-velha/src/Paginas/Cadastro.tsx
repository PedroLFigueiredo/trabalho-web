import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Cadastro() {
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleCadastro = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulação
    console.log({ nome, endereco, telefone, email, senha });
    alert('Cadastro realizado com sucesso!');
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-[#fffaf2]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-[#5e3a1f] text-center">Cadastro</h1>
        <form onSubmit={handleCadastro} className="flex flex-col gap-4">
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome Completo"
            required
            className="border border-gray-300 rounded px-4 py-2"
          />
          <input
            type="text"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            placeholder="Endereço"
            required
            className="border border-gray-300 rounded px-4 py-2"
          />
          <input
            type="tel"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            placeholder="Telefone"
            required
            className="border border-gray-300 rounded px-4 py-2"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="border border-gray-300 rounded px-4 py-2"
          />
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Senha"
            required
            className="border border-gray-300 rounded px-4 py-2"
          />
          <button
            type="submit"
            className="bg-[#5e3a1f] text-white py-2 rounded hover:bg-[#3e2f2f] transition"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
