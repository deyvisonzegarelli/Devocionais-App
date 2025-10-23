const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./devocionais.db', (err) => {
  if (err) {
    console.error('Erro ao conectar no banco:', err.message);
  } else {
    console.log('Conectado ao banco SQLite.');
  }
});

// Cria tabela de devocionais se não existir
db.run(`
  CREATE TABLE IF NOT EXISTS devocionais (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    texto TEXT NOT NULL,
    data_criacao TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

module.exports = db;
