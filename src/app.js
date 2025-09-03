//CRIANDO SERVIDOR REFATORADO

import express from 'express' //framework para copilar o JS para rodar no node
import cursoRoutes from './app/routes/routes.js'


const app = express()

// indicar para o express
app.use(cursoRoutes);


export default app

// executar o server npm run dev - run dev foi definido pelo packjage.json e instalado a biblioteca nodemon para atualizar o server sem cair ele

