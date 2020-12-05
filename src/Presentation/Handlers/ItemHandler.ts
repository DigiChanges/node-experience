import {NextFunction, Request, Response} from 'express';
import {controller, httpDelete, httpGet, httpPost, httpPut, request, response, next} from 'inversify-express-utils';
import { TYPES } from "../../types";
import {lazyInject} from "../../inversify.config";
import Responder from "../Shared/Responder";
import StatusCode from "../Shared/StatusCode";
import AuthorizeMiddleware from "../Middlewares/AuthorizeMiddleware";
import Permissions from "../../../config/Permissions";

import ItemTransformer from "../Transformers/Items/ItemTransformer";
import ItemRepRequest from "../Requests/Handler/Items/ItemRepRequest";
import IdRequest from "../Requests/Handler/Defaults/IdRequest";
import ItemRequestCriteria from "../Requests/Handler/Items/ItemRequestCriteria";
import ItemUpdateRequest from "../Requests/Handler/Items/ItemUpdateRequest";
import IItemDomain from "../../InterfaceAdapters/IDomain/IItemDomain";

import SaveItemUseCase from "../../Domain/UseCases/Item/SaveItemUseCase";
import ListItemsUseCase from "../../Domain/UseCases/Item/ListItemsUseCase";
import IPaginator from "../../InterfaceAdapters/Shared/IPaginator";
import GetItemUseCase from "../../Domain/UseCases/Item/GetItemUseCase";
import RemoveItemUseCase from "../../Domain/UseCases/Item/RemoveItemUseCase";
import UpdateItemUseCase from "../../Domain/UseCases/Item/UpdateItemUseCase";
import ValidatorRequest from "../../Application/Shared/ValidatorRequest";

@controller('/api/items')
class ItemHandler
{
    @lazyInject(TYPES.Responder)
    private responder: Responder;

    @httpPost('/', AuthorizeMiddleware(Permissions.ITEMS_SAVE))
    public async save (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new ItemRepRequest(req);
        await ValidatorRequest.handle(_request);

        const saveItemUseCase = new SaveItemUseCase();
        const item: IItemDomain = await saveItemUseCase.handle(_request);

        this.responder.send(item, req, res, StatusCode.HTTP_CREATED, new ItemTransformer());
    }

    @httpGet('/', AuthorizeMiddleware(Permissions.ITEMS_LIST))
    public async list (@request() req: Request, @response() res: Response)
    {
        const _request = new ItemRequestCriteria(req);
        await ValidatorRequest.handle(_request);

        const listItemsUseCase = new ListItemsUseCase();
        const paginator: IPaginator = await listItemsUseCase.handle(_request);

        await this.responder.paginate(paginator, req, res, StatusCode.HTTP_OK, new ItemTransformer());
    }

    @httpGet('/:id', AuthorizeMiddleware(Permissions.ITEMS_SHOW))
    public async getOne  (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new IdRequest(req);
        await ValidatorRequest.handle(_request);

        const getItemUseCase = new GetItemUseCase();
        const item: IItemDomain = await getItemUseCase.handle(_request);

        this.responder.send(item, req, res, StatusCode.HTTP_OK, new ItemTransformer());
    }

    @httpPut('/:id', AuthorizeMiddleware(Permissions.ITEMS_UPDATE))
    public async update (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new ItemUpdateRequest(req);
        await ValidatorRequest.handle(_request);

        const updateItemUseCase = new UpdateItemUseCase();
        const item: IItemDomain = await updateItemUseCase.handle(_request);

        this.responder.send(item, req, res, StatusCode.HTTP_OK, new ItemTransformer());
    }

    @httpDelete('/:id', AuthorizeMiddleware(Permissions.ITEMS_DELETE))
    public async remove (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new IdRequest(req);
        await ValidatorRequest.handle(_request);

        const removeItemUseCase = new RemoveItemUseCase();
        const item: IItemDomain = await removeItemUseCase.handle(_request);

        this.responder.send(item, req, res, StatusCode.HTTP_OK, new ItemTransformer());
    }
}

export default ItemHandler;
