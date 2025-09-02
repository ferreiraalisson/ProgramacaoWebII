import conexao from "../database/conexao.js"

//index(): listar tudo
//show(): listar por id
//store(): criar dados
//update(): atualizar dados
//delete(): remover dados

class cursoController {
    // GET
    index(req, res) {
        const sql = "SELECT * FROM curso;"
        conexao.query(sql, (error, result) => {
            if (error) {
                console.log(error)
            } else {
                res.status(200).json(result)
            }
        })
    }
    show() {

    }

    // POST
    store(req, res) {
        const novoCurso = req.body;

        // não usa o id pois é autoincrement
        const sql = "INSERT INTO curso (disciplina) VALUES (?);"

        conexao.query(sql, [novoCurso.disciplina], (error, input) => {
            if (error) {
                console.log(error)
            } else {
                res.status(201).json({ id: input.insertId }) //insertId para exibir o id gerado
            }
        })
    }

    // UPDATE
    update(req, res) {
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
    }
    delete(req, res) {
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
    }
}

export default new cursoController;