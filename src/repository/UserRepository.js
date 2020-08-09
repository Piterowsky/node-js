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

    async findByGoogleId(googleId) {
        return executeQuery(`SELECT * FROM users WHERE google_id = '${googleId}';`);
    }

    async save(username, phash, email, googleId) {
        return executeQuery(
            `INSERT INTO ${USERS_TABLE}(username, phash, email, google_id) 
             VALUES ('${username}', '${phash}', '${email}', '${googleId}')
             RETURNING *;`
        );
    }
}

module.exports = UserRepository;
