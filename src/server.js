import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { json, urlencoded } from 'body-parser';
import UserRouter from './route/UserRouter';
import connection from './config/connection';
import { updateSchema } from './util/schemaUtils';
import Routes from './routes';
import SwaggerRouter from './route/SwaggerRouter';

(async function () {
    await setupDatabase();

    const app = setupExpress();

    setupMiddlewares(app);
    setupRoutes(app);

    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server is running on port ${port}`));
})();

async function setupDatabase() {
    await testDatabaseConnection();
    await updateSchema();
}

function setupRoutes(app) {
    app.use(Routes.API_USER, UserRouter);
    app.use(Routes.SWAGGER, SwaggerRouter);
}

function setupExpress() {
    const app = express();
    app.disable('x-powered-by');
    return app;
}

function setupMiddlewares(app) {
    app.use(json());
    app.use(urlencoded({ extended: true }));
    app.use(getCors());
    app.use(morgan('dev'));
}

async function testDatabaseConnection() {
    try {
        await connection.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

function getCors() {
    const whitelist = process.env.CORS_WHITELIST ? process.env.CORS_WHITELIST.split(',') : process.env.CORS_WHITELIST;
    return cors({
        origin: whitelist || ['http://localhost', 'https://localhost'],
        optionsSuccessStatus: 200,
    });
}
