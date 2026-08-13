const { Pool } = require('pg');

const isTest = process.env.NODE_ENV === 'test';

// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: isTest
//     ? false
//     : {
//         rejectUnauthorized: false,
//         },
//     client_encoding: 'UTF8',
// });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false,
    client_encoding: 'UTF8',
});

pool.on('connect', () => {
    console.log('🟢 Conectado a PostgreSQL');
});

pool.on('error', (err) => {
    console.error('🔴 Error en la conexión:', err);
});

module.exports = pool;