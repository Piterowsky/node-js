const { executeQuery } = require('../repository/repositoryUtils');

const USERS_TABLE = 'users';

class UserRepository {
    async findAll() {
        return executeQuery(`SELECT * FROM users`);
    }

    async findOneByUsername(username) {
        const result = await executeQuery(`SELECT * FROM users WHERE username = '${username}';`);
        return result ? result[0] : null;
    }

    async findByUsername(username) {
        return executeQuery(`SELECT * FROM users WHERE username = '${username}';`);
    }

    async save(username, phash) {
        return executeQuery(
            `INSERT INTO ${USERS_TABLE}(username, phash) VALUES ('${username}', '${phash}') RETURNING *;`
        );
    }
}

module.exports = UserRepository;
