import {NextFunction, Request, Response} from 'express';
import {controller, httpDelete, httpGet, httpPost, httpPut, request, response, next} from 'inversify-express-utils';
import {IPaginator, StatusCode} from '@digichanges/shared-experience';

import {inject} from 'inversify';
import {TYPES} from '../../../types';
import Responder from '../../../App/Presentation/Shared/Responder';

import AuthorizeMiddleware from '../../../Auth/Presentation/Middlewares/AuthorizeMiddleware';
import Permissions from '../../../Config/Permissions';

import UserTransformer from '../Transformers/UserTransformer';

import UserRepRequest from '../Requests/UserRepRequest';
import IdRequest from '../../../App/Presentation/Requests/IdRequest';
import UserRequestCriteria from '../Requests/UserRequestCriteria';
import UserUpdateRequest from '../Requests/UserUpdateRequest';
import UserAssignRoleRequest from '../Requests/UserAssignRoleRequest';
import ChangeUserPasswordRequest from '../Requests/ChangeUserPasswordRequest';
import ChangeMyPasswordRequest from '../Requests/ChangeMyPasswordRequest';

import GetUserUseCase from '../../Domain/UseCases/GetUserUseCase';
import ListUsersUseCase from '../../Domain/UseCases/ListUsersUseCase';
import SaveUserUseCase from '../../Domain/UseCases/SaveUserUseCase';
import AssignRoleUseCase from '../../Domain/UseCases/AssignRoleUseCase';
import RemoveUserUseCase from '../../Domain/UseCases/RemoveUserUseCase';
import ChangeMyPasswordUseCase from '../../Domain/UseCases/ChangeMyPasswordUseCase';
import ChangeUserPasswordUseCase from '../../Domain/UseCases/ChangeUserPasswordUseCase';
import UpdateUserUseCase from '../../Domain/UseCases/UpdateUserUseCase';
import ValidatorRequest from '../../../App/Presentation/Shared/ValidatorRequest';
import IUserDomain from '../../InterfaceAdapters/IUserDomain';

@controller('/api/users')
class UserHandler
{
    @inject(TYPES.Responder)
    private responder: Responder;

    @httpPost('/', AuthorizeMiddleware(Permissions.USERS_SAVE))
    public async save(@request() req: Request, @response() res: Response): Promise<void>
    {
        const _request = new UserRepRequest(req);
        await ValidatorRequest.handle(_request);

        const saveUserUseCase = new SaveUserUseCase();
        const user: IUserDomain = await saveUserUseCase.handle(_request);

        this.responder.send(user, req, res, StatusCode.HTTP_CREATED, new UserTransformer());
    }

    @httpGet('/', AuthorizeMiddleware(Permissions.USERS_LIST))
    public async list(@request() req: Request, @response() res: Response): Promise<void>
    {
        const _request = new UserRequestCriteria(req);
        await ValidatorRequest.handle(_request);

        const listUsersUseCase = new ListUsersUseCase();
        const paginator: IPaginator = await listUsersUseCase.handle(_request);

        await this.responder.paginate(paginator, req, res, StatusCode.HTTP_OK, new UserTransformer());
    }

    @httpGet('/:id', AuthorizeMiddleware(Permissions.USERS_SHOW))
    public async getOne(@request() req: Request, @response() res: Response): Promise<void>
    {
        const _request = new IdRequest(req);
        await ValidatorRequest.handle(_request);

        const getUserUseCase = new GetUserUseCase();
        const user: IUserDomain = await getUserUseCase.handle(_request);

        this.responder.send(user, req, res, StatusCode.HTTP_OK, new UserTransformer());
    }

    @httpPut('/:id', AuthorizeMiddleware(Permissions.USERS_UPDATE))
    public async update(@request() req: Request, @response() res: Response): Promise<void>
    {
        const _request = new UserUpdateRequest(req);
        await ValidatorRequest.handle(_request);

        const getUserUseCase = new UpdateUserUseCase();
        const user: IUserDomain = await getUserUseCase.handle(_request);

        this.responder.send(user, req, res, StatusCode.HTTP_CREATED, new UserTransformer());
    }

    @httpPut('/assignRole/:id', AuthorizeMiddleware(Permissions.USERS_ASSIGN_ROLE))
    public async assignRole(@request() req: Request, @response() res: Response): Promise<void>
    {
        const _request = new UserAssignRoleRequest(req);
        await ValidatorRequest.handle(_request);

        const assignRoleUseCase = new AssignRoleUseCase();
        const _response: IUserDomain = await assignRoleUseCase.handle(_request);

        this.responder.send(_response, req, res, StatusCode.HTTP_CREATED, new UserTransformer());
    }

    @httpDelete('/:id', AuthorizeMiddleware(Permissions.USERS_DELETE))
    public async remove(@request() req: Request, @response() res: Response): Promise<void>
    {
        const _request = new IdRequest(req);
        await ValidatorRequest.handle(_request);

        const removeUserUseCase = new RemoveUserUseCase();
        const data = await removeUserUseCase.handle(_request);

        this.responder.send(data, req, res, StatusCode.HTTP_OK, new UserTransformer());
    }

    @httpPost('/changeMyPassword', AuthorizeMiddleware(Permissions.USERS_CHANGE_MY_PASSWORD))
    public async changeMyPassword(@request() req: Request, @response() res: Response): Promise<void>
    {
        const _request = new ChangeMyPasswordRequest(req);
        await ValidatorRequest.handle(_request);

        const changeMyPasswordUseCase = new ChangeMyPasswordUseCase();
        const user: IUserDomain = await changeMyPasswordUseCase.handle(_request);

        this.responder.send(user, req, res, StatusCode.HTTP_CREATED, new UserTransformer());
    }

    @httpPut('/changeUserPassword/:id', AuthorizeMiddleware(Permissions.USERS_CHANGE_USER_PASSWORD))
    public async changeUserPassword(@request() req: Request, @response() res: Response): Promise<void>
    {
        const _request = new ChangeUserPasswordRequest(req);
        await ValidatorRequest.handle(_request);

        const changeUserPasswordUseCase = new ChangeUserPasswordUseCase();
        const user: IUserDomain = await changeUserPasswordUseCase.handle(_request);

        this.responder.send(user, req, res, StatusCode.HTTP_CREATED, new UserTransformer());
    }
}

export default UserHandler;
