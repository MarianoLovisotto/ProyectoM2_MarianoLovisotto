const request = require('supertest');
const app = require('../src/app');

describe('Authors API', () => {
    
    it('GET /authors debería devolver lista', async () =>{
        const res = await request(app).get('/authors');

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('POST /authors debería crear un author', async ()=>{
        const res = await request(app)
            .post('authors')
            .send({
                name:'Test User',
                email: `test${Date.now()}@mail.com`
            });

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('id');
    });

    it('POST /authors error si faltan datos', async () => {
        const res = await request(app)
            .post('/authors')
            .send({})
        expect(res.statusCode).toBe(400);
    })
})