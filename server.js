const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/execute', (req, res) => {
  const { host, command } = req.body;

  let cmd;
  switch (command) {
    case 'traceroute':
      cmd = process.platform === 'win32' ? `tracert ${host}` : `traceroute ${host}`;
      break;
    case 'nslookup':
      cmd = `nslookup ${host}`;
      break;
    case 'whois':
      cmd = `whois ${host}`;
      break;
    case 'host':
      cmd = `host ${host}`;
      break;
    case 'dig':
      cmd = `dig ${host}`;
      break;
    default:
      return res.status(400).send('Comando inválido.');
  }

  exec(cmd, (err, stdout, stderr) => {
    if (err) return res.send(`Erro: ${stderr}`);
    res.send(stdout);
  });
});

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em: http://localhost:${PORT}`);
});