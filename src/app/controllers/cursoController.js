import cursoRepository from "../repositories/cursoRepository.js";

//index(): listar tudo
//show(): listar por id
//store(): criar dados
//update(): atualizar dados
//delete(): remover dados

const repository = new cursoRepository();

class cursoController {
    async index(req, res) {
        try {
            const cursos = await repository.getCursos();
            console.log(cursos);
            res.status(200).json(cursos);
        } catch (error) {
            console.error('Erro ao buscar cursos:', error);
            res.status(500).json({ error: 'Erro interno ao buscar cursos' });
        }
    }
    async show(req, res) {
        let id = req.params.id

        try {
            const cursoId = await repository.getCursosId(id);

            if (!cursoId) {
                return res.status(404).json({ mensagem: "Curso não encontrado" })
            } else {
                return res.status(200).json(cursoId);
            }

        } catch (error) {
            console.error('Erro ao buscar curso:', error);
            res.status(500).json({ erro: "Erro ao buscar curso" });
        }
    }

    // POST
    async store(req, res) {
        const novoCurso = req.body;

        try {
            const gerarCurso = await repository.postCurso(novoCurso.disciplina);
            res.status(201).json({ id: gerarCurso.insertId, mensagem: 'Curso criado com sucesso' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ erro: 'Erro ao criar curso' });
        }
    }

    // UPDATE
    async update(req, res) {
        let id = req.params.id;
        const { disciplina } = req.body;

        try {
            const resultado = await repository.updateCurso(id, disciplina); // Chama o repository

            if (resultado.affectedRows === 0) {  // Verifica se nenhuma linha foi afetada
                return res.status(404).json({ erro: 'Curso não encontrado' });
            }

            res.status(200).json({ mensagem: 'Curso atualizado com sucesso', resultado })

        } catch (error) {
            console.log(error);
            res.status(500).json({ erro: "Erro ao atualizar curso." });
        }
    }


    async delete(req, res) {
        const id = req.params.id;

        try {
            const cursoExcluido = await repository.delete(id);

            if (!cursoExcluido) {
                return res.status(404).json({ mensagem: "Curso não encontrado." });
            }

            return res.status(200).json({
                mensagem: `Curso com id ${id} excluído com sucesso.`,
                curso: cursoExcluido
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: "Erro ao excluir curso." });
        }
    }
}

export default new cursoController;