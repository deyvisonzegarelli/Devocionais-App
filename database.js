const sqlite3 = require('sqlite3').verbose();

// Conectar ao banco SQLite
const db = new sqlite3.Database('./devocionais.db', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco:', err.message);
  } else {
    console.log('Banco SQLite conectado com sucesso!');
  }
});

// Criar tabela devocionais (se não existir)
db.run(`
  CREATE TABLE IF NOT EXISTS devocionais (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    conteudo TEXT NOT NULL,
    data TEXT
  )
`, (err) => {
  if (err) {
    console.error('Erro ao criar tabela:', err.message);
  } else {
    console.log('Tabela "devocionais" criada com sucesso!');

    // Inserir um devocional de teste
    const titulo = 'Meu primeiro devocional';
    const conteudo = 'Este é o texto do devocional.';
    const data = '2025-10-23';

    db.run(
      `INSERT INTO devocionais (titulo, conteudo, data) VALUES (?, ?, ?)`,
      [titulo, conteudo, data],
      function (err) {
        if (err) {
          console.error('Erro ao inserir devocional:', err.message);
        } else {
          console.log(`Devocional inserido com sucesso! ID: ${this.lastID}`);

          // Listar todos os devocionais
          db.all(`SELECT * FROM devocionais`, [], (err, rows) => {
            if (err) {
              console.error('Erro ao consultar devocionais:', err.message);
            } else {
              console.log('=== Lista de Devocionais ===');
              rows.forEach((row) => {
                console.log(
                  `${row.id} | ${row.titulo} | ${row.conteudo} | ${row.data}`
                );
              });
            }

            // Fechar o banco
            db.close((err) => {
              if (err) console.error(err.message);
              else console.log('Conexão com o banco fechada.');
            });
          });
        }
      }
    );
  }
});
