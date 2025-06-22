// backend/routes/carroRoutes.js (anteriormente carro.js)
const express = require('express');
const router = express.Router();
const Carro = require('../models/CarroModel.js'); // Importa o modelo Carro
const multer = require('multer'); // <--- ADICIONE ESTA LINHA!
const path = require('path'); // <--- ADICIONE ESTA LINHA!

// Configuração do Multer para upload de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Salva na pasta 'uploads/imagens' dentro do diretório raiz do backend
    cb(null, path.join(__dirname, '../uploads/imagens'));
  },
  filename: (req, file, cb) => {
    // Define o nome do arquivo: nome_original-timestamp.extensão
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Rota para listar todos os carros
router.get('/', async (req, res) => {
  try {
    const carros = await Carro.find();
    res.json(carros);
  } catch (err) {
    console.error('Erro ao buscar carros do MongoDB:', err);
    res.status(500).json({ message: 'Falha ao buscar dados do estoque.' });
  }
});

// NOVO: Rota para adicionar um novo carro
router.post('/', upload.single('imagem'), async (req, res) => {
  try {
    // req.file contém as informações do arquivo enviado pelo Multer
    // req.body contém os outros campos do formulário

    if (!req.file) {
        return res.status(400).json({ message: 'Nenhuma imagem foi enviada.' });
    }

    const { modelo, ano, descricao, descricaoDetalhada, preco, estoque, seloDilvan, audio } = req.body;

    // Constrói o caminho da imagem que será salvo no DB, correspondendo à URL servida
    const imagemPath = `/uploads/imagens/${req.file.filename}`;

    // Cria o slug
    const slug = modelo.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-*|-*$/g, '');

    const newCarro = new Carro({
      modelo,
      ano: Number(ano),
      descricao,
      descricaoDetalhada,
      preco: Number(preco),
      estoque: Number(estoque),
      seloDilvan: seloDilvan === 'true', // FormData envia booleans como string 'true'/'false'
      audio: audio || null, // Se o áudio for opcional e não enviado, será null
      imagem: imagemPath,
      slug
    });

    await newCarro.save();
    res.status(201).json({ message: 'Carro adicionado com sucesso!', carro: newCarro });

  } catch (err) {
    console.error('Erro ao adicionar carro:', err);
    // Erros de validação do Mongoose, por exemplo, slug duplicado
    if (err.code === 11000) { // Código de erro para chave duplicada (slug unique)
        return res.status(400).json({ message: 'Erro: Carro com este modelo (slug) já existe.' });
    }
    res.status(500).json({ message: 'Erro ao adicionar carro. Verifique os dados.' });
  }
});


// Rota para buscar um carro por slug
router.get('/:slug', async (req, res) => {
  try {
    const carro = await Carro.findOne({ slug: req.params.slug });
    if (!carro) {
      return res.status(404).json({ message: 'Carro não encontrado.' });
    }
    res.json(carro);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
});

// Rota para atualizar um carro
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCarro = await Carro.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedCarro) {
            return res.status(404).json({ message: 'Carro não encontrado para atualização.' });
        }
        res.json({ message: 'Carro atualizado com sucesso!', carro: updatedCarro });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao atualizar carro.' });
    }
});

module.exports = router;