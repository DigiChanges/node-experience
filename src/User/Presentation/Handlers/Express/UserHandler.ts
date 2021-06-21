import {Request, Response} from 'express';
import {controller, httpDelete, httpGet, httpPost, httpPut, request, response, next} from 'inversify-express-utils';
import {IPaginator, StatusCode} from '@digichanges/shared-experience';

import {inject} from 'inversify';
import {TYPES} from '../../../../types';
import Responder from '../../../../App/Presentation/Shared/Responder';

import AuthorizeMiddleware from '../../../../Auth/Presentation/Middlewares/AuthorizeMiddleware';
import Permissions from '../../../../Config/Permissions';

import UserTransformer from '../../Transformers/UserTransformer';

import UserRepRequest from '../../Requests/Express/UserRepRequest';
import IdRequest from '../../../../App/Presentation/Requests/Express/IdRequest';
import UserRequestCriteria from '../../Requests/Express/UserRequestCriteria';
import UserUpdateRequest from '../../Requests/Express/UserUpdateRequest';
import UserAssignRoleRequest from '../../Requests/Express/UserAssignRoleRequest';
import ChangeUserPasswordRequest from '../../Requests/Express/ChangeUserPasswordRequest';
import ChangeMyPasswordRequest from '../../Requests/Express/ChangeMyPasswordRequest';

import IUserDomain from '../../../InterfaceAdapters/IUserDomain';
import UserController from '../../Controllers/UserControllers';

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
        const _request = new UserRepRequest(req);

        const user: IUserDomain = await this.controller.save(_request);

        this.responder.send(user, req, res, StatusCode.HTTP_CREATED, new UserTransformer());
    }

    @httpGet('/', AuthorizeMiddleware(Permissions.USERS_LIST))
    public async list(@request() req: Request, @response() res: Response): Promise<void>
    {
        const _request = new UserRequestCriteria(req);

        const paginator: IPaginator = await this.controller.list(_request);

        await this.responder.paginate(paginator, req, res, StatusCode.HTTP_OK, new UserTransformer());
    }

    @httpGet('/:id', AuthorizeMiddleware(Permissions.USERS_SHOW))
    public async getOne(@request() req: Request, @response() res: Response): Promise<void>
    {
        const _request = new IdRequest(req);

        const user: IUserDomain = await this.controller.getOne(_request);

        this.responder.send(user, req, res, StatusCode.HTTP_OK, new UserTransformer());
    }

    @httpPut('/:id', AuthorizeMiddleware(Permissions.USERS_UPDATE))
    public async update(@request() req: Request, @response() res: Response): Promise<void>
    {
        const _request = new UserUpdateRequest(req);

        const user: IUserDomain = await this.controller.update(_request);

        this.responder.send(user, req, res, StatusCode.HTTP_CREATED, new UserTransformer());
    }

    @httpPut('/assignRole/:id', AuthorizeMiddleware(Permissions.USERS_ASSIGN_ROLE))
    public async assignRole(@request() req: Request, @response() res: Response): Promise<void>
    {
        const _request = new UserAssignRoleRequest(req);

        const _response: IUserDomain = await this.controller.assignRole(_request);

        this.responder.send(_response, req, res, StatusCode.HTTP_CREATED, new UserTransformer());
    }

    @httpDelete('/:id', AuthorizeMiddleware(Permissions.USERS_DELETE))
    public async remove(@request() req: Request, @response() res: Response): Promise<void>
    {
        const _request = new IdRequest(req);

        const data = await this.controller.remove(_request);

        this.responder.send(data, req, res, StatusCode.HTTP_OK, new UserTransformer());
    }

    @httpPost('/changeMyPassword', AuthorizeMiddleware(Permissions.USERS_CHANGE_MY_PASSWORD))
    public async changeMyPassword(@request() req: Request, @response() res: Response): Promise<void>
    {
        const _request = new ChangeMyPasswordRequest(req);

        const user: IUserDomain = await this.controller.changeMyPassword(_request);

        this.responder.send(user, req, res, StatusCode.HTTP_CREATED, new UserTransformer());
    }

    @httpPut('/changeUserPassword/:id', AuthorizeMiddleware(Permissions.USERS_CHANGE_USER_PASSWORD))
    public async changeUserPassword(@request() req: Request, @response() res: Response): Promise<void>
    {
        const _request = new ChangeUserPasswordRequest(req);

        const user: IUserDomain = await this.controller.changeUserPassword(_request);

        this.responder.send(user, req, res, StatusCode.HTTP_CREATED, new UserTransformer());
    }
}

export default UserHandler;
