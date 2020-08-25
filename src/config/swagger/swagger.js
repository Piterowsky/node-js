import info from './info';
import user, { userSchemas } from './user/user';

const OPEN_API_VERSION = '3.0.1';

export default {
    openapi: OPEN_API_VERSION,
    info,
    paths: {
        ...user,
    },
    components: {
        schemas: {
            ...userSchemas,
        },
    },
};
