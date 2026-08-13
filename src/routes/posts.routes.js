const express = require('express');
const router = express.Router();

const postsService = require('../services/posts.service');
const AppError = require('../middleware/AppError');

// GET /posts
router.get('/', async (req, res,next) => {
    try { 
        const posts = await postsService.getAllPosts();
        res.json(posts);
    } catch (error) {
        next (error);
    }
});

// GET /posts/:id
router.get('/:id', async (req, res, next) => {
    try {
    const post = await postsService.getPostById(req.params.id);

    if (!post) {
        throw new AppError('Post no encontrado', 404);
    }

    res.json(post);
    } catch (error) {
    next(error);
    }
});

// GET /posts/author/:authorId
router.get('/author/:authorId', async (req, res, next) => {
    try {
    const posts = await postsService.getPostsByAuthor(req.params.authorId);
    res.json(posts);
    } catch (error) {
    next(error);
    }
});



// POST /posts
router.post('/', async (req, res, next) => {
    try {
    const { author_id, title, content, published } = req.body;

    if (!author_id || !title || !content) {
        throw new AppError(
        'author_id, title y content son obligatorios',
        400
        );
    }

    const newPost = await postsService.createPost({
        author_id,
        title,
        content,
        published,
    });

    res.status(201).json(newPost);

    } catch (error) {
    // Manejo de foreign key (author inexistente)
    if (error.code === '23503') {
        return next(new AppError('El author_id no existe', 400));
    }

    next(error);
    }
});

module.exports = router;

// PUT /posts/:id
router.put('/:id', async (req, res, next) => {
    try {
    const data = req.body;

    if (Object.keys(data).length === 0) {
        throw new AppError('Debe enviar al menos un campo', 400);
    }

    // ❗ Validar NOT NULL
    if ('title' in data && !data.title) {
        throw new AppError('title no puede ser vacío', 400);
    }

    if ('content' in data && !data.content) {
        throw new AppError('content no puede ser vacío', 400);
    }

    if ('author_id' in data && !data.author_id) {
        throw new AppError('author_id no puede ser vacío', 400);
    }

    const updated = await postsService.updatePost(
        req.params.id,
        data
    );

    if (!updated) {
        throw new AppError('Post no encontrado', 404);
    }

    res.json(updated);

    } catch (error) {
    if (error.code === '23503') {
        return next(new AppError('El author_id no existe', 400));
    }
    next(error);
    }
});

// DELETE /posts/:id
router.delete('/:id', async (req, res, next) => {
    try {
    const deleted = await postsService.deletePost(req.params.id);

    if (!deleted) {
        throw new AppError('Post no encontrado', 404);
    }

    res.status(204).send();

    } catch (error) {
    next(error);
    }
});