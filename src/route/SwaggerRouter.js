import { Router } from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerDocs from '../config/swagger/swagger';

const router = Router();

// ALL /swagger
router.use('/', swaggerUI.serve);

// GET /swagger
router.get('/', swaggerUI.setup(swaggerDocs));

export default router;
