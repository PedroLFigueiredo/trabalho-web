import React from 'react';
import { Link } from 'react-router-dom';


interface CardCarroProps {
  modelo: string;
  ano: number;
  descricao: string;
  preco: string;
  imagem?: string;
  estoque?: number;
  slug: string;
}


const CardCarro = ({
  modelo,
  ano,
  descricao,
  preco,
  imagem = "https://placehold.co/400x300/e9e2d0/8B4513?text=Carro+Antigo",
  estoque,
  slug
}: CardCarroProps) => {
  return (
    <div className="vintage-card overflow-hidden flex flex-col h-full relative rounded-lg shadow-md border border-[#c4a484] hover:scale-105 transition-transform duration-300">
      <div className="relative">
        <img
          src={imagem}
          alt={`${modelo} ${ano}`}
          className="object-cover w-full h-56 rounded-t-lg"
        />
        <div className="absolute top-2 right-2 bg-[#5e3a1f] text-white py-1 px-3 rounded-full font-bold text-sm">
          {ano}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-retro text-2xl text-[#5e3a1f]">{modelo}</h3>
          <div className="text-[#9b4c28] font-semibold">{preco}</div>
        </div>

        <div className="h-px w-full bg-[#c4a484] my-3"></div>

        <p className="text-[#3e2f2f] font-serif mb-4 flex-grow">
          {descricao}
        </p>
            <Link to={`/carro/${slug}`}>
              <button className="bg-[#3e2f2f] text-white px-4 py-2 rounded-md mt-auto hover:bg-[#5e3a1f] transition-colors">
                Ver detalhes
              </button>
            </Link>
          {typeof estoque === 'number' && (
            <div className="mt-3 text-sm text-[#5e3a1f] font-semibold">
              {estoque > 0
                ? `${estoque} unidade${estoque > 1 ? 's' : ''} em estoque`
                : 'Sem estoque'}
            </div>
          )}
      </div>
    </div>
  );
};

export default CardCarro;


