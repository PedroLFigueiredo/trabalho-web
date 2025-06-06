// src/hooks/useEstoque.ts
import { useState, useEffect } from 'react';
import estoqueInicial from '../data/carros';

// Define a interface para o objeto Carro
export interface Carro {
  modelo: string;
  ano: number;
  descricao: string;
  descricaoDetalhada?: string;
  preco: number;
  imagem: string;
  estoque: number;
  slug: string;
  audio?: string;
  seloDilvan?: boolean;
}

export function useEstoque() {
   // Inicializa o estado do estoque. Se houver dados no localStorage, usa-os; caso contrário, usa os dados iniciais.
  const [estoque, setEstoque] = useState<Carro[]>(() => {
    const salvo = localStorage.getItem('estoqueLoja');
    return salvo ? JSON.parse(salvo) : estoqueInicial;
  });
  // Sempre que o estoque for alterado, salva automaticamente no localStorage
  useEffect(() => {
    localStorage.setItem('estoqueLoja', JSON.stringify(estoque));
  }, [estoque]);

  return { estoque, setEstoque };
}
