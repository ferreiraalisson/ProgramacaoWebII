//CRIANDO SERVIDOR REFATORADO

import { Router } from 'express';
import cursoController from '../controllers/cursoController.js'

const router = Router();

// CONSULTA REFATORADA COM ESTRUTURA MVC
router.get('/cursos', (req, res) => cursoController.index(req, res));

// REFATORAMENTO DE CONSULTA POR ID SEM MVC
router.get('/cursos/:id', (req, res) =>  cursoController.show(res, req));

// CADASTRAR REFATORADO PARA O BANCO ESTRUTURADO PARA O MVC
router.post('/cursos', (req, res) =>  cursoController.store(res, req));

//put - upgrade - REFATORADO PARA O BANCO COM ESTRUTURA MVC
router.put('/curso/:id', (req, res) =>  cursoController.update(res, req))

// REFATORADO PARA BANCO COM A ESTRUTURA MVC
router.delete('/cursos/excluir/:id', (req, res) =>  cursoController.delete(res, req))

export default router

// executar o server npm run dev - run dev foi definido pelo packjage.json e instalado a biblioteca nodemon para atualizar o server sem cair ele.

