import { Request, Response } from 'express';
import { controller, httpDelete, httpGet, httpPost, httpPut, request, response } from 'inversify-express-utils';
import { IPaginator, StatusCode } from '@digichanges/shared-experience';

import { inject } from 'inversify';
import { TYPES } from '../../../../types';
import Responder from '../../../../App/Presentation/Shared/Express/Responder';

import AuthorizeMiddleware from '../../../../Auth/Presentation/Middlewares/AuthorizeMiddleware';
import Permissions from '../../../../Config/Permissions';

import UserTransformer from '../../Transformers/UserTransformer';

import IdRequest from '../../../../App/Presentation/Requests/Express/IdRequest';
import UserRequestCriteria from '../../Requests/Express/UserRequestCriteria';
import UserUpdateRequest from '../../Requests/Express/UserUpdateRequest';
import UserAssignRoleRequest from '../../Requests/Express/UserAssignRoleRequest';
import ChangeUserPasswordRequest from '../../Requests/Express/ChangeUserPasswordRequest';
import ChangeMyPasswordRequest from '../../Requests/Express/ChangeMyPasswordRequest';

import IUserDomain from '../../../InterfaceAdapters/IUserDomain';
import UserController from '../../Controllers/UserControllers';
import UserSaveRequest from '../../Requests/Express/UserSaveRequest';
import { AuthUser } from '../../../../Auth/Presentation/Helpers/AuthUser';
import ITokenDecode from '../../../../Shared/InterfaceAdapters/ITokenDecode';

@controller('/api/users')
class UserHandler
{
    @inject(TYPES.Responder)
    private responder: Responder;
    private readonly controller: UserController;

    constructor()
    {
        this.controller = new UserController();
    }

    @httpPost('/', AuthorizeMiddleware(Permissions.USERS_SAVE))
    public async save(@request() req: Request, @response() res: Response): Promise<void>
    {
        const _request = new UserSaveRequest(req.body);

        const user: IUserDomain = await this.controller.save(_request);

        this.responder.send(user, req, res, StatusCode.HTTP_CREATED, new UserTransformer());
    }

    @httpGet('/', AuthorizeMiddleware(Permissions.USERS_LIST))
    public async list(@request() req: Request, @response() res: Response): Promise<void>
    {
        const _request = new UserRequestCriteria(req.query, req.url);

        const paginator: IPaginator = await this.controller.list(_request);

        await this.responder.paginate(paginator, req, res, StatusCode.HTTP_OK, new UserTransformer());
    }

    @httpGet('/:id', AuthorizeMiddleware(Permissions.USERS_SHOW))
    public async get_one(@request() req: Request, @response() res: Response): Promise<void>
    {
        const _request = new IdRequest(req.params.id);

        const user: IUserDomain = await this.controller.get_one(_request);

        this.responder.send(user, req, res, StatusCode.HTTP_OK, new UserTransformer());
    }

    @httpPut('/:id', AuthorizeMiddleware(Permissions.USERS_UPDATE))
    public async update(@request() req: any, @response() res: Response): Promise<void>
    {
        const _request = new UserUpdateRequest(req.body, req.params.id, AuthUser<ITokenDecode>(req, 'tokenDecode').user_id);

        const user: IUserDomain = await this.controller.update(_request);

        this.responder.send(user, req, res, StatusCode.HTTP_CREATED, new UserTransformer());
    }

    @httpPut('/assign-role/:id', AuthorizeMiddleware(Permissions.USERS_ASSIGN_ROLE))
    public async assign_role(@request() req: Request, @response() res: Response): Promise<void>
    {
        const _request = new UserAssignRoleRequest(req.body, req.params.id);

        const _response: IUserDomain = await this.controller.assign_role(_request);

        this.responder.send(_response, req, res, StatusCode.HTTP_CREATED, new UserTransformer());
    }

    @httpDelete('/:id', AuthorizeMiddleware(Permissions.USERS_DELETE))
    public async remove(@request() req: Request, @response() res: Response): Promise<void>
    {
        const _request = new IdRequest(req.params.id);

        const data = await this.controller.remove(_request);

        this.responder.send(data, req, res, StatusCode.HTTP_OK, new UserTransformer());
    }

    @httpPost('/change-my-password', AuthorizeMiddleware(Permissions.USERS_CHANGE_MY_PASSWORD))
    public async change_my_password(@request() req: any, @response() res: Response): Promise<void>
    {
        const _request = new ChangeMyPasswordRequest(req.body, AuthUser<ITokenDecode>(req, 'tokenDecode').user_id);

        const user: IUserDomain = await this.controller.change_my_password(_request);

        this.responder.send(user, req, res, StatusCode.HTTP_CREATED, new UserTransformer());
    }

    @httpPut('/change-user-password/:id', AuthorizeMiddleware(Permissions.USERS_CHANGE_USER_PASSWORD))
    public async change_user_password(@request() req: Request, @response() res: Response): Promise<void>
    {
        const _request = new ChangeUserPasswordRequest(req.body, req.params.id);

        const user: IUserDomain = await this.controller.change_user_password(_request);

        this.responder.send(user, req, res, StatusCode.HTTP_CREATED, new UserTransformer());
    }
}

export default UserHandler;
