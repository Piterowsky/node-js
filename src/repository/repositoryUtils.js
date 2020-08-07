const { Client } = require('pg');

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

client.connect();

async function executeQuery(query) {
    try {
        const { rows } = await client.query(query);
        return rows;
    } catch (err) {
        console.log(err.stack);
    }
}

module.exports = { executeQuery };
