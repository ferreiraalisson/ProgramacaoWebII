import msyql from 'mysql'

const conexao = msyql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user:'root',
    password:'',
    database: 'cursosdb'
})

//Refatoração
conexao.connect()

// Aplicamos o export para utilizar o objeto em outro arquivo

export default conexao
