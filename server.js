import app from './src/app.js'

const port = 3000

// Listening (escutando)
app.listen(port, () => {
    console.log(`Servdidor cuscuz rodando em http://localhost:${port}`)
})

