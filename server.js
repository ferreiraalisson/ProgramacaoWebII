import app from './src/app.js'
import conexao from './infra/conexao.js'

const port = 3000

// Estabelecendo a conexão
conexao.connect((error) => {
    if(error){
        console.log("Falha de conexão:", error)
    }else{
        console.log("Conexão estabelecida com sucesso")
        // Listening (escutando)
        app.listen(port, () => {
            console.log(`Servdidor cuscuz rodando em http://localhost:${port}`)
        })
    }
})
