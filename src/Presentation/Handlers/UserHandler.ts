import {NextFunction, Request, Response} from 'express';
import {controller, httpDelete, httpGet, httpPost, httpPut, request, response, next} from 'inversify-express-utils';

import {lazyInject} from "../../inversify.config";
import { TYPES } from "../../types";
import {SERVICES} from "../../services";
import StatusCode from "../Shared/StatusCode";
import Responder from "../Shared/Responder";

import ValidatorRules from "../Middlewares/ValidatorRules";
import AuthorizeMiddleware from "../Middlewares/AuthorizeMiddleware";
import Permissions from "../../../config/Permissions";

import UserTransformer from "../Transformers/Users/UserTransformer";

import UserRepRequest from "../Requests/Users/UserRepRequest";
import IdRequest from "../Requests/Defaults/IdRequest";
import UserRequestCriteria from "../Requests/Users/UserRequestCriteria";
import UserUpdateRequest from "../Requests/Users/UserUpdateRequest";
import UserAssignRoleRequest from "../Requests/Users/UserAssignRoleRequest";
import ChangeUserPasswordRequest from "../Requests/Users/ChangeUserPasswordRequest";
import ChangeMyPasswordRequest from "../Requests/Users/ChangeMyPasswordRequest";

import IUser from "../../InterfaceAdapters/IEntities/TypeORM/IUser";
import IPaginator from "../../InterfaceAdapters/Shared/IPaginator";

import GetUserUseCase from "../../Domain/UseCases/User/GetUserUseCase";
import ListUsersUseCase from "../../Domain/UseCases/User/ListUsersUseCase";
import SaveUserUseCase from "../../Domain/UseCases/User/SaveUserUseCase";
import AssignRoleUseCase from "../../Domain/UseCases/User/AssignRoleUseCase";
import RemoveUserUseCase from "../../Domain/UseCases/User/RemoveUserUseCase";
import ChangeMyPasswordUseCase from "../../Domain/UseCases/User/ChangeMyPasswordUseCase";
import ChangeUserPasswordUseCase from "../../Domain/UseCases/User/ChangeUserPasswordUseCase";

@controller('/api/users')
class UserHandler
{
    @lazyInject(TYPES.Responder)
    private responder: Responder;

    @httpPost('/', ...UserRepRequest.validate(), ValidatorRules, AuthorizeMiddleware(Permissions.USERS_SAVE))
    public async save (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new UserRepRequest(req);
        const saveUserUseCase = new SaveUserUseCase();

        const user: any = await saveUserUseCase.handle(_request);

        this.responder.send(user, res, StatusCode.HTTP_CREATED, new UserTransformer());
    }

    @httpGet('/', AuthorizeMiddleware(Permissions.USERS_LIST))
    public async list (@request() req: Request, @response() res: Response)
    {
        const _request = new UserRequestCriteria(req);
        const listUsersUseCase = new ListUsersUseCase();

        const paginator: IPaginator = await listUsersUseCase.handle(_request);

        await this.responder.paginate(paginator, res, StatusCode.HTTP_OK, new UserTransformer());
    }

    @httpGet('/:id', ...IdRequest.validate(), ValidatorRules, AuthorizeMiddleware(Permissions.USERS_SHOW))
    public async getOne  (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new IdRequest(req);
        const getUserUseCase = new GetUserUseCase();

        const user: any = await getUserUseCase.handle(_request);

        this.responder.send(user, res, StatusCode.HTTP_OK, new UserTransformer());
    }

    @httpPut('/:id', ...UserUpdateRequest.validate(), ValidatorRules, AuthorizeMiddleware(Permissions.USERS_UPDATE))
    public async update (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new UserUpdateRequest(req);
        const getUserUseCase = new GetUserUseCase();

        const user: any = await getUserUseCase.handle(_request);

        this.responder.send(user, res, StatusCode.HTTP_OK, new UserTransformer());
    }

    @httpPut('/assignRole/:id', ...UserAssignRoleRequest.validate(), ValidatorRules, AuthorizeMiddleware(Permissions.USERS_ASSIGN_ROLE))
    public async assignRole (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new UserAssignRoleRequest(req);
        const assignRoleUseCase = new AssignRoleUseCase();

        const _response: any = await assignRoleUseCase.handle(_request);

        this.responder.send(_response, res, StatusCode.HTTP_OK, new UserTransformer());
    }

    @httpDelete('/:id', ...IdRequest.validate(), ValidatorRules, AuthorizeMiddleware(Permissions.USERS_DELETE))
    public async remove (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new IdRequest(req);
        const removeUserUseCase = new RemoveUserUseCase();

        const data = await removeUserUseCase.handle(_request);

        this.responder.send(data, res, StatusCode.HTTP_OK);
    }

    @httpPost('/changeMyPassword', ...ChangeMyPasswordRequest.validate(), ValidatorRules, AuthorizeMiddleware(Permissions.USERS_CHANGE_MY_PASSWORD))
    public async changeMyPassword (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new ChangeMyPasswordRequest(req);
        const changeMyPasswordUseCase = new ChangeMyPasswordUseCase();

        const user: any = await changeMyPasswordUseCase.handle(_request);

        this.responder.send(user, res, StatusCode.HTTP_CREATED, new UserTransformer());
    }

    @httpPut('/changeUserPassword/:id', ...ChangeUserPasswordRequest.validate(), ValidatorRules, AuthorizeMiddleware(Permissions.USERS_CHANGE_USER_PASSWORD))
    public async changeUserPassword (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new ChangeUserPasswordRequest(req);
        const changeUserPasswordUseCase = new ChangeUserPasswordUseCase();

        const user: any = await changeUserPasswordUseCase.handle(_request);

        this.responder.send(user, res, StatusCode.HTTP_CREATED, new UserTransformer());
    }
}

export default UserHandler;
