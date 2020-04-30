import {NextFunction, Request, Response} from 'express';
import { inject } from 'inversify'
import StatusCode from "../../Lib/StatusCode";
import { TYPES } from "../../types";
import Responder from "../../Lib/Responder";
import UserTransformer from "../Transformers/Users/UserTransformer";
import UserRepRequest from "../Requests/Users/UserRepRequest";
import IdRequest from "../Requests/Defaults/IdRequest";
import UserRequestCriteria from "../Requests/Users/UserRequestCriteria";
import UserUpdateRequest from "../Requests/Users/UserUpdateRequest";
import {controller, httpDelete, httpGet, httpPost, httpPut, request, response, next} from 'inversify-express-utils';
import ValidatorRules from "../../Middlewares/ValidatorRules";
import UserAssignRoleRequest from "../Requests/Users/UserAssignRoleRequest";
import AuthorizeMiddleware from "../../Middlewares/AuthorizeMiddleware";
import Permissions from "../Libs/Permissions";
import {SERVICES} from "../../services";
import IUserService from "../../Services/Contracts/IUserService";

@controller('/api/users')
class UserHandler
{
    private service: IUserService;
    private responder: Responder;

    constructor(@inject(SERVICES.IUserService) service: IUserService, @inject(TYPES.Responder) responder: Responder)
    {
        this.service = service;
        this.responder = responder;
    }

    @httpPost('/', ...UserRepRequest.validate(), ValidatorRules, AuthorizeMiddleware(Permissions.USERS_SAVE))
    public async save (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const userRepRequest = new UserRepRequest(req);
        const user = await this.service.save(userRepRequest);

        this.responder.send(user, res, StatusCode.HTTP_CREATED, new UserTransformer());
    }

    @httpGet('/', AuthorizeMiddleware(Permissions.USERS_LIST))
    public async list (@request() req: Request, @response() res: Response)
    {
        const userRequest = new UserRequestCriteria(req);
        const paginator = await this.service.list(userRequest);

        await this.responder.paginate(paginator, res, StatusCode.HTTP_OK, new UserTransformer());
    }

    @httpGet('/:id', ...IdRequest.validate(), ValidatorRules, AuthorizeMiddleware(Permissions.USERS_SHOW))
    public async getOne  (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const UserRequestShow = new IdRequest(req);
        const user = await this.service.getOne(UserRequestShow);

        this.responder.send(user, res, StatusCode.HTTP_OK, new UserTransformer());
    }

    @httpPut('/:id', ...UserUpdateRequest.validate(), ValidatorRules, AuthorizeMiddleware(Permissions.USERS_UPDATE))
    public async update (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const userRequest = new UserUpdateRequest(req);
        const user = await this.service.update(userRequest);

        this.responder.send(user, res, StatusCode.HTTP_OK, new UserTransformer());
    }

    @httpPut('/assignRole/:id', ...UserAssignRoleRequest.validate(), ValidatorRules, AuthorizeMiddleware(Permissions.USERS_ASSIGN_ROLE))
    public async assignRole (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const userRequest = new UserAssignRoleRequest(req);

        const user = await this.service.assignRole(userRequest);

        this.responder.send(user, res, StatusCode.HTTP_OK, new UserTransformer());
    }

    @httpDelete('/:id', ...IdRequest.validate(), ValidatorRules, AuthorizeMiddleware(Permissions.USERS_DELETE))
    public async remove (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const userRequest = new IdRequest(req);
        const user = await this.service.remove(userRequest);

        this.responder.send(user, res, StatusCode.HTTP_OK);
    }
}

export default UserHandler;
