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
import ValidatorRules from "../Middlewares/ValidatorRules";
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

        const role: IRoleDomain = await saveRoleUseCase.handle(_request);

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

        const role: any = await getRoleUseCase.handle(_request);

        this.responder.send(role, res, StatusCode.HTTP_OK, new RoleTransformer());
    }

    @httpPut('/:id', ...RoleUpdateRequest.validate(), ValidatorRules, AuthorizeMiddleware(Permissions.ROLES_UPDATE))
    public async update (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new RoleUpdateRequest(req);
        const updateRoleUseCase = new UpdateRoleUseCase();

        const role: any = await updateRoleUseCase.handle(_request);

        this.responder.send(role, res, StatusCode.HTTP_OK, new RoleTransformer());
    }

    @httpDelete('/:id', ...IdRequest.validate(), ValidatorRules, AuthorizeMiddleware(Permissions.ROLES_DELETE))
    public async remove (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new IdRequest(req);
        const removeRoleUseCase = new RemoveRoleUseCase();

        const data = await removeRoleUseCase.handle(_request);

        this.responder.send(data, res, StatusCode.HTTP_OK, new RoleTransformer());
    }
}

export default RoleHandler;
