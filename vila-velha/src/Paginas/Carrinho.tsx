import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from './CarrinhoContext';

function Carrinho() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce((acc, item) => acc + item.precoNumero * item.quantidade, 0);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-retro text-[#5e3a1f] mb-8">Seu Carrinho</h1>

        {cartItems.length === 0 ? (
          <div className="text-center">
            <p className="text-xl mb-4">Seu carrinho está vazio</p>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-[#5e3a1f] text-white rounded hover:bg-[#3e2f2f] transition"
            >
              Voltar às compras
            </button>
          </div>
        ) : (
          <>
            {}
            <div className="flex flex-col gap-6">
              {cartItems.map((item) => (
                <div
                  key={item.slug}
                  className="flex flex-col sm:flex-row items-center gap-4 border-b pb-4"
                >
                  <img
                    src={item.imagem}
                    alt={item.modelo}
                    className="w-full sm:w-32 sm:h-20 object-cover rounded shadow"
                  />

                  <div className="flex-1 text-center sm:text-left">
                    <h2 className="text-2xl font-serif text-[#3e2f2f]">
                      {item.modelo} ({item.ano})
                    </h2>
                    <p className="text-[#5e3a1f]">Qtd: {item.quantidade}</p>
                    <p className="text-[#9b4c28] font-bold">
                      {item.precoNumero} × {item.quantidade} ={' '}
                      {(item.precoNumero * item.quantidade).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.slug)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>

            {}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-2xl font-bold text-[#3e2f2f]">
                Total:{' '}
                {total.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </p>

              <div className="flex gap-4">
                <button
                  onClick={clearCart}
                  className="px-4 py-2 border border-red-600 text-red-600 rounded hover:bg-red-50 transition"
                >
                  Limpar Carrinho
                </button>

                <button
                  onClick={() => navigate('/pagamento')}
                  disabled={cartItems.length === 0}
                  className="px-6 py-2 bg-[#3e2f2f] text-white rounded hover:bg-[#5e3a1f] transition"
                >
                  Finalizar Compra
                </button>
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Carrinho;
