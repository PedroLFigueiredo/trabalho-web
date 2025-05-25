import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Pagamento() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f3e6d8] text-[#3e2f2f] font-serif">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-10">
        <h2 className="text-3xl md:text-4xl font-retro text-[#5e3a1f] mb-6 text-center">
          Finalizar Compra
        </h2>

        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md border border-[#c4a484]">
          <form className="space-y-6">
            <div>
              <label className="block mb-1 font-semibold" htmlFor="nome">
                Nome completo
              </label>
              <input
                type="text"
                id="nome"
                placeholder="Ex: João da Silva"
                className="w-full border border-[#c4a484] px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5e3a1f]"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold" htmlFor="email">
                E-mail para contato
              </label>
              <input
                type="email"
                id="email"
                placeholder="exemplo@email.com"
                className="w-full border border-[#c4a484] px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5e3a1f]"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold" htmlFor="endereco">
                Endereço de entrega
              </label>
              <input
                type="text"
                id="endereco"
                placeholder="Rua Clássica, nº 123 - Bairro Antigo"
                className="w-full border border-[#c4a484] px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5e3a1f]"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold" htmlFor="pagamento">
                Método de pagamento
              </label>
              <select
                id="pagamento"
                className="w-full border border-[#c4a484] px-4 py-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#5e3a1f]"
              >
                <option value="pix">PIX</option>
                <option value="boleto">Boleto Bancário</option>
                <option value="cartao">Cartão de Crédito</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-[#5e3a1f] text-white font-semibold py-3 rounded-md hover:bg-[#744c29] transition-colors"
            >
              Confirmar Pedido
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Pagamento;
