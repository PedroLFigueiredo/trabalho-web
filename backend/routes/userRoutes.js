const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user'); // Importa o modelo User
const Pedido = require('../models/PedidoModel'); // <--- ADICIONE ESTA LINHA: Importa o modelo Pedido

// Middleware de autenticação (placeholder por enquanto)
const isAdminMiddleware = (req, res, next) => {
    next(); 
};

// Rota para listar todos os usuários (apenas para admin)
router.get('/', isAdminMiddleware, async (req, res) => {
    try {
        const users = await User.find({}).select('-senha'); 
        res.status(200).json(users);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ message: 'Erro ao buscar usuários.' });
    }
});

// Rota para buscar um único usuário por ID (apenas para admin)
router.get('/:id', isAdminMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        
        // MUDANÇA AQUI: Busca o usuário e popula seus pedidos
        const user = await User.findById(id)
                               .select('-senha') // Exclui a senha
                               .lean(); // Adiciona .lean() para obter um POJO (Plain Old JavaScript Object)

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        // NOVO: Buscar todos os pedidos associados a este usuário
        const pedidosDoUsuario = await Pedido.find({ user: id })
                                           .populate('itens.carroId') // Popula os detalhes do carro nos itens do pedido
                                           .sort({ dataCompra: -1 }); // Ordena por data mais recente

        // Anexa os pedidos ao objeto do usuário antes de enviar
        user.pedidos = pedidosDoUsuario; // Adiciona a propriedade 'pedidos' ao objeto user

        res.status(200).json(user); // Retorna o usuário com seus pedidos

    } catch (error) {
        console.error('Erro ao buscar usuário por ID ou seus pedidos:', error);
        res.status(500).json({ message: 'Erro ao buscar usuário ou seus pedidos.' });
    }
});

// Rota para promover/rebaixar um usuário (apenas para admin)
router.put('/:id', isAdminMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { isAdmin } = req.body; 

        if (typeof isAdmin !== 'boolean') {
            return res.status(400).json({ message: 'O valor para isAdmin deve ser um booleano (true/false).' });
        }

        const user = await User.findByIdAndUpdate(id, { isAdmin: isAdmin }, { new: true }).select('-senha');

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        res.status(200).json({ message: 'Status de admin do usuário atualizado com sucesso!', user });
    } catch (error) {
        console.error('Erro ao atualizar status de admin do usuário:', error);
        res.status(500).json({ message: 'Erro ao atualizar status de admin do usuário.' });
    }
});

module.exports = router;