import conexao from "../database/conexao.js"

//index(): listar tudo
//show(): listar por id
//store(): criar dados
//update(): atualizar dados
//delete(): remover dados

class cursoController {
    index(req, res){
        const sql = "SELECT * FROM curso;"
        conexao.query(sql, (error, result) => {
            if(error) {
                console.log(error)
            }else{
                res.status(200).json(result)
            }
        })
    }
    show(){

    }
    store(){

    }
    update(){

    }
    delete(){
        
    }
}

export default new cursoController;