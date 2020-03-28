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

    @httpPost('/', ...ItemRepRequest.validate(), ValidatorRules)
    public async save (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const itemRepRequest = new ItemRepRequest(req);
        const item = await this.service.save(itemRepRequest);

        this.responder.send(item, res, StatusCode.HTTP_CREATED, new ItemTransformer());
    }

    @httpGet('/', ...ItemRequestCriteria.validate(), ValidatorRules)
    public async list (@request() req: Request, @response() res: Response)
    {
        const itemRequest = new ItemRequestCriteria(req);
        const items = await this.service.list(itemRequest);

        this.responder.send(items, res, StatusCode.HTTP_OK, new ItemTransformer());
    }

    @httpGet('/:id', ...IdRequest.validate(), ValidatorRules)
    public async getOne  (@request() req: Request, @response() res: Response/*, next: express.NextFunction*/)
    {
        const itemRequestShow = new IdRequest(req);
        const item = await this.service.getOne(itemRequestShow);

        // if (item) {
            // response.send(item);
        // } else {
            // next(new ItemNotFoundException(id));
        // }

        this.responder.send(item, res, StatusCode.HTTP_OK, new ItemTransformer());
    }

    @httpPut('/:id', ...ItemUpdateRequest.validate(), ValidatorRules)
    public async update (@request() req: Request, @response() res: Response/*, next: express.NextFunction*/)
    {
        const itemRequest = new ItemUpdateRequest(req);
        const item = await this.service.update(itemRequest);

        // if (updatedPost) {
        //     response.send(updatedPost);
        // } else {
        //     next(new PostNotFoundException(id));
        // }

        this.responder.send(item, res, StatusCode.HTTP_OK, new ItemTransformer());
    }

    @httpDelete('/:id', ...IdRequest.validate(), ValidatorRules)
    public async remove (@request() req: Request, @response() res: Response/*, next: express.NextFunction*/)
    {
        const itemRequest = new IdRequest(req);
        const item = await this.service.remove(itemRequest);

        // if (deleteResponse.raw[1]) {
        //     response.sendStatus(200);
        // } else {
        //     next(new PostNotFoundException(id));
        // }

        this.responder.send(item, res, StatusCode.HTTP_OK, new ItemTransformer());
    }
}

export default ItemHandler;
