import { NextFunction, Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpDelete, httpGet, httpPost, httpPut, next, request, response } from 'inversify-express-utils';
import { IPaginator, StatusCode } from '@digichanges/shared-experience';

import { TYPES } from '../../../../Config/Injects/types';
import Responder from '../../../../App/Presentation/Shared/Express/Responder';
import AuthorizeMiddleware from '../../../../Auth/Presentation/Middlewares/Express/AuthorizeMiddleware';
import Permissions from '../../../../Config/Permissions';

import ItemTransformer from '../../Transformers/ItemTransformer';
import ItemRepRequest from '../../Requests/ItemRepRequest';
import IdRequest from '../../../../App/Presentation/Requests/IdRequest';
import ItemRequestCriteria from '../../Requests/ItemRequestCriteria';
import ItemUpdateRequest from '../../Requests/ItemUpdateRequest';
import IItemDomain from '../../../Domain/Entities/IItemDomain';

import ItemController from '../../Controllers/ItemController';
import { AuthUser } from '../../../../Auth/Presentation/Helpers/AuthUser';
import ResponseMessageEnum from '../../../../App/Domain/Enum/ResponseMessageEnum';
import DefaultMessageTransformer from '../../../../App/Presentation/Transformers/DefaultMessageTransformer';
import DataResponseMessage from '../../../../App/Presentation/Transformers/Response/DataResponseMessage';

@controller('/api/items')
class ItemHandler
{
    @inject(TYPES.Responder)
    private responder: Responder;
    private readonly controller: ItemController;

    constructor()
    {
        this.controller = new ItemController();
    }

    @httpPost('/', AuthorizeMiddleware(Permissions.ITEMS_SAVE))
    public async save(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new ItemRepRequest(req.body);

        const item: IItemDomain = await this.controller.save(_request, AuthUser(req));

        const responseData = new DataResponseMessage(item.getId(), ResponseMessageEnum.CREATED);

        void await this.responder.send(responseData, req, res, StatusCode.HTTP_CREATED, new DefaultMessageTransformer());
    }

    @httpGet('/', AuthorizeMiddleware(Permissions.ITEMS_LIST))
    public async list(@request() req: Request, @response() res: Response)
    {
        const _request = new ItemRequestCriteria(req.query, req.url);

        const paginator: IPaginator = await this.controller.list(_request);

        await this.responder.paginate(paginator, req, res, StatusCode.HTTP_OK, new ItemTransformer());
    }

    @httpGet('/:id', AuthorizeMiddleware(Permissions.ITEMS_SHOW))
    public async getOne(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new IdRequest({ id: req.params.id });

        const item: IItemDomain = await this.controller.getOne(_request);

        void await this.responder.send(item, req, res, StatusCode.HTTP_OK, new ItemTransformer());
    }

    @httpPut('/:id', AuthorizeMiddleware(Permissions.ITEMS_UPDATE))
    public async update(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new ItemUpdateRequest(req.body, req.params.id);

        const item: IItemDomain = await this.controller.update(_request, AuthUser(req));
        const responseData = new DataResponseMessage(item.getId(), ResponseMessageEnum.UPDATED);
        void await this.responder.send(responseData, req, res, StatusCode.HTTP_CREATED, new DefaultMessageTransformer());
    }

    @httpDelete('/:id', AuthorizeMiddleware(Permissions.ITEMS_DELETE))
    public async remove(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new IdRequest({ id: req.params.id });

        const item: IItemDomain = await this.controller.remove(_request);

        void await this.responder.send(item, req, res, StatusCode.HTTP_OK, new ItemTransformer());
    }
}

export default ItemHandler;
