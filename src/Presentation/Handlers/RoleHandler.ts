import {NextFunction, Request, Response} from 'express';
import {controller, httpDelete, httpGet, httpPost, httpPut, request, response, next} from 'inversify-express-utils';

import StatusCode from "../Shared/StatusCode";
import { TYPES } from "../../types";
import Responder from "../Shared/Responder";
import RoleTransformer from "../Transformers/Roles/RoleTransformer";
import RoleRepRequest from "../Requests/Handler/Roles/RoleRepRequest";
import IdRequest from "../Requests/Handler/Defaults/IdRequest";
import RoleRequestCriteria from "../Requests/Handler/Roles/RoleRequestCriteria";
import RoleUpdateRequest from "../Requests/Handler/Roles/RoleUpdateRequest";
import AuthorizeMiddleware from "../Middlewares/AuthorizeMiddleware";
import Permissions from "../../../config/Permissions";

import SaveRoleUseCase from "../../Domain/UseCases/Role/SaveRoleUseCase";
import ListRolesUseCase from "../../Domain/UseCases/Role/ListRolesUseCase";
import GetRoleUseCase from "../../Domain/UseCases/Role/GetRoleUseCase";
import RemoveRoleUseCase from "../../Domain/UseCases/Role/RemoveRoleUseCase";
import IPaginator from "../../InterfaceAdapters/Shared/IPaginator";
import {lazyInject} from "../../inversify.config";
import IRoleDomain from "../../InterfaceAdapters/IDomain/IRoleDomain";
import UpdateRoleUseCase from "../../Domain/UseCases/Role/UpdateRoleUseCase";
import ValidatorRequest from "../../Application/Shared/ValidatorRequest";

@controller('/api/roles')
class RoleHandler
{
    @lazyInject(TYPES.Responder)
    private responder: Responder;

    @httpPost('/', AuthorizeMiddleware(Permissions.ROLES_SAVE))
    public async save (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new RoleRepRequest(req);
        await ValidatorRequest.handle(_request);

        const saveRoleUseCase = new SaveRoleUseCase();
        const role: IRoleDomain = await saveRoleUseCase.handle(_request);

        this.responder.send(role, req, res, StatusCode.HTTP_CREATED, new RoleTransformer());
    }

    @httpGet('/', AuthorizeMiddleware(Permissions.ROLES_LIST))
    public async list (@request() req: Request, @response() res: Response)
    {
        const _request = new RoleRequestCriteria(req);
        await ValidatorRequest.handle(_request);

        const listRolesUseCase = new ListRolesUseCase();
        const paginator: IPaginator = await listRolesUseCase.handle(_request);

        await this.responder.paginate(paginator, req, res, StatusCode.HTTP_OK, new RoleTransformer());
    }

    @httpGet('/:id', AuthorizeMiddleware(Permissions.ROLES_SHOW))
    public async getOne  (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new IdRequest(req);
        await ValidatorRequest.handle(_request);

        const getRoleUseCase = new GetRoleUseCase();
        const role: IRoleDomain = await getRoleUseCase.handle(_request);

        this.responder.send(role, req, res, StatusCode.HTTP_OK, new RoleTransformer());
    }

    @httpPut('/:id', AuthorizeMiddleware(Permissions.ROLES_UPDATE))
    public async update (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new RoleUpdateRequest(req);
        await ValidatorRequest.handle(_request);

        const updateRoleUseCase = new UpdateRoleUseCase();
        const role: IRoleDomain = await updateRoleUseCase.handle(_request);

        this.responder.send(role, req, res, StatusCode.HTTP_OK, new RoleTransformer());
    }

    @httpDelete('/:id', AuthorizeMiddleware(Permissions.ROLES_DELETE))
    public async remove (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new IdRequest(req);
        await ValidatorRequest.handle(_request);

        const removeRoleUseCase = new RemoveRoleUseCase();
        const data = await removeRoleUseCase.handle(_request);

        this.responder.send(data, req, res, StatusCode.HTTP_OK, new RoleTransformer());
    }
}

export default RoleHandler;
