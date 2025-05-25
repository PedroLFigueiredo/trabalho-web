import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function PainelAdmin() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
      alert('Acesso não autorizado');
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-[#5e3a1f] mb-6">Painel do Administrador</h1>
        <p className="text-lg">Bem-vindo administrador! </p>
        {/* local para novos recursos */}
      </main>

      <Footer />
    </div>
  );
}

export default PainelAdmin;
