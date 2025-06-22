// src/components/CardCarro.tsx
import React from 'react';
import { Link } from 'react-router-dom';

// Se você já tem a interface Carro definida em outro lugar e importada, use-a.
// Caso contrário, pode defini-la aqui ou em um arquivo de tipos global (ex: src/types/index.ts)
interface CardCarroProps {
  modelo: string;
  ano: number;
  descricao: string;
  preco: string; // Ou number, se for o caso
  imagem: string; // Caminho da imagem que vem do backend, ex: "/uploads/imagens/carro.jpg"
  slug: string;
  seloDilvan?: boolean;
  isAdmin?: boolean; // Para o modo admin
  onUpdate?: (campo: 'preco' | 'estoque' | 'descricao', valor: string | number) => void; // Para o modo admin
}

export default function CardCarro(props: CardCarroProps) {
  // --- Adicione esta constante para a URL base do backend ---
  const BACKEND_URL = 'http://localhost:3001';

  // --- Adicione esta lógica para construir a URL completa da imagem ---
  const imageUrl = props.imagem && props.imagem.startsWith('/uploads/')
    ? `${BACKEND_URL}${props.imagem}`
    : props.imagem; // Fallback caso o caminho não comece com /uploads/ (mas deveria)

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden relative">
      {/* Imagem do carro */}
      <img
        src={imageUrl} // <--- Use a variável imageUrl aqui!
        alt={`${props.modelo} ${props.ano}`}
        className="w-full h-48 object-cover" // Ajuste a altura e outros estilos conforme seu design
      />

      {/* Conteúdo do Card */}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-[#5e3a1f] mb-2">{props.modelo} ({props.ano})</h3>
        <p className="text-gray-700 text-sm mb-3 line-clamp-2">{props.descricao}</p>
        <p className="text-2xl font-bold text-[#9b4c28] mb-4">R$ {props.preco}</p> {/* Assumindo que preco é string formatada */}

        {/* Botão "Ver detalhes" */}
        <Link 
          to={`/detalhes/${props.slug}`}
          className="block w-full text-center bg-[#3e2f2f] text-white py-2 rounded-md hover:bg-[#5e3a1f] transition"
        >
          Ver detalhes
        </Link>
        {/* ... (mantenha o restante do seu CardCarro, como a lógica admin, se houver) */}

        {/* Lógica do Selo Dilvan, se aplicável */}
        {props.seloDilvan && (
          <img
            src={`${BACKEND_URL}/uploads/SeloDilvanDeQualidade.png`} // Caminho direto para o selo
            alt="Selo de Qualidade Dilvan"
            className="absolute top-2 right-2 w-16 h-auto" // Ajuste o posicionamento e tamanho
          />
        )}
      </div>
    </div>
  );
}