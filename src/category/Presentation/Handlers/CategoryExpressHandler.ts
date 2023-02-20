import { NextFunction, Request, Response } from 'express';
import { controller, httpDelete, httpGet, httpPost, httpPut, next, request, response } from 'inversify-express-utils';
import MainConfig, { IHttpStatusCode } from '../../../Config/MainConfig';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';

import ExpressResponder from '../../../Shared/Application/Http/ExpressResponder';
import AuthorizeExpressMiddleware from '../../../Auth/Presentation/Middlewares/AuthorizeExpressMiddleware';
import Permissions from '../../../Config/Permissions';

import CategoryTransformer from '../Transformers/CategoryTransformer';
import ICategoryDomain from '../../Domain/Entities/CategoryDomain';

import CategoryController from '../Controllers/CategoryController';
import { AuthUser } from '../../../Auth/Presentation/Helpers/AuthUser';
import ResponseMessageEnum from '../../../Shared/Domain/Enum/ResponseMessageEnum';
import DefaultMessageTransformer from '../../../Shared/Presentation/Transformers/DefaultMessageTransformer';

@controller('/api/Categorys')
class CategoryExpressHandler
{
    private responder: ExpressResponder;
    private readonly controller: CategoryController;
    private readonly config: Record<string, IHttpStatusCode>;

    constructor()
    {
        this.responder = new ExpressResponder();
        this.controller = new CategoryController();
        this.config = MainConfig.getInstance().getConfig().statusCode;
    }

    @httpPost('/', void AuthorizeExpressMiddleware(Permissions.CATEGORY_SAVE))
    public async save(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const data = {
            authUser: AuthUser(req),
            ...req.body
        };

        const Category: ICategoryDomain = await this.controller.save(data);

        await this.responder.send(Category, req, res, this.config['HTTP_CREATED'], new DefaultMessageTransformer(ResponseMessageEnum.CREATED));
    }

    @httpGet('/', void AuthorizeExpressMiddleware(Permissions.CATEGORY_LIST))
    public async list(@request() req: Request, @response() res: Response)
    {
        const data = {
            query: req.query,
            url: req.url
        };

        const paginator: IPaginator = await this.controller.list(data);

        await this.responder.paginate(paginator, req, res, this.config['HTTP_OK'], new CategoryTransformer());
    }

    @httpGet('/:id', void AuthorizeExpressMiddleware(Permissions.CATEGORY_SHOW))
    public async getOne(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const data = {
            id: req.params.id
        };

        const Category: ICategoryDomain = await this.controller.getOne(data);

        await this.responder.send(Category, req, res, this.config['HTTP_OK'], new CategoryTransformer());
    }

    @httpPut('/:id', void AuthorizeExpressMiddleware(Permissions.CATEGORY_UPDATE))
    public async update(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const data = {
            id: req.params.id,
            authUser: AuthUser(req),
            ...req.body
        };

        const Category: ICategoryDomain = await this.controller.update(data);

        await this.responder.send(Category, req, res, this.config['HTTP_CREATED'], new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
    }

    @httpDelete('/:id', void AuthorizeExpressMiddleware(Permissions.CATEGORY_DELETE))
    public async remove(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const data = {
            id: req.params.id
        };

        const Category: ICategoryDomain = await this.controller.remove(data);

        await this.responder.send(Category, req, res, this.config['HTTP_OK'], new CategoryTransformer());
    }
}

export default CategoryExpressHandler;
