//CRIANDO SERVIDOR REFATORADO

import express from 'express' //framework para copilar o JS para rodar no node
const app = express()

// indicar para o express
app.use(express.json())

//mock
const cursos = [
    {id: 1, disciplina: 'ADS'},
    {id: 2, disciplina: 'ADS'},
    {id: 3, disciplina: 'ADS'},
    {id: 4, disciplina: 'ADS'},
]

// função auxiliar - verifica no array (mock)
//retorna um objeto
function buscarCursosPorId(id) {
    return cursos.filter(curso => curso.id == id)
}
// retorna um index
function buscarIndexCurso(id){
    return cursos.findIndex( curso => curso.id == id)
}

//cadastrar cursos

app.post('/cursos', (req, res) => {
    cursos.push(req.body) // o body é referente ao postman
    res.status(200).send('Seleção cadastrada com sucesso')
})

// consultas
// criando uma rota default = endpoint default
app.get('/', (req, res) => { // req = riquest (requisição) e res = response (respostas)
    res.send('Enviado para o servidor cuscuz')
})

app.get('/cursos', (req, res) => {
    res.status(200).send(cursos)
})

app.get('/cursos/:id', (req, res) => {
    let index = req.params.id // transforma o id em parametros
    console.log(index) // irá exibir o id recebido no console
})

app.get('/cursosads/:id', (req, res) => {
    res.json(buscarCursosPorId(req.params.id)) 
})

//put - upgrade - atualizar

app.put('/cursos/:id', (req, res) => {
    let index = buscarIndexCurso(req.params.id)
    cursos[index].disciplina = req.body.disciplina
    res.json(cursos)
})

//delete

app.delete('/cursos/excluir/:id', (req, res) => {
    let index = buscarIndexCurso(req.params.id)
    console.log(index)
    cursos.splice(index, 1)
    res.status(200).send( `O curso com id ${req.params.id} excluído com sucesso!`)
})


export default app

// executar o server npm run dev - run dev foi definido pelo packjage.json e instalado a biblioteca nodemon para atualizar o server sem cair ele

