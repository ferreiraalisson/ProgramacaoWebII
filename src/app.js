//CRIANDO SERVIDOR REFATORADO

import express from 'express' //framework para copilar o JS para rodar no node
import conexao from '../infra/conexao.js'

const app = express()

// indicar para o express
app.use(express.json())

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

//ajustar a consulta para o banco - consulta refatorada
app.get('/cursos', (req, res) => {
    // res.status(200).send(cursos)
    const sql = "SELECT * FROM curso;"
    conexao.query(sql, (error, result) => {
        if(error) {
            console.log(error)
        }else{
            res.status(200).json(result)
        }
    })
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

