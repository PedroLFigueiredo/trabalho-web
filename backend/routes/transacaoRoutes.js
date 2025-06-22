const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Carro = require('../models/CarroModel'); // Importa o modelo Carro
const Pedido = require('../models/PedidoModel'); // <--- ADICIONE ESTA LINHA

router.post('/finalizar', async (req, res) => {
  const { cartItems, totalCompra, userId } = req.body; // Dados que vêm do frontend

  // NOTA: Para desenvolvimento local sem replica set, estamos removendo as transações
  // const session = await mongoose.startSession();
  // session.startTransaction();

  try {
    // 1. Atualizar o estoque de cada carro no banco de dados
    for (const item of cartItems) {
      const carroNoDB = await Carro.findOne({ slug: item.slug }); //

      if (!carroNoDB) {
        //
        return res.status(404).json({ message: `Carro com slug '${item.slug}' não encontrado no estoque.` });
      }
      if (carroNoDB.estoque < item.quantidade) {
        //
        return res.status(400).json({ message: `Estoque insuficiente para o carro: ${carroNoDB.modelo}. Disponível: ${carroNoDB.estoque}, Solicitado: ${item.quantidade}.` });
      }

      await Carro.updateOne(
        { slug: item.slug },
        { $inc: { estoque: -item.quantidade } }
      );
    }

    // NOVO: 2. Criar e Salvar um Pedido após a atualização do estoque
    const novoPedido = new Pedido({
      user: userId, // Id do usuário que fez o pedido
      itens: cartItems.map(item => ({
        carroId: item._id, // Assumindo que o cartItem tem o _id do carro
        modelo: item.modelo,
        ano: item.ano,
        precoNaCompra: item.precoNumero, // Preço no momento da compra
        quantidade: item.quantidade,
        imagem: item.imagem, // Imagem do carro
        slug: item.slug,
      })),
      total: totalCompra,
      // dataCompra: será default Date.now
      // status: será default 'pendente'
    });

    await novoPedido.save(); // Salva o novo pedido no banco de dados
    console.log('Pedido salvo com sucesso:', novoPedido._id);

    // NOTA: Remover as linhas de sessão/transação (já fizemos isso)
    // await session.commitTransaction();
    // session.endSession();

    res.status(200).json({ message: 'Compra finalizada e estoque atualizado com sucesso!' }); //

  } catch (error) {
    // NOTA: Remover as linhas de sessão/transação (já fizemos isso)
    // if (session) { await session.abortTransaction(); session.endSession(); }

    console.error('Erro ao finalizar a compra no backend:', error); //
    res.status(500).json({ message: error.message || 'Erro interno ao processar a compra.' }); //
  }
});

module.exports = router;