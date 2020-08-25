import connection from '../config/connection';

async function updateSchema() {
    await connection.sync({ force: process.env.DB_FORCE_UPDATE_SCHEMA });
}

export { updateSchema };
