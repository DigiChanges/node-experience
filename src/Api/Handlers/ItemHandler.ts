import {NextFunction, Request, Response} from 'express';
import { inject } from 'inversify'
import StatusCode from "../../Lib/StatusCode";
import { TYPES } from "../../types";
import Responder from "../../Lib/Responder";
import ItemTransformer from "../Transformers/Items/ItemTransformer";
import ItemRepRequest from "../Requests/Items/ItemRepRequest";
import IdRequest from "../Requests/Defaults/IdRequest";
import ItemRequestCriteria from "../Requests/Items/ItemRequestCriteria";
import ItemUpdateRequest from "../Requests/Items/ItemUpdateRequest";
import ItemService from '../../Services/ItemService';
import {controller, httpDelete, httpGet, httpPost, httpPut, request, response, next} from 'inversify-express-utils';
import ValidatorRules from "../../Middlewares/ValidatorRules";
import AuthorizeMiddleware from "../../Middlewares/AuthorizeMiddleware";
import Permissions from "../Libs/Permissions";

@controller('/api/items')
class ItemHandler
{
    private service: ItemService;
    private responder: Responder;

    constructor(@inject(ItemService) service: ItemService, @inject(TYPES.Responder) responder: Responder)
    {
        this.service = service;
        this.responder = responder;
    }

    @httpPost('/', ...ItemRepRequest.validate(), ValidatorRules, AuthorizeMiddleware(Permissions.ITEMS_SAVE))
    public async save (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const itemRepRequest = new ItemRepRequest(req);
        const item = await this.service.save(itemRepRequest);

        this.responder.send(item, res, StatusCode.HTTP_CREATED, new ItemTransformer());
    }

    @httpGet('/', AuthorizeMiddleware(Permissions.ITEMS_LIST))
    public async list (@request() req: Request, @response() res: Response)
    {
        const itemRequest = new ItemRequestCriteria(req);
        const paginator = await this.service.list(itemRequest);

        await this.responder.paginate(paginator, res, StatusCode.HTTP_OK, new ItemTransformer());
    }

    @httpGet('/:id', ...IdRequest.validate(), ValidatorRules, AuthorizeMiddleware(Permissions.ITEMS_SHOW))
    public async getOne  (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const itemRequestShow = new IdRequest(req);
        const item = await this.service.getOne(itemRequestShow);

        this.responder.send(item, res, StatusCode.HTTP_OK, new ItemTransformer());
    }

    @httpPut('/:id', ...ItemUpdateRequest.validate(), ValidatorRules, AuthorizeMiddleware(Permissions.ITEMS_UPDATE))
    public async update (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const itemRequest = new ItemUpdateRequest(req);
        const item = await this.service.update(itemRequest);

        this.responder.send(item, res, StatusCode.HTTP_OK, new ItemTransformer());
    }

    @httpDelete('/:id', ...IdRequest.validate(), ValidatorRules, AuthorizeMiddleware(Permissions.ITEMS_DELETE))
    public async remove (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const itemRequest = new IdRequest(req);
        const item = await this.service.remove(itemRequest);

        this.responder.send(item, res, StatusCode.HTTP_OK);
    }
}

export default ItemHandler;
