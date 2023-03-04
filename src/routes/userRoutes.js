// eslint-disable-next-line import/no-extraneous-dependencies
import { Router } from 'express';
import userController from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

//* just for tests - security breach
// router.get('/', userController.index);
// router.get('/:id', userController.show);

//
router.post('/', loginRequired, userController.store);
router.put('/', loginRequired, userController.update);
router.delete('/', loginRequired, userController.delete);

export default router;

/*
methods ======================
index: list all users (GET)
store/create : create a new user (POST)
delete : delete a user (DELETE)
show : show a user (GET)
update : update a user ()
*/
