const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  endereco: {
    type: String,
    required: true,
  },
  telefone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  senha: {
    type: String,
    required: true,
  },
  isAdmin: { // <--- ADICIONE OU CONFIRME ESTE BLOCO!
    type: Boolean,
    default: false,
  },
  carrinho: [
    {
      modelo: String,
      ano: Number,
      descricao: String,
      precoNumero: Number,
      imagem: String,
      slug: String,
      quantidade: Number
    }
  ]
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);