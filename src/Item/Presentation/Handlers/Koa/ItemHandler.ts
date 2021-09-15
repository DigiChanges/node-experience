import Koa from 'koa';
import Router from 'koa-router';
import {StatusCode} from '@digichanges/shared-experience';
import Responder from '../../../../App/Presentation/Shared/Koa/Responder';
import ItemController from '../../Controllers/ItemController';
import ItemTransformer from '../../Transformers/ItemTransformer';
import ItemRepRequest from '../../Requests/ItemRepRequest';
import Item from '../../../Domain/Entities/Item';
import { AuthUser } from '../../../../Auth/Presentation/Helpers/AuthUser';
import IUserDomain from '../../../../User/InterfaceAdapters/IUserDomain';

const routerOpts: Router.IRouterOptions = {
    prefix: '/api/items'
};

const ItemHandler: Router = new Router(routerOpts);
const responder: Responder = new Responder();
const controller: ItemController = new ItemController();

ItemHandler.post('/', async(ctx: Koa.Context) =>
{
    const request = new ItemRepRequest(ctx.request.body);

    const item: Item = await controller.save(request, AuthUser(ctx.request.req) as IUserDomain);

    responder.send(item, ctx, StatusCode.HTTP_CREATED, new ItemTransformer());
});

// @httpGet('/', AuthorizeMiddleware(Permissions.ITEMS_LIST))
// public async list(@request() req: Request, @response() res: Response)
// {
//     const _request = new ItemRequestCriteria(req);
//
//     const paginator: IPaginator = await this.controller.list(_request);
//
//     await this.responder.paginate(paginator, req, res, StatusCode.HTTP_OK, new ItemTransformer());
// }
//
// @httpGet('/:id', AuthorizeMiddleware(Permissions.ITEMS_SHOW))
// public async getOne(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
// {
//     const _request = new IdRequest(req);
//
//     const item: IItemDomain = await this.controller.getOne(_request);
//
//     this.responder.send(item, req, res, StatusCode.HTTP_OK, new ItemTransformer());
// }
//
// @httpPut('/:id', AuthorizeMiddleware(Permissions.ITEMS_UPDATE))
// public async update(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
// {
//     const _request = new ItemUpdateRequest(req);
//
//     const item: IItemDomain = await this.controller.update(_request);
//
//     this.responder.send(item, req, res, StatusCode.HTTP_CREATED, new ItemTransformer());
// }
//
// @httpDelete('/:id', AuthorizeMiddleware(Permissions.ITEMS_DELETE))
// public async remove(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
// {
//     const _request = new IdRequest(req);
//
//     const item: IItemDomain = await this.controller.remove(_request);
//
//     this.responder.send(item, req, res, StatusCode.HTTP_OK, new ItemTransformer());
// }

export default ItemHandler;
