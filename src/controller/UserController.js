import UserService from '../service/UserService';
import HttpStatus from 'http-status-codes';
import UserValidator from '../middleware/validator/UserValidator';

class UserController {
    static async findAll(req, res) {
        try {
            const result = await UserService.findAll();
            res.status(200).send(result);
        } catch (e) {
            res.status(500).send(e);
        }
    }

    static async findOne(req, res) {}

    static async saveOne(req, res) {
        const errors = await UserValidator.validateSaveOne(req);
        const { username, password, email } = req.body;
        console.warn(errors.length > 0);
        if (errors.length > 0) {
            console.table(errors);
            return res.status(HttpStatus.BAD_REQUEST).send(errors);
        }

        try {
            const newUser = { username, password, email };
            const result = await UserService.saveOne(newUser);
            return res.send(result);
        } catch (e) {
            console.error(e);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e);
        }
    }

    static async updateOne(req, res) {}

    static async removeOne(req, res) {}
}

export default UserController;
