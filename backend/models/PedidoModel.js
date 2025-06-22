const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
  // Referência ao usuário que fez o pedido
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Faz referência ao modelo 'User'
    required: true,
  },
  // Itens do pedido (detalhes dos carros no momento da compra)
  itens: [
    {
      carroId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Carro', // Faz referência ao modelo 'Carro'
        required: true,
      },
      modelo: { type: String, required: true },
      ano: { type: Number, required: true },
      precoNaCompra: { type: Number, required: true }, // Preço do carro no momento da compra
      quantidade: { type: Number, required: true },
      imagem: { type: String }, // Imagem do carro no momento da compra
      slug: { type: String }, // Slug do carro no momento da compra
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  dataCompra: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['pendente', 'processando', 'enviado', 'entregue', 'cancelado'],
    default: 'pendente',
  },
}, {
  timestamps: true, // Adiciona createdAt e updatedAt automaticamente
});

module.exports = mongoose.model('Pedido', PedidoSchema);