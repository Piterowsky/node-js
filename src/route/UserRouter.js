import { Router } from 'express';
import UserController from '../controller/UserController';

const router = Router();

router.get('/', UserController.findAll);

router.post('/', UserController.saveOne);

router.get('/:id', UserController.findByPk);

router.put('/:id', UserController.updateOne);

router.delete('/:id', UserController.deleteOneById);

export default router;
