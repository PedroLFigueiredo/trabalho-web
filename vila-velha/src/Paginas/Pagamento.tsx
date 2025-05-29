import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from './CarrinhoContext';
import { useNavigate } from 'react-router-dom';
import { useEstoque } from '../tools/useEstoque';
import { useAdminStats } from '../tools/useAdminStats';

function Pagamento() {
  const { cartItems, clearCart } = useCart();
  const { estoque, setEstoque } = useEstoque();
  const { registrarVenda } = useAdminStats();
  const navigate = useNavigate();

  const [frete] = useState(100);
  const [desconto, setDesconto] = useState(0);
  const [formaPagamento, setFormaPagamento] = useState('');
  const [cartao, setCartao] = useState({ numero: '', nome: '', validade: '', cvv: '' });

  const totalProdutos = cartItems.reduce((acc, item) => acc + item.precoNumero * item.quantidade, 0);

  useEffect(() => {
    setDesconto(formaPagamento === 'pix' ? totalProdutos * 0.05 : 0);
  }, [formaPagamento, totalProdutos]);

  const total = totalProdutos + frete - desconto;

  const confirmarPagamento = () => {
    // 1) Atualiza estoque
    const novoEstoque = [...estoque];
    cartItems.forEach(item => {
      const idx = novoEstoque.findIndex(c => c.slug === item.slug);
      if (idx !== -1) novoEstoque[idx].estoque -= item.quantidade;
    });
    setEstoque(novoEstoque);

    // 2) Registra estatísticas
    registrarVenda(cartItems);

    // 3) Limpa carrinho e redireciona
    clearCart();
    navigate('/loja');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fffaf2]">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        {/* Lista de produtos */}
        <div className="flex-1 space-y-6">
          <h2 className="text-2xl font-bold text-[#5e3a1f]">Produtos</h2>
          {cartItems.map(item => (
            <div key={item.slug} className="flex items-center gap-4 border-b pb-4">
              <img src={item.imagem} alt={item.modelo} className="w-24 h-16 object-cover rounded shadow" />
              <div>
                <p className="text-lg font-semibold">{item.modelo} ({item.ano})</p>
                <p>Qtd: {item.quantidade}</p>
                <p>{(item.precoNumero * item.quantidade).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
              </div>
            </div>
          ))}

          {/* Frete e forma de pagamento */}
          <h2 className="text-2xl font-bold text-[#5e3a1f]">Entrega</h2>
          <p>Frete fixo: R$ 100,00</p>

          <h2 className="text-2xl font-bold text-[#5e3a1f]">Forma de Pagamento</h2>
          <select
            value={formaPagamento}
            onChange={e => setFormaPagamento(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2"
          >
            <option value="">Selecione</option>
            <option value="cartao">Cartão</option>
            <option value="pix">PIX (5% de desconto)</option>
            <option value="boleto">Boleto</option>
          </select>

          {formaPagamento === 'cartao' && (
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Número do Cartão"
                value={cartao.numero}
                onChange={e => setCartao({ ...cartao, numero: e.target.value })}
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
              <input
                type="text"
                placeholder="Nome impresso no Cartão"
                value={cartao.nome}
                onChange={e => setCartao({ ...cartao, nome: e.target.value })}
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Validade"
                  value={cartao.validade}
                  onChange={e => setCartao({ ...cartao, validade: e.target.value })}
                  className="flex-1 border border-gray-300 rounded px-4 py-2"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  value={cartao.cvv}
                  onChange={e => setCartao({ ...cartao, cvv: e.target.value })}
                  className="flex-1 border border-gray-300 rounded px-4 py-2"
                />
              </div>
            </div>
          )}
        </div>

        {/* Resumo da compra */}
        <div className="w-full lg:w-1/3 bg-white p-6 rounded shadow space-y-4">
          <h2 className="text-2xl font-bold text-[#5e3a1f]">Resumo</h2>
          <div className="flex justify-between"><span>Produtos:</span><span>{totalProdutos.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</span></div>
          <div className="flex justify-between"><span>Frete:</span><span>{frete.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</span></div>
          <div className="flex justify-between"><span>Desconto:</span><span>-{desconto.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</span></div>
          <div className="flex justify-between font-bold text-lg"><span>Total:</span><span>{total.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</span></div>

          <button
            onClick={confirmarPagamento}
            disabled={!formaPagamento}
            className="w-full bg-[#5e3a1f] text-white py-2 rounded hover:bg-[#3e2f2f] transition"
          >
            Confirmar Pagamento
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Pagamento;