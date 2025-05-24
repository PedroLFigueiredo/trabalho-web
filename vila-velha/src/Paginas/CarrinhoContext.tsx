import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
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

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCartItems(prev =>
      prev.some(i => i.slug === item.slug)
        ? prev.map(i =>
            i.slug === item.slug
              ? { ...i, quantidade: i.quantidade + 1 }
              : i
          )
        : [...prev, { ...item, quantidade: 1 }]
    );
  };

  const decreaseQty = (slug: string) => {
    setCartItems(prev =>
      prev.flatMap(i =>
        i.slug === slug
          ? i.quantidade > 1
            ? [{ ...i, quantidade: i.quantidade - 1 }]
            : [] 
          : [i]
      )
    );
  };

  const removeFromCart = (slug: string) =>
    setCartItems(prev => prev.filter(i => i.slug !== slug));

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

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart deve ser usado dentro de CartProvider');
  return ctx;
};

