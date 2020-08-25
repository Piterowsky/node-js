import User from '../model/UserModel';
import bcrypt from 'bcrypt';

class UserService {
    static async findAll() {
        try {
            return await User.findAll();
        } catch (e) {
            console.error(e);
        }
    }

    static async findOne() {}

    static async saveOne({ username, password, email }) {
        const pwHash = await bcrypt.hash(password, 12);
        const entity = User.build({ username, pwHash, email });
        return await entity.save();
    }

    static async updateOne() {}

    static async removeOne() {}
}

export default UserService;
