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

// app.post('/cursos', (req, res) => {
//     cursos.push(req.body) // o body é referente ao postman
//     res.status(200).send('Seleção cadastrada com sucesso')
// })

app.post('/cursos', (req, res) => {
    const novoCurso = req.body;

    // não usa o id pois é autoincrement
    const sql = "INSERT INTO curso (disciplina) VALUES (?);"

    conexao.query(sql, [novoCurso.disciplina], (error, input) =>{
        if (error){
            console.log(error)
        }else{
            res.status(201).json({id: input.insertId}) //insertId para exibir o id gerado
        }
    })
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

// REFATORADO
app.get('/cursos/:id', (req, res) => {
    let id = req.params.id // transforma o id em parametros
    
    const sql = "SELECT * FROM curso WHERE id = ?;"
    conexao.query(sql, [id], (error, idResult) => {
        if (error) {
           console.log(error) 
           res.status(500).json({ erro: "Erro ao buscar curso"})
        }else{
            if (idResult.length > 0 ){
                res.status(200).json(idResult[0])
            }else{
                res.status(404).json({ mensagem: "Curso não encontrado"})
            }
        }
    })

})

app.get('/cursosads/:id', (req, res) => {
    res.json(buscarCursosPorId(req.params.id)) 
})

//put - upgrade - REFATORADO

app.put('/cursos/:id', (req, res) => {
    let id = req.params.id;
    const { disciplina } = req.body;

    const sql = "UPDATE curso SET disciplina = ? WHERE id = ?;";

    conexao.query(sql, [disciplina, id], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).json({ erro: "Erro ao atualizar curso." });
        }

        if (result.affectedRows > 0) {
            res.status(200).json({ mensagem: "Curso atualizado com sucesso." });
        } else {
            res.status(404).json({ mensagem: "Curso não encontrado." });
        }
    });
});

//delete

// app.delete('/cursos/excluir/:id', (req, res) => {
//     let index = buscarIndexCurso(req.params.id)
//     console.log(index)
//     cursos.splice(index, 1)
//     res.status(200).send( `O curso com id ${req.params.id} excluído com sucesso!`)
// })

//REFATORADO
app.delete('/cursos/excluir/:id', (req, res) => {
    let id = req.params.id;
    
    const sqlId = "SELECT * FROM curso WHERE id = ?;"
    conexao.query(sqlId, [id], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ erro: "Erro ao verificar curso." });
        }

        if (results.length === 0) {
            // Curso não encontrado
            return res.status(404).json({ mensagem: "Curso não encontrado." });
        }

        const del = "DELETE FROM curso WHERE id = ?";
        conexao.query(del, [id], (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ erro: "Erro ao excluir curso." });
            }

            return res.status(200).send(`O curso com id ${id} foi excluído com sucesso!`);
        });
    });
})   


export default app

// executar o server npm run dev - run dev foi definido pelo packjage.json e instalado a biblioteca nodemon para atualizar o server sem cair ele

