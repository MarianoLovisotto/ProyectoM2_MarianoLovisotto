const express = require('express');
const router = express.Router();

const authorsService = require('../services/authors.service');

router.get('/', async(req, res) =>{
    const authors = await authorsService.getAllAuthors();
    res.json(authors);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const author = await authorsService.getAuthorById(id);

    if(!author) {
        return res.status(404).json({message: 'Autor no encontrando'});
    }

    res.json(author);
});

router.post('/', async (req, res) => {
    const {name, email, bio} = req.body;

    if(!name || !email) {
        return res.status(400).json({message: 'Name e email son obligatorios'});
    }

    const newAuthor = await authorsService.createAuthor({
        name,
        email,
        bio,
    });

    res.status(201).json(newAuthor);
});

module.exports = router