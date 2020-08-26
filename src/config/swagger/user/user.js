import { tags } from '../info';

export default {
    '/api/user/': {
        get: {
            tags: [tags.API_USER],
            description: 'Get all users',
            operationId: 'User.findAll',
            responses: {
                '200': {
                    description: 'Found users',
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
                    description: 'User has been saved',
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
    '/api/user/{id}': {
        get: {
            tags: [tags.API_USER],
            description: 'Get user by id',
            operationId: 'User.findById',
            responses: {
                '200': {
                    description: 'Found user',
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
        put: {
            tags: [tags.API_USER],
            description: 'Edit user',
            operationId: 'User.updateOne',
            requestBody: {
                description: 'Edited user object',
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
                    description: 'User has been edited',
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
        delete: {
            tags: [tags.API_USER],
            description: 'Delete user by id',
            operationId: 'User.deleteById',
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: {
                        type: 'number',
                        example: 0
                    }
                }
            ],
            responses: {
                '200': {
                    description: 'User has been deleted',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/User',
                            },
                        },
                    },
                },
                '404': {
                    description: 'User with given id not exists',
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
        description: 'User email address',
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
