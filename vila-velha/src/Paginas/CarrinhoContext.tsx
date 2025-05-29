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

interface CartContextData {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  decreaseQty: (slug: string) => void;
  removeFromCart: (slug: string) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextData | null>(null);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCartItems(prevItems =>
      prevItems.some(i => i.slug === item.slug)
        ? prevItems.map(i =>
            i.slug === item.slug ? { ...i, quantidade: i.quantidade + 1 } : i
          )
        : [...prevItems, { ...item, quantidade: 1 }]
    );
  };

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

  const removeFromCart = (slug: string) => {
    setCartItems(prevItems => prevItems.filter(i => i.slug !== slug));
  };

  const clearCart = () => setCartItems([]);

  const total = cartItems.reduce(
    (sum, i) => sum + i.precoNumero * i.quantidade,
    0
  );

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
