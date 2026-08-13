const request = require('supertest');
const app = require('../src/app');

describe('Posts API', () => {

    let authorId;

    beforeAll(async() => {
        const res = await request(app)
        .post('/authors')
        .send({
            name:'author de prueba',
            email: `author${Date.now()}@test.com`,
            bio: 'Author para tests'
        });

        console.log('POST /authors status:', res.statusCode);
        console.log('POST /authors body:', res.body);

        authorId = res.body.id
    });

    it('GET /posts debería devolver lista', async () => {
    const res = await request(app).get('/posts');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    });

    it('POST /posts debería crear un post', async () => {
    const res = await request(app)
        .post('/posts')
        .send({
        author_id: authorId,
        title: 'Test post',
        content: 'Contenido test'
        });
    console.log(res.body);
    console.log('authorId:', authorId);        
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