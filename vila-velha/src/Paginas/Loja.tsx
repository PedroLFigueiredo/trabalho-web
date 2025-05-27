// src/Paginas/Loja.tsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardCarro from '../components/CardCarro';
import { useEstoque } from '../tools/useEstoque';

export default function Loja() {
  const { estoque, setEstoque } = useEstoque();
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const handleUpdate = (
    index: number,
    campo: 'preco' | 'estoque' | 'descricao' | 'seloDilvan',
    valor: string | number | boolean
  ) => {
    const novo = [...estoque];
    (novo[index] as any)[campo] =
      campo === 'preco' || campo === 'estoque' ? Number(valor) : valor;
    setEstoque(novo);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-10 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-retro text-center text-[#5e3a1f] mb-4">
            Nossa Loja
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {estoque.map((carro, idx) => (
              <CardCarro
                key={carro.slug}
                {...carro}
                preco={carro.preco.toString()}
                isAdmin={isAdmin}
                onUpdate={(campo, valor) => handleUpdate(idx, campo, valor)}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
