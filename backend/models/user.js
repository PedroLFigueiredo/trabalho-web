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
    unique: true, // impede duplicação de email
  },
  senha: {
    type: String,
    required: true,
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
  timestamps: true, // cria campos createdAt e updatedAt automaticamente
});

module.exports = mongoose.model('User', userSchema);
