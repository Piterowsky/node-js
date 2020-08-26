import UserService from '../service/UserService';
import HttpStatus from 'http-status-codes';
import UserValidator from '../middleware/validator/UserValidator';

class UserController {
    static async findAll(req, res) {
        try {
            const result = await UserService.findAll();
            res.send(result);
        } catch (e) {
            console.error(e);
            res.status(HttpStatus.BAD_REQUEST).send(e);
        }
    }

    static async findByPk(req, res) {
        const id = req.params.id;
        try {
            const result = await UserService.findByPk(id);
            console.log(JSON.stringify(result));
            res.send(result);
        } catch (e) {
            console.error(e);
            res.status(HttpStatus.BAD_REQUEST).send(e);
        }
    }

    static async saveOne(req, res) {
        const { username, password, email } = req.body;
        const newUser = { username, password, email };
        const errors = await UserValidator.validateSaveOne({ username, password, email });
        if (errors.length > 0) {
            console.table(errors);
            return res.status(HttpStatus.BAD_REQUEST).send(errors);
        }

        try {
            const result = await UserService.saveOne(newUser);
            return res.send(result);
        } catch (e) {
            console.error(e);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e);
        }
    }

    static async updateOne(req, res) {
        const { username, password, email } = req.body;
        const id = req.params.id;

        const errors = await UserValidator.validateUpdateOne({ id, username, password, email });
        if (errors.length > 0) {
            console.table(errors);
            return res.status(HttpStatus.BAD_REQUEST).send(errors);
        }

        try {
            const newUser = { id, username, password, email };
            const result = await UserService.updateOne(newUser);
            return res.send(result);
        } catch (e) {
            console.error(e);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e);
        }
    }

    static async deleteOneById(req, res) {
        const id = req.params.id;
        try {
            const result = await UserService.deleteOneById(id);
            res.send(result);
        } catch (e) {
            console.error(e);
            res.status(HttpStatus.BAD_REQUEST).send(e);
        }
    }
}

export default UserController;
