import { Sequelize } from 'sequelize';

const showLogs = process.env.DB_LOGGING === 'true';

const connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    logging: showLogs,
});

export default connection;
