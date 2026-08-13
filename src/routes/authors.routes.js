const express = require('express');
const router = express.Router();

const authorsService = require('../services/authors.service');
const AppError = require('../middleware/appError');

router.get('/', async(req, res, next) => {
    try {
        const authors = await authorsService.getAllAuthors();
        res.json(authors);
    }catch(error) {
        next(error);
    }
});


router.get('/:id', async (req, res, next) => {
    try{
        const author = await authorsService.getAuthorsById(req.params.id);

        if(!author) {
            throw new AppError('Author no encontrado', 404);
        }
        res.json(author);
    }catch(error) {
        next(error);
    }
});


router.post('/', async( res, req, next) => {
    try{
        const {name, email, bio} = req.body;

        if(!name || !email) {
            throw new AppError('Name y email son obligatorios', 400);
        }

        const newAuthor = await authorsService.createAuthor({
            name, 
            email,
            bio,
        });

        res.status(201).json(newAuthor);
    } catch(error) {
        if(error.code === '23505') {
            return next(new AppError('El email ya existe', 400))
        }
        next(error);
    }
});

router.put('/:id', async (req, res, next) =>{
    try{
        const {name, email, bio} = req.body;

        if(!name || !email) {
            throw new AppError('Name e email son obligatorios', 400);
        }

        const updated = await authorsService.update(
            req.params.id,
            { name, email, bio }
        );

        if(!updated) {
            throw new AppError('Author no encontrado', 404);
        }
        res.json(updated);
    }catch(error) {
        if(error.code === '23505') {
            return next(new AppError('El email ya existe', 400));
        }
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const deleted = await authorsService.deleteAuthor(req.params.id);

        if(!deleted) {
            throw new AppError('Author no encontrado', 404);
        }
        res.status(204).send();
    }catch(error) {
        next(error);
    }
});


module.exports = router