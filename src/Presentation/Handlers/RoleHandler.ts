import {NextFunction, Request, Response} from 'express';
import {controller, httpDelete, httpGet, httpPost, httpPut, request, response, next} from 'inversify-express-utils';

import StatusCode from "../Shared/StatusCode";
import { TYPES } from "../../types";
import Responder from "../Shared/Responder";
import RoleTransformer from "../Transformers/Roles/RoleTransformer";
import RoleRepRequest from "../Requests/Roles/RoleRepRequest";
import IdRequest from "../Requests/Defaults/IdRequest";
import RoleRequestCriteria from "../Requests/Roles/RoleRequestCriteria";
import RoleUpdateRequest from "../Requests/Roles/RoleUpdateRequest";
import ValidatorRules from "../Middlewares/ValidatorRules";
import AuthorizeMiddleware from "../Middlewares/AuthorizeMiddleware";
import Permissions from "../../../config/Permissions";
import IRole from "../../InterfaceAdapters/IEntities/IRole";

import SaveRoleUseCase from "../../Domain/UseCases/Role/SaveRoleUseCase";
import ListRolesUseCase from "../../Domain/UseCases/Role/ListRolesUseCase";
import GetRoleUseCase from "../../Domain/UseCases/Role/GetRoleUseCase";
import RemoveRoleUseCase from "../../Domain/UseCases/Role/RemoveRoleUseCase";
import IPaginator from "../../InterfaceAdapters/Shared/IPaginator";
import {lazyInject} from "../../inversify.config";

@controller('/api/roles')
class RoleHandler
{
    @lazyInject(TYPES.Responder)
    private responder: Responder;

    @httpPost('/', ...RoleRepRequest.validate(), ValidatorRules, AuthorizeMiddleware(Permissions.ROLES_SAVE))
    public async save (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new RoleRepRequest(req);
        const saveRoleUseCase = new SaveRoleUseCase();

        const role: IRole = await saveRoleUseCase.handle(_request);

        this.responder.send(role, res, StatusCode.HTTP_CREATED, new RoleTransformer());
    }

    @httpGet('/', AuthorizeMiddleware(Permissions.ROLES_LIST))
    public async list (@request() req: Request, @response() res: Response)
    {
        const _request = new RoleRequestCriteria(req);
        const listRolesUseCase = new ListRolesUseCase();

        const paginator: IPaginator = await listRolesUseCase.handle(_request);

        await this.responder.paginate(paginator, res, StatusCode.HTTP_OK, new RoleTransformer());
    }

    @httpGet('/:id', ...IdRequest.validate(), ValidatorRules, AuthorizeMiddleware(Permissions.ROLES_SHOW))
    public async getOne  (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new IdRequest(req);
        const getRoleUseCase = new GetRoleUseCase();

        const role: IRole = await getRoleUseCase.handle(_request);

        this.responder.send(role, res, StatusCode.HTTP_OK, new RoleTransformer());
    }

    @httpPut('/:id', ...RoleUpdateRequest.validate(), ValidatorRules, AuthorizeMiddleware(Permissions.ROLES_UPDATE))
    public async update (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new RoleUpdateRequest(req);
        const getRoleUseCase = new GetRoleUseCase();

        const role: IRole = await getRoleUseCase.handle(_request);

        this.responder.send(role, res, StatusCode.HTTP_OK, new RoleTransformer());
    }

    @httpDelete('/:id', ...IdRequest.validate(), ValidatorRules, AuthorizeMiddleware(Permissions.ROLES_DELETE))
    public async remove (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new IdRequest(req);
        const removeRoleUseCase = new RemoveRoleUseCase();

        const data = await removeRoleUseCase.handle(_request);

        this.responder.send(data, res, StatusCode.HTTP_OK);
    }
}

export default RoleHandler;
