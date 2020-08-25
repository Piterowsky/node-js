import swaggerJsDocs from 'swagger-jsdoc';
import { join } from 'path';

const options = {
    swaggerDefinition: {
        info: {
            title: process.env.TITLE,
            version: process.env.VERSION,
        },
        auth: false,
    },
    apis: [join(__dirname, '..', 'route', '*.js')],
};

export default swaggerJsDocs(options);
