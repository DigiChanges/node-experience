import { Request, Response } from 'express';
import { inject } from 'inversify'
import {controller, httpGet, httpPost, request, response} from 'inversify-express-utils';
import ItemService from '../../Services/ItemService';
import ItemRequest from '../Requests/ItemRequest';

@controller('/items')
class ItemHandler
{
    private service: ItemService;

    constructor(@inject(ItemService) service: ItemService)
    {
        this.service = service;
    }

    @httpPost('/')
    public async save (@request() req: Request, @response() res: Response)
    {
        const itemRequest = new ItemRequest(req);
        const item = await this.service.save(itemRequest);

        res.send(item);
    }

    @httpGet('/')
    public async list (@request() req: Request, @response() res: Response)
    {
        const itemRequest = new ItemRequest(req);
        const items = await this.service.list(itemRequest);

        res.send(items);
    }

    // @httpGet('/:id')
    // public async getOne  (request: express.Request, response: express.Response, next: express.NextFunction)
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