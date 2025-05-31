import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardCarro from '../components/CardCarro';
import estoqueLoja from '../data/carros';

function Home() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [estoque, setEstoque] = useState(estoqueLoja.filter(c => c.estoque > 0));
  const [destaques, setDestaques] = useState(estoque.slice(0, 3));

  useEffect(() => {
    const admin = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(admin);

    const salvos = localStorage.getItem('destaques');
    if (salvos) {
      const slugsSalvos = JSON.parse(salvos); // ['slug1', 'slug2', 'slug3']
      const carrosSalvos = slugsSalvos.map((slug: string) =>
        estoque.find(carro => carro.slug === slug)
      ).filter(Boolean);
      if (carrosSalvos.length === 3) setDestaques(carrosSalvos);
    }
  }, [estoque]);

  const handleTrocarDestaque = (index: number, slugSelecionado: string) => {
    const carroSelecionado = estoque.find(carro => carro.slug === slugSelecionado);
    if (!carroSelecionado) return;

    const novosDestaques = [...destaques];
    novosDestaques[index] = carroSelecionado;
    setDestaques(novosDestaques);
    localStorage.setItem('destaques', JSON.stringify(novosDestaques.map(c => c.slug)));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-8 px-4">
        <div className="container mx-auto">
          <section className="mb-12 text-center">
            <h2 className="font-retro text-4xl text-[#5e3a1f] mb-4">Bem-vindo à Vila Velha</h2>
            <p className="font-serif text-xl text-[#3e2f2f] max-w-3xl mx-auto">
              Especialistas em carros antigos e clássicos que contam histórias de épocas douradas do automobilismo.
            </p>
          </section>

          <section>
            <h2 className="font-retro text-3xl text-[#5e3a1f] mb-6 text-center">Destaques da Coleção</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {destaques.map((carro, index) => (
                <div key={index} className="relative">
                  <CardCarro
                    modelo={carro.modelo}
                    ano={carro.ano}
                    descricao={carro.descricao}
                    preco={carro.preco.toString()}
                    imagem={carro.imagem}
                    slug={carro.slug}
                    seloDilvan={!!carro.seloDilvan}
                  />

                  {isAdmin && (
                    <div className="mt-2">
                      <label className="block text-sm text-[#5e3a1f] font-bold mb-1">
                        Trocar destaque {index + 1}:
                      </label>
                      <select
                        value={carro.slug}
                        onChange={(e) => handleTrocarDestaque(index, e.target.value)}
                        className="w-full border border-[#c4a484] rounded px-2 py-1"
                      >
                        {estoque.map((opcao) => (
                          <option key={opcao.slug} value={opcao.slug}>
                            {opcao.modelo} ({opcao.ano})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
