const mongoose = require('mongoose');

const carroSchema = new mongoose.Schema({
  modelo: { type: String, required: true },
  ano: { type: Number, required: true },
  descricao: { type: String },
  descricaoDetalhada: { type: String },
  preco: { type: Number, required: true },
  imagem: { type: String }, // Caminho para a imagem
  estoque: { type: Number, required: true, default: 0 },
  slug: { type: String, required: true, unique: true }, // Para URLs amigáveis
  seloDilvan: { type: Boolean, default: false },
  audio: { type: String } // Caminho para o áudio
}, {
  timestamps: true // Para adicionar campos createdAt e updatedAt
});

module.exports = mongoose.model('Carro', carroSchema);