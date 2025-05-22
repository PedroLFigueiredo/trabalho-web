
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
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
            <NavLink
              to="/"
              className="bg-[#5e3a1f] text-white px-4 py-2 rounded-full hover:bg-[#3e2f2f] transition"
            >
              Home
            </NavLink>
            <NavLink
              to="/loja"
              className="bg-[#5e3a1f] text-white px-4 py-2 rounded-full hover:bg-[#3e2f2f] transition"
            >
              Loja
            </NavLink>
            <NavLink
              to="/carrinho"
              className="bg-[#5e3a1f] text-white px-4 py-2 rounded-full hover:bg-[#3e2f2f] transition"
            >
              Carrinho
            </NavLink>
            <NavLink
              to="/login"
              className="bg-[#5e3a1f] text-white px-4 py-2 rounded-full hover:bg-[#3e2f2f] transition"
            >
              Login
            </NavLink>
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
