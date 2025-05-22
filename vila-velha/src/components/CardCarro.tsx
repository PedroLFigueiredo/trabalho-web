
import React from 'react';

interface CardCarroProps {
  modelo: string;
  ano: number;
  descricao: string;
  preco: string;
  imagem?: string;
}

const CardCarro = ({
  modelo,
  ano,
  descricao,
  preco,
  imagem = "https://placehold.co/400x300/e9e2d0/8B4513?text=Carro+Antigo"
}: CardCarroProps) => {
  return (
    <div className="vintage-card overflow-hidden flex flex-col h-full">
      <div className="relative">
        <div className="aspect-w-16 aspect-h-9 overflow-hidden">
          <img
            src={imagem}
            alt={`${modelo} ${ano}`}
            className="object-cover w-full h-56 rounded-t-lg"
          />
        </div>
        <div className="absolute top-2 right-2 bg-vintage-maroon text-vintage-cream py-1 px-3 rounded-full font-bold text-sm">
          {ano}
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-dmserif text-2xl text-vintage-brown">{modelo}</h3>
          <div className="text-vintage-rust font-playfair font-bold">{preco}</div>
        </div>
        
        <div className="h-px w-full bg-vintage-gold my-3"></div>
        
        <p className="text-vintage-navy font-playfair mb-4 flex-grow">
          {descricao}
        </p>
        
        <button className="vintage-button w-full text-center mt-auto">
          Ver detalhes
        </button>
      </div>
      
      <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent hover:border-vintage-gold opacity-0 hover:opacity-100 transition-all duration-300 rounded-lg pointer-events-none"></div>
    </div>
  );
};

export default CardCarro;