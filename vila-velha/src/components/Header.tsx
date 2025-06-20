import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../Paginas/CarrinhoContext'; // ajuste o caminho conforme sua estrutura

const Header = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart(); // importa a função de limpar o carrinho
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const isLoggedIn = localStorage.getItem('isAdmin') !== null;

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    clearCart(); // limpa o carrinho
    alert('Você saiu da conta.');
    navigate('/');
  };

  return (
    <header className="bg-vintage-cream border-b-2 border-vintage-gold py-4 px-6 md:px-10 shadow-sm">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0">
          <Link to="/" className="inline-block">
            <h1 className="font-abril text-4xl md:text-5xl text-vintage-brown tracking-wider">
              Vila Velha
            </h1>
            <p className="text-vintage-rust font-playfair text-sm italic mt-1">
              Carros Antigos & Clássicos
            </p>
          </Link>
        </div>

        <nav className="flex items-center space-x-2 md:space-x-6">
          <NavLink to="/" className="bg-[#5e3a1f] text-white px-4 py-2 rounded-full hover:bg-[#3e2f2f] transition">
            Home
          </NavLink>
          <NavLink to="/loja" className="bg-[#5e3a1f] text-white px-4 py-2 rounded-full hover:bg-[#3e2f2f] transition">
            Loja
          </NavLink>
          <NavLink to="/carrinho" className="bg-[#5e3a1f] text-white px-4 py-2 rounded-full hover:bg-[#3e2f2f] transition">
            Carrinho
          </NavLink>

          {isAdmin ? (
            <>
              <NavLink to="/paineladmin" className="bg-green-700 text-white px-4 py-2 rounded-full hover:bg-green-800 transition">
                Painel Admin
              </NavLink>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition font-dmserif text-lg"
              >
                Sair 
              </button>
            </>
          ) : isLoggedIn ? (
            <>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition font-dmserif text-lg"
              >
                Sair
              </button>
            </>
          ) : (
            <NavLink to="/login" className="bg-[#5e3a1f] text-white px-4 py-2 rounded-full hover:bg-[#3e2f2f] transition">
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
};

const NavLink = ({ to, children, className = "" }: { to: string; children: React.ReactNode; className?: string }) => {
  return (
    <Link 
      to={to} 
      className={`${className} vintage-link py-2 px-3 font-dmserif text-lg`}
    >
      {children}
    </Link>
  );
};

export default Header;


