// src/hooks/useEstoque.ts
import { useState, useEffect } from 'react';
import estoqueInicial from '../data/carros';

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
  const [estoque, setEstoque] = useState<Carro[]>(() => {
    const salvo = localStorage.getItem('estoqueLoja');
    return salvo ? JSON.parse(salvo) : estoqueInicial;
  });

  useEffect(() => {
    localStorage.setItem('estoqueLoja', JSON.stringify(estoque));
  }, [estoque]);

  return { estoque, setEstoque };
}
