const express = require('express');
const router = express.Router();

const postsService = require('../services/posts.service');

router.get('/', async (req, res) => {

    const posts = await postsService.getAllPosts();
    res.json(posts);
});

router.get('/:id', async (req, res) => {
    const post = await postsService.getPostById(req.params.id);

    if(!post) {
        return res.status(404).json({ message: 'Post no encontrado'});
    };
    res.json(post);
});

router.get('/author/:authorId', async (req, res) => {
    const posts = await postsService.getPostsByAuthor(req.params.authorId);
    res.json(posts);
});

router.post('/', async (req, res) => {
    const { author_id, title, content, published } = req.body;

    if(!author_id || !title || !content) {
        return res.status(400).json({
            message: 'author_id, title y content son obligatorios',
        });
    }

    const newPost = await postsService.createPost({
        author_id,
        title,
        content,
        published,
    });

    res.status(201).json(newPost);
});

module.exports = router;