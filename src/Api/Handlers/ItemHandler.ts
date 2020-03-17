import { Request, Response } from 'express';
import { inject } from 'inversify'
import { controller, httpGet, httpPost, request, response } from 'inversify-express-utils';
import ItemService from '../../Services/ItemService';
import ItemRequest from '../Requests/ItemRequest';
import Responder from "../../Lib/Responder";
import ItemTransformer from "../Transformers/Items/ItemTransformer";
import StatusCode from "../../Lib/StatusCode";
import { TYPES } from "../../types";

@controller('/items')
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
    public async save (@request() request: Request, @response() response: Response)
    {
        const itemRequest = new ItemRequest(request);
        const item = await this.service.save(itemRequest);

        this.responder.send(item, response, StatusCode.HTTP_CREATED, new ItemTransformer());
    }

    @httpGet('/')
    public async list (@request() request: Request, @response() response: Response)
    {
        const itemRequest = new ItemRequest(request);
        const items = await this.service.list(itemRequest);

        this.responder.send(items, response, StatusCode.HTTP_OK, new ItemTransformer());
    }

    // @httpGet('/:id')
    // public async getOne  (@request() request: Request, @response() res: Response)
    // {
    //     const id = request.params.id;
    //     const item = await this.repository.findOne(id);
    //     if (item) {
    //         response.send(item);
    //     } else {
    //         // next(new ItemNotFoundException(id));
    //     }
    // }
}

export default ItemHandler;

//
// private modifyPost = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
//     const id = request.params.id;
//     const postData: Post = request.body;
//     await this.postRepository.update(id, postData);
//     const updatedPost = await this.postRepository.findOne(id);
//     if (updatedPost) {
//         response.send(updatedPost);
//     } else {
//         next(new PostNotFoundException(id));
//     }
// }
//
// private deletePost = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
//     const id = request.params.id;
//     const deleteResponse = await this.postRepository.delete(id);
//     if (deleteResponse.raw[1]) {
//         response.sendStatus(200);
//     } else {
//         next(new PostNotFoundException(id));
//     }
// }