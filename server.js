const express = require('express');
const cors = require('cors'); // CORS para permitir comunicação do HTML local
const db = require('./db'); // banco SQLite

const app = express();
const PORT = process.env.PORT || 4000;

// Ativar CORS e servir arquivos estáticos
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // <- serve arquivos da pasta public

// Teste de conexão
console.log('Conectando ao banco SQLite...');
console.log('Se aparecer "Banco SQLite conectado com sucesso!", está tudo certo.');

// 🧠 Rota GET - Listar todos os devocionais
app.get('/devocionais', (req, res) => {
  const query = 'SELECT * FROM devocionais ORDER BY data DESC';
  db.all(query, [], (err, results) => {
    if (err) {
      console.error('Erro ao buscar devocionais:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// ✍️ Rota POST - Inserir novo devocional
app.post('/devocionais', (req, res) => {
  const { titulo, texto, data } = req.body;

  if (!titulo || !texto) {
    return res.status(400).json({ error: 'Título e texto são obrigatórios.' });
  }

  const query = `
    INSERT INTO devocionais (titulo, texto, data)
    VALUES (?, ?, COALESCE(?, DATE('now')))
  `;

  db.run(query, [titulo, texto, data], function (err) {
    if (err) {
      console.error('Erro ao inserir devocional:', err.message);
      return res.status(500).json({ error: err.message });
    }

    res.json({
      id: this.lastID,
      titulo,
      texto,
      data: data || new Date().toISOString().slice(0, 10),
    });
  });
});

// 🚀 Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
