import Router from 'koa-router';
import ItemKoaController from '../Controllers/ItemKoaController';
import AuthorizeKoaMiddleware from '../../../Auth/Presentation/Middlewares/AuthorizeKoaMiddleware';
import Permissions from '../../../Config/Permissions';

const routerOpts: Router.IRouterOptions = {
    prefix: '/api/items'
};

const ItemKoaRouter: Router = new Router(routerOpts);

ItemKoaRouter.post('/', AuthorizeKoaMiddleware(Permissions.ITEMS_SAVE), ItemKoaController.save);
ItemKoaRouter.get('/', AuthorizeKoaMiddleware(Permissions.ITEMS_LIST), ItemKoaController.list);
ItemKoaRouter.get('/:id', AuthorizeKoaMiddleware(Permissions.ITEMS_SHOW), ItemKoaController.show);
ItemKoaRouter.put('/:id', AuthorizeKoaMiddleware(Permissions.ITEMS_UPDATE), ItemKoaController.update);
ItemKoaRouter.delete('/:id', AuthorizeKoaMiddleware(Permissions.ITEMS_DELETE), ItemKoaController.remove);

export default ItemKoaRouter;
