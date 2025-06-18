// src/tools/useEstoque.ts

import { useState, useEffect, useCallback } from 'react';

// AQUI ESTÁ A CORREÇÃO: Adicionamos os novos campos à interface.
// A interrogação (?) os torna opcionais, o que é uma boa prática.
export interface Carro {
  _id: string;
  modelo: string;
  ano: number;
  descricao: string;
  descricaoDetalhada?: string; // <-- ADICIONADO
  preco: string;
  imagem?: string;
  estoque: number;
  slug: string;
  seloDilvan?: boolean;
  audio?: string; // <-- ADICIONADO
}

export const useEstoque = () => {
  const [estoque, setEstoque] = useState<Carro[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetchEstoque = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3001/api/carros');
      if (!response.ok) {
        throw new Error('Falha ao buscar dados do estoque.');
      }
      const data: Carro[] = await response.json();
      setEstoque(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refetchEstoque();
  }, [refetchEstoque]);

  return { estoque, isLoading, error, refetchEstoque };
};