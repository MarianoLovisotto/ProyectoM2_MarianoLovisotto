const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL
    ? { rejectUnauthorized: false }
    : false,
});

async function setupDatabase() {
    try {
    const filePath = path.join(__dirname, 'setup.sql');
    const sql = fs.readFileSync(filePath, 'utf-8');

    await pool.query(sql);

    console.log('✅ Base de datos configurada correctamente');
    process.exit(0);
    } catch (error) {
    console.error('❌ Error configurando la base de datos:', error);
    process.exit(1);
    }
}

setupDatabase();