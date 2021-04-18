import {NextFunction, Request, Response} from 'express';
import {inject} from 'inversify';
import {controller, httpDelete, httpGet, httpPost, httpPut, request, response, next} from 'inversify-express-utils';
import {IPaginator, StatusCode} from '@digichanges/shared-experience';

import {TYPES} from '../../../types';
import Responder from '../../../App/Presentation/Shared/Responder';
import AuthorizeMiddleware from '../../../Auth/Presentation/Middlewares/AuthorizeMiddleware';
import Permissions from '../../../Config/Permissions';

import ItemTransformer from '../Transformers/ItemTransformer';
import ItemRepRequest from '../Requests/ItemRepRequest';
import IdRequest from '../../../App/Presentation/Requests/IdRequest';
import ItemRequestCriteria from '../Requests/ItemRequestCriteria';
import ItemUpdateRequest from '../Requests/ItemUpdateRequest';
import IItemDomain from '../../InterfaceAdapters/IItemDomain';

import SaveItemUseCase from '../../Domain/UseCases/SaveItemUseCase';
import ListItemsUseCase from '../../Domain/UseCases/ListItemsUseCase';
import GetItemUseCase from '../../Domain/UseCases/GetItemUseCase';
import RemoveItemUseCase from '../../Domain/UseCases/RemoveItemUseCase';
import UpdateItemUseCase from '../../Domain/UseCases/UpdateItemUseCase';
import ValidatorRequest from '../../../App/Presentation/Shared/ValidatorRequest';

@controller('/api/items')
class ItemHandler
{
    @inject(TYPES.Responder)
    private responder: Responder;

    @httpPost('/', AuthorizeMiddleware(Permissions.ITEMS_SAVE))
    public async save(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new ItemRepRequest(req);
        await ValidatorRequest.handle(_request);

        const saveItemUseCase = new SaveItemUseCase();
        const item: IItemDomain = await saveItemUseCase.handle(_request);

        this.responder.send(item, req, res, StatusCode.HTTP_CREATED, new ItemTransformer());
    }

    @httpGet('/', AuthorizeMiddleware(Permissions.ITEMS_LIST))
    public async list(@request() req: Request, @response() res: Response)
    {
        const _request = new ItemRequestCriteria(req);
        await ValidatorRequest.handle(_request);

        const listItemsUseCase = new ListItemsUseCase();
        const paginator: IPaginator = await listItemsUseCase.handle(_request);

        await this.responder.paginate(paginator, req, res, StatusCode.HTTP_OK, new ItemTransformer());
    }

    @httpGet('/:id', AuthorizeMiddleware(Permissions.ITEMS_SHOW))
    public async getOne(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new IdRequest(req);
        await ValidatorRequest.handle(_request);

        const getItemUseCase = new GetItemUseCase();
        const item: IItemDomain = await getItemUseCase.handle(_request);

        this.responder.send(item, req, res, StatusCode.HTTP_OK, new ItemTransformer());
    }

    @httpPut('/:id', AuthorizeMiddleware(Permissions.ITEMS_UPDATE))
    public async update(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new ItemUpdateRequest(req);
        await ValidatorRequest.handle(_request);

        const updateItemUseCase = new UpdateItemUseCase();
        const item: IItemDomain = await updateItemUseCase.handle(_request);

        this.responder.send(item, req, res, StatusCode.HTTP_CREATED, new ItemTransformer());
    }

    @httpDelete('/:id', AuthorizeMiddleware(Permissions.ITEMS_DELETE))
    public async remove(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new IdRequest(req);
        await ValidatorRequest.handle(_request);

        const removeItemUseCase = new RemoveItemUseCase();
        const item: IItemDomain = await removeItemUseCase.handle(_request);

        this.responder.send(item, req, res, StatusCode.HTTP_OK, new ItemTransformer());
    }
}

export default ItemHandler;
