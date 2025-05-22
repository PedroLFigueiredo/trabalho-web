
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-vintage-cream border-t-2 border-vintage-gold py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="mb-4">
            <span className="inline-block h-1 w-10 bg-vintage-gold mx-2"></span>
            <span className="font-abril text-xl text-vintage-brown">Vila Velha</span>
            <span className="inline-block h-1 w-10 bg-vintage-gold mx-2"></span>
          </div>
          
          <p className="font-playfair text-vintage-rust mb-2">
            Especialistas em carros antigos desde 1975
          </p>
          
          <p className="text-sm text-vintage-brown">
            © 2025 Vila Velha. Todos os direitos reservados.
          </p>
          
          <div className="mt-4 flex justify-center space-x-4">
            <FooterLink href="#">Sobre nós</FooterLink>
            <FooterLink href="#">Contato</FooterLink>
            <FooterLink href="#">Termos de uso</FooterLink>
            <FooterLink href="#">Privacidade</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <a 
      href={href} 
      className="text-sm text-vintage-brown hover:text-vintage-maroon transition-colors duration-300"
    >
      {children}
    </a>
  );
};

export default Footer;