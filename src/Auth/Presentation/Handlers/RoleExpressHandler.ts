import { NextFunction, Request, Response } from 'express';
import { controller, httpDelete, httpGet, httpPost, httpPut, request, response, next } from 'inversify-express-utils';
import MainConfig, { IHttpStatusCode } from '../../../Config/MainConfig';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';

import ExpressResponder from '../../../Shared/Application/Http/ExpressResponder';
import RoleTransformer from '../Transformers/RoleTransformer';
import AuthorizeExpressMiddleware from '../Middlewares/AuthorizeExpressMiddleware';
import Permissions from '../../../Config/Permissions';

import IRoleDomain from '../../Domain/Entities/IRoleDomain';
import RoleController from '../Controllers/RoleController';
import ResponseMessageEnum from '../../../Shared/Domain/Enum/ResponseMessageEnum';
import DefaultMessageTransformer from '../../../Shared/Presentation/Transformers/DefaultMessageTransformer';
import RoleRepPayload from '../../Domain/Payloads/Role/RoleRepPayload';
import CriteriaPayload from '../../../Shared/Presentation/Validations/CriteriaPayload';

@controller('/api/roles')
class RoleExpressHandler
{
    private responder: ExpressResponder;
    private readonly controller: RoleController;
    private config: Record<string, IHttpStatusCode>;

    constructor()
    {
        this.responder = new ExpressResponder();
        this.controller = new RoleController();
        this.config = MainConfig.getInstance().getConfig().statusCode;
    }

    @httpPost('/', void AuthorizeExpressMiddleware(Permissions.ROLES_SAVE))
    public async save(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const role: IRoleDomain = await this.controller.save(req.body as RoleRepPayload);

        void await this.responder.send(role, req, res, this.config['HTTP_CREATED'], new DefaultMessageTransformer(ResponseMessageEnum.CREATED));
    }

    @httpGet('/', void AuthorizeExpressMiddleware(Permissions.ROLES_LIST))
    public async list(@request() req: Request, @response() res: Response)
    {
        const data: CriteriaPayload = {
            url: req.url,
            query: req.query
        };

        const paginator: IPaginator = await this.controller.list(data);

        await this.responder.paginate(paginator, req, res, this.config['HTTP_OK'], new RoleTransformer());
    }

    @httpGet('/:id', void AuthorizeExpressMiddleware(Permissions.ROLES_SHOW))
    public async get_one(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const data = {
            id: req.params.id
        };

        const role: IRoleDomain = await this.controller.getOne(data);

        void await this.responder.send(role, req, res, this.config['HTTP_OK'], new RoleTransformer());
    }

    @httpPut('/:id', void AuthorizeExpressMiddleware(Permissions.ROLES_UPDATE))
    public async update(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const data = {
            id: req.params.id,
            ...req.body
        };

        const role: IRoleDomain = await this.controller.update(data);

        void await this.responder.send(role, req, res, this.config['HTTP_CREATED'], new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
    }

    @httpDelete('/:id', void AuthorizeExpressMiddleware(Permissions.ROLES_DELETE))
    public async remove(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const data = {
            id: req.params.id
        };

        const role: IRoleDomain = await this.controller.remove(data);

        void await this.responder.send(role, req, res, this.config['HTTP_CREATED'], new RoleTransformer());
    }
}

export default RoleExpressHandler;
