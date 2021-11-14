import { inject } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { controller, httpDelete, httpGet, httpPost, httpPut, request, response, next } from 'inversify-express-utils';
import { IPaginator, StatusCode } from '@digichanges/shared-experience';

import { TYPES } from '../../../../types';
import Responder from '../../../../App/Presentation/Shared/Express/Responder';
import RoleTransformer from '../../Transformers/RoleTransformer';
import RoleRepRequest from '../../Requests/RoleRepRequest';
import IdRequest from '../../../../App/Presentation/Requests/IdRequest';
import RoleRequestCriteria from '../../Requests/RoleRequestCriteria';
import RoleUpdateRequest from '../../Requests/RoleUpdateRequest';
import AuthorizeMiddleware from '../../../../Auth/Presentation/Middlewares/Express/AuthorizeMiddleware';
import Permissions from '../../../../Config/Permissions';

import IRoleDomain from '../../../InterfaceAdapters/IRoleDomain';
import RoleController from '../../Controllers/RoleController';

@controller('/api/roles')
class RoleHandler
{
    @inject(TYPES.Responder)
    private responder: Responder;
    private readonly controller: RoleController;

    constructor()
    {
        this.controller = new RoleController();
    }

    @httpPost('/', AuthorizeMiddleware(Permissions.ROLES_SAVE))
    public async save(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new RoleRepRequest(req.body);

        const role: IRoleDomain = await this.controller.save(_request);

        this.responder.send(role, req, res, StatusCode.HTTP_CREATED, new RoleTransformer());
    }

    @httpGet('/', AuthorizeMiddleware(Permissions.ROLES_LIST))
    public async list(@request() req: Request, @response() res: Response)
    {
        const _request = new RoleRequestCriteria(req.query, req.url);

        const paginator: IPaginator = await this.controller.list(_request);

        await this.responder.paginate(paginator, req, res, StatusCode.HTTP_OK, new RoleTransformer());
    }

    @httpGet('/:id', AuthorizeMiddleware(Permissions.ROLES_SHOW))
    public async get_one(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new IdRequest(req.params.id);

        const role: IRoleDomain = await this.controller.getOne(_request);

        this.responder.send(role, req, res, StatusCode.HTTP_OK, new RoleTransformer());
    }

    @httpPut('/:id', AuthorizeMiddleware(Permissions.ROLES_UPDATE))
    public async update(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new RoleUpdateRequest(req.body, req.params.id);

        const role: IRoleDomain = await this.controller.update(_request);

        this.responder.send(role, req, res, StatusCode.HTTP_CREATED, new RoleTransformer());
    }

    @httpDelete('/:id', AuthorizeMiddleware(Permissions.ROLES_DELETE))
    public async remove(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new IdRequest(req.params.id);

        const data = await this.controller.remove(_request);

        this.responder.send(data, req, res, StatusCode.HTTP_CREATED, new RoleTransformer());
    }
}

export default RoleHandler;
