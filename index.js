const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = 3000;

//analisar o Json
app.use(bodyParser.json());

// rota principal da aplicação 
app.get('/hello', (req, res) => {
  res.send('hello world');
});

/*
Lista de Endpoints da aplicação CRUD de Alunos
- [GET] /alunos -Retorna a lista de alunos com paginação
- [GET] /aluno/{id} - Retorno um aluno pelo ID
- [POST] /aluno -Cria um novo aluno
- [PUT] /aluno/{id} - Atualiza um aluno pelo ID
- [DELETE] /aluno/{id} - Remove um aluno pelo ID
*/

const alunos = [
  { 
      "id": 1,
      "nome":"Alice M",
      "dataNascimento": "01/01/2010",
      "turma":"A",
      "turno":"Tarde"
   },
   {
      "id": 2,
      "nome":"Bruno Silva",
      "dataNascimento": "07/10/2010",
      "turma":"A",
      "turno":"Tarde"

   }
  ];

//[GET] /alunos
app.get('/alunos', (req, res)=>{
    res.send(alunos.filter(Boolean));

});

//[GET] /aluno/{id}
app.get('/aluno/:id', (req, res)=>{
    const id = req.params.id -1;

    const aluno = alunos[id];

    if (!aluno) {
      res.send('Aluno não encontrado.');
      
      return;
    }

    res.send(aluno);

});

//[POST] /aluno
app.post('/aluno', (req,res)=>{
    const aluno = req.body;

    if (!aluno || !aluno.nome) {
      res.send('Aluno iválido')
      
      return;
    }

    aluno.id = alunos.length +1;
    alunos.push(aluno);

    res.send(aluno);
});

//[PUT] /aluno/{id}
app.put('/aluno/:id', (req, res)=>{
    const id = req.params.id -1;

    const aluno = req.body.aluno;

    alunos[id] = aluno;

    res.send(`Aluno atualizado com sucesso: '${aluno}'.`)
});

//[DELETE] /aluno/{id}
app.delete('/aluno/:id', (req, res)=>{
  const id = req.params.id -1;

  delete alunos[id];

  res.send('Aluno removido com sucesso.')

});


app.listen(port, function(){
    console.log(`Aplicação rodando em http://localhost:${port}`);
});