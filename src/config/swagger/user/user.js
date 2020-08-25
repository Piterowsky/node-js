import { tags } from '../info';

export default {
    '/api/user/': {
        get: {
            tags: [tags.API_USER],
            description: 'Get all users',
            operationId: 'User.findAll',
            responses: {
                '200': {
                    description: 'Users returned',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Users',
                            },
                        },
                    },
                },
            },
        },
        post: {
            tags: [tags.API_USER],
            description: 'Save new user',
            operationId: 'User.saveOne',
            requestBody: {
                description: 'New user object',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/User',
                        },
                    },
                },
            },
            responses: {
                '200': {
                    description: 'User saved',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/User',
                            },
                        },
                    },
                },
            },
        },
    },
};

export const userSchemas = {
    username: {
        type: 'string',
        description: 'Name of the user',
        example: 'superuser123',
    },
    password: {
        type: 'string',
        description: 'User highly advanced password',
        example: '*testTEST1234#',
    },
    email: {
        type: 'string',
        description: 'User email',
        example: 'test@runinga.com',
    },
    User: {
        type: 'object',
        properties: {
            username: {
                $ref: '#/components/schemas/username',
            },
            password: {
                $ref: '#/components/schemas/password',
            },
            email: {
                $ref: '#/components/schemas/email',
            },
        },
    },
    Users: {
        type: 'object',
        properties: {
            users: {
                type: 'array',
                items: {
                    $ref: '#/components/schemas/User',
                },
            },
        },
    },
};
