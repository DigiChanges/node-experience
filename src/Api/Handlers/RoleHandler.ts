import {NextFunction, Request, Response} from 'express';
import { inject } from 'inversify'
import StatusCode from "../../Lib/StatusCode";
import { TYPES } from "../../types";
import Responder from "../../Lib/Responder";
import RoleTransformer from "../Transformers/Roles/RoleTransformer";
import RoleRepRequest from "../Requests/Roles/RoleRepRequest";
import IdRequest from "../Requests/Defaults/IdRequest";
import RoleRequestCriteria from "../Requests/Roles/RoleRequestCriteria";
import RoleUpdateRequest from "../Requests/Roles/RoleUpdateRequest";
import RoleService from '../../Services/RoleService';
import {controller, httpDelete, httpGet, httpPost, httpPut, request, response, next} from 'inversify-express-utils';
import ValidatorRules from "../../Middlewares/ValidatorRules";

@controller('/api/roles')
class RoleHandler
{
    private service: RoleService;
    private responder: Responder;

    constructor(@inject(RoleService) service: RoleService, @inject(TYPES.Responder) responder: Responder)
    {
        this.service = service;
        this.responder = responder;
    }

    @httpPost('/', ...RoleRepRequest.validate(), ValidatorRules)
    public async save (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const roleRepRequest = new RoleRepRequest(req);
        const role = await this.service.save(roleRepRequest);

        this.responder.send(role, res, StatusCode.HTTP_CREATED, new RoleTransformer());
    }

    @httpGet('/')
    public async list (@request() req: Request, @response() res: Response)
    {
        const roleRequest = new RoleRequestCriteria(req);
        const paginator = await this.service.list(roleRequest);

        await this.responder.paginate(paginator, res, StatusCode.HTTP_OK, new RoleTransformer());
    }

    @httpGet('/:id', ...IdRequest.validate(), ValidatorRules)
    public async getOne  (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const roleRequestShow = new IdRequest(req);
        const role = await this.service.getOne(roleRequestShow);

        this.responder.send(role, res, StatusCode.HTTP_OK, new RoleTransformer());
    }

    @httpPut('/:id', ...RoleUpdateRequest.validate(), ValidatorRules)
    public async update (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const roleRequest = new RoleUpdateRequest(req);
        const role = await this.service.update(roleRequest);

        this.responder.send(role, res, StatusCode.HTTP_OK, new RoleTransformer());
    }

    @httpDelete('/:id', ...IdRequest.validate(), ValidatorRules)
    public async remove (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const roleRequest = new IdRequest(req);
        const role = await this.service.remove(roleRequest);

        this.responder.send(role, res, StatusCode.HTTP_OK);
    }
}

export default RoleHandler;
