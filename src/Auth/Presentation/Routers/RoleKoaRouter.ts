import Router from 'koa-router';
import AuthorizeKoaMiddleware from '../Middlewares/AuthorizeKoaMiddleware';
import Permissions from '../../../Config/Permissions';
import RoleKoaController from '../Controllers/RoleKoaController';

const routerOpts: Router.IRouterOptions = {
    prefix: '/api/roles'
};

const RoleKoaRouter: Router = new Router(routerOpts);

RoleKoaRouter.post('/', AuthorizeKoaMiddleware(Permissions.ROLES_SAVE), RoleKoaController.save);
RoleKoaRouter.get('/', AuthorizeKoaMiddleware(Permissions.ROLES_LIST), RoleKoaController.list);
RoleKoaRouter.get('/:id', AuthorizeKoaMiddleware(Permissions.ROLES_SHOW), RoleKoaController.getOne);
RoleKoaRouter.put('/:id', AuthorizeKoaMiddleware(Permissions.ROLES_UPDATE), RoleKoaController.update);
RoleKoaRouter.delete('/:id', AuthorizeKoaMiddleware(Permissions.ROLES_DELETE), RoleKoaController.remove);

export default RoleKoaRouter;
