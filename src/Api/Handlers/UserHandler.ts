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
import UserService from '../../Services/UserService';
import {controller, httpDelete, httpGet, httpPost, httpPut, request, response, next} from 'inversify-express-utils';
import ValidatorRules from "../../Middlewares/ValidatorRules";

@controller('/api/users')
class UserHandler
{
    private service: UserService;
    private responder: Responder;

    constructor(@inject(UserService) service: UserService, @inject(TYPES.Responder) responder: Responder)
    {
        this.service = service;
        this.responder = responder;
    }

    @httpPost('/', ...UserRepRequest.validate(), ValidatorRules)
    public async save (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const userRepRequest = new UserRepRequest(req);
        const User = await this.service.save(userRepRequest);

        this.responder.send(User, res, StatusCode.HTTP_CREATED, new UserTransformer());
    }

    @httpGet('/')
    public async list (@request() req: Request, @response() res: Response)
    {
        const userRequest = new UserRequestCriteria(req);
        const paginator = await this.service.list(userRequest);

        await this.responder.paginate(paginator, res, StatusCode.HTTP_OK, new UserTransformer());
    }

    @httpGet('/:id', ...IdRequest.validate(), ValidatorRules)
    public async getOne  (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const UserRequestShow = new IdRequest(req);
        const User = await this.service.getOne(UserRequestShow);

        this.responder.send(User, res, StatusCode.HTTP_OK, new UserTransformer());
    }

    @httpPut('/:id', ...UserUpdateRequest.validate(), ValidatorRules)
    public async update (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const userRequest = new UserUpdateRequest(req);
        const User = await this.service.update(userRequest);

        this.responder.send(User, res, StatusCode.HTTP_OK, new UserTransformer());
    }

    @httpDelete('/:id', ...IdRequest.validate(), ValidatorRules)
    public async remove (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const userRequest = new IdRequest(req);
        const User = await this.service.remove(userRequest);

        this.responder.send(User, res, StatusCode.HTTP_OK);
    }
}

export default UserHandler;
