var express = require('express');
var app = express();

// rota principal da aplicação 
app.get('/hello', function(req, res) {
  res.send('hello world');
});

app.listen(3000, function(){
    console.log('Aplicação rodando em http://localhost:3000')
})