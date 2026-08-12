const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'API funcionando correctamente' });
});


module.exports = app;

const authorsService = require('./services/authors.service')

app.get('/test-authors', async (req, res) => {
    const authors = await authorsService.getAllAuthors();
    res.json(authors);
})

