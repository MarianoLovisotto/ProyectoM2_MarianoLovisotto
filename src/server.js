require('dotenv').config();

const app = require('./app');
const pool = require('./db');

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);

    try {
    const res = await pool.query('SELECT NOW()');
    console.log('🧪 Test DB OK:', res.rows[0]);
    } catch (error) {
    console.error('❌ Error conectando a DB:', error);
    }
});
