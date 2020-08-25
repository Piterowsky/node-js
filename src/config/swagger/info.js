export const tags = {
    API_USER: 'api/user',
};

export default {
    version: '0.1.0',
    title: 'Runinga',
    description: 'Runinga API',
    contact: {
        name: 'Piotr Tatarski',
        email: 'taatarski@gmail.com',
    },
    servers: [
        {
            url: 'http://localhost:3000/',
            description: 'Dev server',
        },
    ],
    tags: [
        {
            name: tags.API_USER,
        },
    ],
};
