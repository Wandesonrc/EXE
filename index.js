const express = require('express');
const alunos = require('./src/data/alunos.json');

const fs = require("fs/promises")

const app = express();

const port = 3000;


app.use(express.json());

// rota principal da aplicação 
app.get('/hello', (req, res) => {
  res.send('hello world');
});

/*
Lista de Endpoints da aplicação CRUD de Alunos
- [GET] /alunos - Retorna a lista de alunos com paginação
- [GET] /aluno/{id} - Retorno um aluno pelo ID
- [POST] /aluno -Cria um novo aluno
- [PUT] /aluno/{id} - Atualiza um aluno pelo ID
- [DELETE] /aluno/{id} - Remove um aluno pelo ID
*/

const getAlunosValidos = () => alunos.filter(Boolean);

const getAlunoById = id => getAlunosValidos().find(alu => alu.id === id);



//[GET] /alunos
app.get('/alunos', (req, res)=>{
  const currentUrl = req.path;

  let { limit, offset } = req.query;

  limit = Number(limit)
  offset = Number(offset)

  if (!limit) {
    limit = 5;    
  }

  if (!offset) {
    offset = 0;    
  }

  const total = alunos.length
  let currentPage  = [];
  currentPage = alunos.slice(offset, offset + limit)
  

  const next = offset + limit;
  const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` :null;

  const previos = offset - limit <=0 ? null : offset - limit;
  const previousUrl = previos != null ? `${currentUrl}?limit=${limit}&offset=${previos}` : null;

    res.send({
      nextUrl,
      previousUrl,
      limit,
      offset,
      total,
      currentPage
     

    });
      
    
    
});

//[GET] /aluno/{id}
app.get('/aluno/:id', (req, res)=>{
    const id = +req.params.id;

    const aluno = getAlunoById(id);

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
    
    fs.writeFile("./src/data/alunos.json", JSON.stringify(alunos, null, 4));

    res.sendStatus(201).json({sort:id,aluno});
});
  
//[PUT] /aluno/{id}
app.put('/aluno/:id', (req, res)=>{
    const id = +req.params.id;

    const aluno = getAlunoById(id);

    alunos[id] = aluno;

    res.send(`Aluno atualizado com sucesso: '${aluno}'.`)
});

//[DELETE] /aluno/{id}
app.delete('/aluno/:id', (req, res)=>{
  const id = +req.params.id;

  const aluno = getAlunoById(id);

  if (!aluno) {
    res.send('Aluno não encontrado. ');
    
    return;
  }

  const index = alunos.indexOf(aluno);
  //const index = alunos.findIndex(aluno => aluno.idAluno === Number(id));

   alunos.splice(index, 1);

  fs.writeFile("./src/data/alunos.json", JSON.stringify(alunos, null, 4));

  res.send('Aluno removido com sucesso.')

});


app.listen(port, () =>{
    console.log(`Aplicação rodando em http://localhost:${port}`);
});

