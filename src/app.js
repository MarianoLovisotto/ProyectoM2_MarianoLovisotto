const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'API funcionando correctamente' });
});


module.exports = app;

const authorsService = require('./services/authors.service');
const authorsRoutes = require('./routes/authors.routes');
app.use('/authors', authorsRoutes);

const postsRoutes = requiere('./routes/posts.routes');
app.use('/posts' , postsRoutes);
