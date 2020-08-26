import User from '../model/UserModel';
import bcrypt from 'bcrypt';

class UserService {
    static async findAll() {
        return await User.findAll();
    }

    static async findByPk(id) {
        return await User.findByPk(id);
    }

    static async saveOne({ username, password, email }) {
        const pwHash = await bcrypt.hash(password, 12);
        const entity = User.build({ username, pwHash, email });
        await entity.save();
        return { username, password, email };
    }

    static async updateOne({ id, username, password, email }) {
        const pwHash = await bcrypt.hash(password, 12);
        await User.update({username, pwHash, email}, {
            where: {
                id,
            },
        });
        return { username, password, email };
    }

    static async deleteOneById(id) {
        return await User.destroy({
            where: {
                id,
            },
        });
    }

    static async findOneByEmail(email) {
        return await User.findOne({
            where: {
                email,
            },
        });
    }

    static async findOneByUsername(username) {
        return await User.destroy({
            where: {
                username,
            },
        });
    }
}

export default UserService;
