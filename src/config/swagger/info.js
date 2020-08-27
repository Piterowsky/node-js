export const tags = {
    API_USER: 'user service',
};

export default {
    version: '0.1.0',
    title: 'Runinga',
    description: 'Runinga API',
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
