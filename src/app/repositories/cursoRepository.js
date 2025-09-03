import conexao from '../database/conexao.js';

class cursoRepository{

    async getCursos(){
        const sql = "SELECT * FROM curso;";
        console.log("SQL:", sql); 
        const [x] = await conexao.query(sql);
        return x;
    }

    async getCursosId(id){
        const sql = "SELECT * FROM curso WHERE id = ?;";
        const [x] = await conexao.query(sql, [id]);
        if (x.length === 0) {
            return null;
        }
        return x[0];
    }

    async postCurso(materia){
        const sql = "INSERT INTO curso (disciplina) VALUES (?);";
        const [x] = await conexao.query(sql, [materia]);
        return x;
    }

    async updateCurso(id, materia){
        const sql = "UPDATE curso SET disciplina = ? WHERE id = ?;";
        const [x] = await conexao.query(sql, [materia, id]);
        return x;
    }

    async delete(id){
        const sqlId = "SELECT * FROM curso WHERE id = ?;";
        const [selecionado] = await conexao.query(sqlId, [id]);

        if (selecionado.rowCount === 0) {
            return null; // Curso não encontrado
        }

        const del = "DELETE FROM curso WHERE id = ?";
        const x = await conexao.query(del, [id]);
        return selecionado[0];
    }
}

export default cursoRepository