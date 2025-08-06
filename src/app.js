//CRIANDO SERVIDOR REFATORADO

import express from 'express'
const app = express()
const cursos = [
    {id: 1, curso: 'ADS'},
    {id: 2, curso: 'ADS'},
    {id: 3, curso: 'ADS'},
    {id: 4, curso: 'ADS'},
]

// criando uma rota default = endpoint default
app.get('/', (req, res) => { // req = riquest (requisição) e res = response (respostas)
    res.send('Enviado para o servidor cuscuz')
})

app.get('/novarota', (req, res) => {
    res.send(cursos)
})

export default app

