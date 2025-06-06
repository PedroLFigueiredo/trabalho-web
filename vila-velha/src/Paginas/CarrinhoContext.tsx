import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Exportando a interface CartItem para uso em outros módulos
export interface CartItem {
  modelo: string;
  ano: number;
  descricao: string;
  precoNumero: number;
  imagem?: string;
  estoque?: number;
  slug: string;
  quantidade: number;
}

// Interface que define o formato dos dados disponíveis no contexto
interface CartContextData {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  decreaseQty: (slug: string) => void;
  removeFromCart: (slug: string) => void;
  clearCart: () => void;
  total: number;
}

// Criação do contexto do carrinho
const CartContext = createContext<CartContextData | null>(null);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  // Adicionar item para o Carrinho
  const addToCart = (item: CartItem) => {
    setCartItems(prevItems =>
      prevItems.some(i => i.slug === item.slug)
        ? prevItems.map(i =>
            i.slug === item.slug ? { ...i, quantidade: i.quantidade + 1 } : i
          )
        : [...prevItems, { ...item, quantidade: 1 }]
    );
  };
  // Reduz a quantidade de um item, ou o remove se quantidade for 1
  const decreaseQty = (slug: string) => {
    setCartItems(prevItems =>
      prevItems.flatMap(i =>
        i.slug === slug
          ? i.quantidade > 1
            ? [{ ...i, quantidade: i.quantidade - 1 }]
            : []
          : [i]
      )
    );
  };
 // Remove completamente um item do carrinho
  const removeFromCart = (slug: string) => {
    setCartItems(prevItems => prevItems.filter(i => i.slug !== slug));
  };

  const clearCart = () => setCartItems([]);

  const total = cartItems.reduce(
    (sum, i) => sum + i.precoNumero * i.quantidade,
    0
  );
 // Provedor que expõe o estado e as funções para o restante da aplicação
  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, decreaseQty, removeFromCart, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook para consumir o contexto do carrinho
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de CartProvider');
  }
  return context;
}
