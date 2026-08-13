const request = require('supertest');
const app = require('../src/app');

describe('Posts API', () => {

    it('GET /posts debería devolver lista', async () => {
    const res = await request(app).get('/posts');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    });

    it('POST /posts debería crear un post', async () => {
    const res = await request(app)
        .post('/posts')
        .send({
        author_id: 1,
        title: 'Test post',
        content: 'Contenido test'
        });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    });

    it('POST /posts error si faltan datos', async () => {
    const res = await request(app)
        .post('/posts')
        .send({});

    expect(res.statusCode).toBe(400);
    });

});