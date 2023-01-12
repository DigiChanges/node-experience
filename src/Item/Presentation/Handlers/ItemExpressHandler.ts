import { NextFunction, Request, Response } from 'express';
import { controller, httpDelete, httpGet, httpPost, httpPut, next, request, response } from 'inversify-express-utils';
import StatusCode from '../../../Shared/Application/StatusCode';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';

import ExpressResponder from '../../../Shared/Application/Http/ExpressResponder';
import AuthorizeExpressMiddleware from '../../../Auth/Presentation/Middlewares/AuthorizeExpressMiddleware';
import Permissions from '../../../Config/Permissions';

import ItemTransformer from '../Transformers/ItemTransformer';
import IItemDomain from '../../Domain/Entities/IItemDomain';

import ItemController from '../Controllers/ItemController';
import { AuthUser } from '../../../Auth/Presentation/Helpers/AuthUser';
import ResponseMessageEnum from '../../../Shared/Domain/Enum/ResponseMessageEnum';
import DefaultMessageTransformer from '../../../Shared/Presentation/Transformers/DefaultMessageTransformer';

@controller('/api/items')
class ItemExpressHandler
{
    private responder: ExpressResponder;
    private readonly controller: ItemController;

    constructor()
    {
        this.responder = new ExpressResponder();
        this.controller = new ItemController();
    }

    @httpPost('/', void AuthorizeExpressMiddleware(Permissions.ITEMS_SAVE))
    public async save(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const data = {
            authUser: AuthUser(req),
            ...req.body
        };

        const item: IItemDomain = await this.controller.save(data);

        void await this.responder.send(item, req, res, StatusCode.HTTP_CREATED, new DefaultMessageTransformer(ResponseMessageEnum.CREATED));
    }

    @httpGet('/', void AuthorizeExpressMiddleware(Permissions.ITEMS_LIST))
    public async list(@request() req: Request, @response() res: Response)
    {
        const data = {
            query: req.query,
            url: req.url
        };

        const paginator: IPaginator = await this.controller.list(data);

        await this.responder.paginate(paginator, req, res, StatusCode.HTTP_OK, new ItemTransformer());
    }

    @httpGet('/:id', void AuthorizeExpressMiddleware(Permissions.ITEMS_SHOW))
    public async getOne(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const data = {
            id: req.params.id
        };

        const item: IItemDomain = await this.controller.getOne(data);

        void await this.responder.send(item, req, res, StatusCode.HTTP_OK, new ItemTransformer());
    }

    @httpPut('/:id', void AuthorizeExpressMiddleware(Permissions.ITEMS_UPDATE))
    public async update(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const data = {
            id: req.params.id,
            authUser: AuthUser(req),
            ...req.body
        };

        const item: IItemDomain = await this.controller.update(data);

        void await this.responder.send(item, req, res, StatusCode.HTTP_CREATED, new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
    }

    @httpDelete('/:id', void AuthorizeExpressMiddleware(Permissions.ITEMS_DELETE))
    public async remove(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const data = {
            id: req.params.id
        };

        const item: IItemDomain = await this.controller.remove(data);

        void await this.responder.send(item, req, res, StatusCode.HTTP_OK, new ItemTransformer());
    }
}

export default ItemExpressHandler;
