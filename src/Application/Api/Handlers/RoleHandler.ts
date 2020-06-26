import {NextFunction, Request, Response} from 'express';
import { inject } from 'inversify'
import StatusCode from "../../../Lib/StatusCode";
import { TYPES } from "../../../types";
import Responder from "../../../Lib/Responder";
import RoleTransformer from "../Transformers/Roles/RoleTransformer";
import RoleRepRequest from "../Requests/Roles/RoleRepRequest";
import IdRequest from "../Requests/Defaults/IdRequest";
import RoleRequestCriteria from "../Requests/Roles/RoleRequestCriteria";
import RoleUpdateRequest from "../Requests/Roles/RoleUpdateRequest";
import {controller, httpDelete, httpGet, httpPost, httpPut, request, response, next} from 'inversify-express-utils';
import ValidatorRules from "../../Middlewares/ValidatorRules";
import AuthorizeMiddleware from "../../Middlewares/AuthorizeMiddleware";
import Permissions from "../Libs/Permissions";
import {SERVICES} from "../../../services";
import IRoleService from "../../../Domain/Services/Contracts/IRoleService";
import IRole from "../../../Infrastructure/Entities/Contracts/IRole";

@controller('/api/roles')
class RoleHandler
{
    private service: IRoleService;
    private responder: Responder;

    constructor(@inject(SERVICES.IRoleService)service: IRoleService, @inject(TYPES.Responder) responder: Responder)
    {
        this.service = service;
        this.responder = responder;
    }

    @httpPost('/', ...RoleRepRequest.validate(), ValidatorRules, AuthorizeMiddleware(Permissions.ROLES_SAVE))
    public async save (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const roleRepRequest = new RoleRepRequest(req);
        const role: IRole = await this.service.save(roleRepRequest);

        this.responder.send(role, res, StatusCode.HTTP_CREATED, new RoleTransformer());
    }

    @httpGet('/', AuthorizeMiddleware(Permissions.ROLES_LIST))
    public async list (@request() req: Request, @response() res: Response)
    {
        const roleRequest = new RoleRequestCriteria(req);
        const paginator = await this.service.list(roleRequest);

        await this.responder.paginate(paginator, res, StatusCode.HTTP_OK, new RoleTransformer());
    }

    @httpGet('/:id', ...IdRequest.validate(), ValidatorRules, AuthorizeMiddleware(Permissions.ROLES_SHOW))
    public async getOne  (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const roleRequestShow = new IdRequest(req);
        const role: IRole = await this.service.getOne(roleRequestShow);

        this.responder.send(role, res, StatusCode.HTTP_OK, new RoleTransformer());
    }

    @httpPut('/:id', ...RoleUpdateRequest.validate(), ValidatorRules, AuthorizeMiddleware(Permissions.ROLES_UPDATE))
    public async update (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const roleRequest = new RoleUpdateRequest(req);
        const role: IRole = await this.service.update(roleRequest);

        this.responder.send(role, res, StatusCode.HTTP_OK, new RoleTransformer());
    }

    @httpDelete('/:id', ...IdRequest.validate(), ValidatorRules, AuthorizeMiddleware(Permissions.ROLES_DELETE))
    public async remove (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const roleRequest = new IdRequest(req);
        const role: IRole = await this.service.remove(roleRequest);

        this.responder.send(role, res, StatusCode.HTTP_OK);
    }
}

export default RoleHandler;
