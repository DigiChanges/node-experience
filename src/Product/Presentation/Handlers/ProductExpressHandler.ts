import { NextFunction, Request, Response } from 'express';
import { controller, httpDelete, httpGet, httpPost, httpPut, request, response, next } from 'inversify-express-utils';
import StatusCode from '../../../Shared/Application/StatusCode';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';

import ExpressResponder from '../../../Shared/Application/Http/ExpressResponder';
import ProductTransformer from '../Transformers/ProductTransformer';
import ProductRepRequest from '../Requests/Product/ProductRepRequest';
import IdRequest from '../../../Shared/Presentation/Requests/IdRequest';
import ProductRequestCriteria from '../Requests/Product/ProductRequestCriteria';
import ProductUpdateRequest from '../Requests/Product/ProductUpdateRequest';
import AuthorizeExpressMiddleware from '../../../Auth/Presentation/Middlewares/AuthorizeExpressMiddleware';
import Permissions from '../../../Config/Permissions';

import IProductDomain from '../../Domain/Entities/IProductDomain';
import ProductController from '../Controllers/ProductController';
import ResponseMessageEnum from '../../../Shared/Domain/Enum/ResponseMessageEnum';
import DefaultMessageTransformer from '../../../Shared/Presentation/Transformers/DefaultMessageTransformer';

@controller('/api/products')
class ProductExpressHandler
{
    private responder: ExpressResponder;
    private readonly controller: ProductController;

    constructor()
    {
        this.responder = new ExpressResponder();
        this.controller = new ProductController();
    }

    @httpPost('/', void AuthorizeExpressMiddleware(Permissions.ROLES_SAVE))
    public async save(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new ProductRepRequest(req.body);

        const product: IProductDomain = await this.controller.save(_request);

        void await this.responder.send(product, req, res, StatusCode.HTTP_CREATED, new DefaultMessageTransformer(ResponseMessageEnum.CREATED));
    }

    @httpGet('/', void AuthorizeExpressMiddleware(Permissions.ROLES_LIST))
    public async list(@request() req: Request, @response() res: Response)
    {
        const _request = new ProductRequestCriteria(req.query, req.url);

        const paginator: IPaginator = await this.controller.list(_request);

        await this.responder.paginate(paginator, req, res, StatusCode.HTTP_OK, new ProductTransformer());
    }

    @httpGet('/:id', void AuthorizeExpressMiddleware(Permissions.ROLES_SHOW))
    public async get_one(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new IdRequest({ id: req.params.id });

        const product: IProductDomain = await this.controller.getOne(_request);

        void await this.responder.send(product, req, res, StatusCode.HTTP_OK, new ProductTransformer());
    }

    @httpPut('/:id', void AuthorizeExpressMiddleware(Permissions.ROLES_UPDATE))
    public async update(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const data = {
            id: req.params.id,
            ...req.body
        };

        const _request = new ProductUpdateRequest(data);

        const product: IProductDomain = await this.controller.update(_request);

        void await this.responder.send(product, req, res, StatusCode.HTTP_CREATED, new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
    }

    @httpDelete('/:id', void AuthorizeExpressMiddleware(Permissions.ROLES_DELETE))
    public async remove(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new IdRequest({ id: req.params.id });

        const data = await this.controller.remove(_request);

        void await this.responder.send(data, req, res, StatusCode.HTTP_CREATED, new ProductTransformer());
    }
}

export default ProductExpressHandler;
