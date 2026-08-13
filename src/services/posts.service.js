const pool = require('../db');

const getAllPosts = async () => {
    const result = await pool.query('SELECT * FROM posts ORDER BY id');
    return result.rows;
};

const getPostById = async (id) => {
    const result = await pool.query(
        'SELECT * FROM posts WHERE id = $1',
        [id]
    );
    return result.rows[0];
};

const getPostByAuthor = async (authorId) => { 
    const result = await pool.query(
        `SELECT p.*, a.name AS author_name, a.email
        FROM posts p
        JOIN author a ON p.author_id = a.id
        WHERE p.author_ID = $1`,
        [authorId]
    );
    return result.rows;
};

const createPost = async({author_id, title, content, published}) => {
    const result = await pool.query(
        `INSERT INTO posts (author_id, title, content, published)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [author_id, title, content, published ?? false]
    );
    return result.rows[0];
};

module.expors = {
    getAllPosts,
    getPostById,
    getPostByAuthor,
    createPost
}