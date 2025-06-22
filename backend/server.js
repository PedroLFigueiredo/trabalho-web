// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const carroRoutes = require('./routes/carroRoutes');
const transacaoRoutes = require('./routes/transacaoRoutes');
const userRoutes = require('./routes/userRoutes'); // Importe userRoutes aqui
const path = require('path');

dotenv.config();

// Mover a definição de app e PORT para ANTES de qualquer app.use ou app.listen
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Conecta ao MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB conectado'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err));

const cors = require('cors');
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rotas: TODAS as rotas app.use devem vir DEPOIS que 'app' foi definido
app.use('/api/auth', authRoutes);
app.use('/api/carros', carroRoutes);
app.use('/api/transacao', transacaoRoutes);
app.use('/api/users', userRoutes); // O userRoutes agora será usado corretamente aqui

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});