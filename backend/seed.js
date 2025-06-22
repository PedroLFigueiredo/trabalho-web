// backend/seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Carro = require('./models/CarroModel'); // Importa o modelo Carro com o nome correto CarroModel.js
const estoqueLoja = require('./data/dadosIniciaisCarros'); // Importa os dados com o nome correto dadosIniciaisCarros.js

dotenv.config();

async function importData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB conectado para importação de dados.');

    await Carro.deleteMany({}); // Limpa a coleção antes de inserir novos dados
    console.log('Dados existentes de carros removidos.');

    // Mapeia os dados para ajustar o caminho das imagens/áudios para o formato esperado pelo backend
    const carrosToInsert = estoqueLoja.map(carro => {
      // Ajusta o caminho da imagem: de /imagens/ para /uploads/imagens/
      const imagemPath = carro.imagem.replace('/imagens/', '/uploads/imagens/');
      // Ajusta o caminho do áudio: de /audio/ para /uploads/audio/
      const audioPath = carro.audio ? carro.audio.replace('/audio/', '/uploads/audio/') : null;

      return {
        ...carro,
        imagem: imagemPath,
        audio: audioPath
      };
    });

    await Carro.insertMany(carrosToInsert);
    console.log('Dados de carros importados com sucesso!');
  } catch (error) {
    console.error('Erro ao importar dados:', error);
  } finally {
    mongoose.connection.close();
  }
}

importData();