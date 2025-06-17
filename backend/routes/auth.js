const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const router = express.Router();

// Rota de cadastro
router.post('/register', async (req, res) => {
  try {
    const { nome, endereco, telefone, email, senha } = req.body;

    // Verifica se o usuário já existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'E-mail já cadastrado' });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Cria o usuário
    const user = new User({
      nome,
      endereco,
      telefone,
      email,
      senha: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro no cadastro', error });
  }
});

// Rota de login
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Usuário não encontrado' });

    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) return res.status(400).json({ message: 'Senha incorreta' });

    res.status(200).json({
      message: 'Login bem-sucedido',
      userId: user._id,
      nome: user.nome,
      carrinho: user.carrinho || [] // <-- Retorna carrinho do Mongo
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro no login', error });
  }
});


router.post('/update-cart', async (req, res) => {
  const { userId, carrinho } = req.body;

  try {
    await User.findByIdAndUpdate(userId, { carrinho });
    res.status(200).json({ message: 'Carrinho salvo com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao salvar carrinho', error });
  }
});

module.exports = router;
