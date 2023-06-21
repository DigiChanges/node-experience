import Router from 'koa-router';
import AuthorizeKoaMiddleware from '../Middlewares/AuthorizeKoaMiddleware';
import Permissions from '../../../Config/Permissions';
import UserKoaController from '../Controllers/UserKoaController';

const routerOpts: Router.IRouterOptions = {
    prefix: '/api/users'
};

const UserKoaRouter: Router = new Router(routerOpts);

UserKoaRouter.post('/', AuthorizeKoaMiddleware(Permissions.USERS_SAVE), UserKoaController.save);
UserKoaRouter.get('/', AuthorizeKoaMiddleware(Permissions.USERS_LIST), UserKoaController.list);
UserKoaRouter.get('/:id', AuthorizeKoaMiddleware(Permissions.USERS_SHOW), UserKoaController.getOne);
UserKoaRouter.put('/:id', AuthorizeKoaMiddleware(Permissions.USERS_UPDATE), UserKoaController.update);
UserKoaRouter.put('/assign-role/:id', AuthorizeKoaMiddleware(Permissions.USERS_ASSIGN_ROLE), UserKoaController.assignRole);
UserKoaRouter.delete('/:id', AuthorizeKoaMiddleware(Permissions.USERS_DELETE), UserKoaController.remove);
UserKoaRouter.post('/change-my-password', AuthorizeKoaMiddleware(Permissions.USERS_CHANGE_MY_PASSWORD), UserKoaController.changeMyPassword);
UserKoaRouter.put('/change-user-password/:id', AuthorizeKoaMiddleware(Permissions.USERS_CHANGE_USER_PASSWORD), UserKoaController.changeUserPassword);
UserKoaRouter.post('/active/:id', AuthorizeKoaMiddleware(Permissions.USERS_ACTIVE), UserKoaController.activeUser);

export default UserKoaRouter;
