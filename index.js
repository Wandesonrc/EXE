const express = require('express');
const app = express();

const port = 3000;

// rota principal da aplicação 
app.get('/hello', (req, res) => {
  res.send('hello world');
});

app.listen(port, function(){
    console.log(`Aplicação rodando em http://localhost:${port}`);
});