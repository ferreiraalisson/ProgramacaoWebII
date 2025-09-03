// import msyql from 'mysql'
import mysql from 'mysql2/promise'

// const conexao = msyql.createConnection({
//     host: '127.0.0.1',
//     port: '3306',
//     user:'root',
//     password:'',
//     database: 'cursosdb'
// })

const pool = mysql.createPool({
    host: '127.0.0.1',
    port: '3306',
    user:'root',
    password:'',
    database: 'cursosdb',
    // waitForConnections: true,
})

//Refatoração
// conexao.connect()

// Aplicamos o export para utilizar o objeto em outro arquivo

export default pool;
