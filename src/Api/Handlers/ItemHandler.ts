import { Request, Response } from 'express';
import { inject } from 'inversify'
import {controller, httpDelete, httpGet, httpPost, httpPut, request, response} from 'inversify-express-utils';
import ItemService from '../../Services/ItemService';
import Responder from "../../Lib/Responder";
import ItemTransformer from "../Transformers/Items/ItemTransformer";
import StatusCode from "../../Lib/StatusCode";
import { TYPES } from "../../types";
import ItemRepRequest from "../Requests/Items/ItemRepRequest";
import IdRequest from "../Requests/Defaults/IdRequest";
import ItemRequestCriteria from "../Requests/Items/ItemRequestCriteria";
import ItemUpdateRequest from "../Requests/Items/ItemUpdateRequest";
import ItemRemoveRequest from "../Requests/Items/ItemRemoveRequest";

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

    @httpPost('/')
    public async save (@request() req: Request, @response() res: Response)
    {
        const itemRepRequest = new ItemRepRequest(req);
        const item = await this.service.save(itemRepRequest);

        this.responder.send(item, res, StatusCode.HTTP_CREATED, new ItemTransformer());
    }

    @httpGet('/')
    public async list (@request() req: Request, @response() res: Response)
    {
        const itemRequest = new ItemRequestCriteria(req);
        const items = await this.service.list(itemRequest);

        this.responder.send(items, res, StatusCode.HTTP_OK, new ItemTransformer());
    }

    @httpGet('/:id')
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

    @httpPut('/:id')
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

    @httpDelete('/:id')
    public async remove (@request() req: Request, @response() res: Response/*, next: express.NextFunction*/)
    {
        const itemRequest = new ItemRemoveRequest(req);
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
