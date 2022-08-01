import { Request, Response } from 'express';
import { controller, httpDelete, httpGet, httpPost, httpPut, request, response } from 'inversify-express-utils';
import StatusCode from '../../../Shared/Application/StatusCode';
import IPaginator from '../../../Shared/Domain/Payloads/IPaginator';

import ExpressResponder from '../../../Shared/Application/Http/ExpressResponder';

import AuthorizeExpressMiddleware from '../../../Auth/Presentation/Middlewares/AuthorizeExpressMiddleware';
import Permissions from '../../../Config/Permissions';

import UserTransformer from '../Transformers/UserTransformer';

import IdRequest from '../../../Shared/Presentation/Requests/IdRequest';
import UserRequestCriteria from '../Requests/UserRequestCriteria';
import UserUpdateRequest from '../Requests/UserUpdateRequest';
import UserAssignRoleRequest from '../Requests/UserAssignRoleRequest';
import ChangeUserPasswordRequest from '../Requests/ChangeUserPasswordRequest';
import ChangeMyPasswordRequest from '../Requests/ChangeMyPasswordRequest';

import IUserDomain from '../../Domain/Entities/IUserDomain';
import UserController from '../Controllers/UserControllers';
import UserSaveRequest from '../Requests/UserSaveRequest';
import { AuthUser } from '../../../Auth/Presentation/Helpers/AuthUser';
import IDecodeToken from '../../../Shared/InterfaceAdapters/IDecodeToken';
import ResponseMessageEnum from '../../../Shared/Domain/Enum/ResponseMessageEnum';
import DefaultMessageTransformer from '../../../Shared/Presentation/Transformers/DefaultMessageTransformer';

@controller('/api/users')
class UserExpressHandler
{
    private responder: ExpressResponder;
    private readonly controller: UserController;

    constructor()
    {
        this.responder = new ExpressResponder();
        this.controller = new UserController();
    }

    @httpPost('/', AuthorizeExpressMiddleware(Permissions.USERS_SAVE))
    public async save(@request() req: Request, @response() res: Response): Promise<void>
    {
        const _request = new UserSaveRequest(req.body);

        const user: IUserDomain = await this.controller.save(_request);

        void await this.responder.send(user, req, res, StatusCode.HTTP_CREATED, new DefaultMessageTransformer(ResponseMessageEnum.CREATED));
    }

    @httpGet('/', AuthorizeExpressMiddleware(Permissions.USERS_LIST))
    public async list(@request() req: Request, @response() res: Response): Promise<void>
    {
        const data = {
            query: req.query,
            url: req.url
        };

        const _request = new UserRequestCriteria(data);

        const paginator: IPaginator = await this.controller.list(_request);

        await this.responder.paginate(paginator, req, res, StatusCode.HTTP_OK, new UserTransformer());
    }

    @httpGet('/:id', AuthorizeExpressMiddleware(Permissions.USERS_SHOW))
    public async getOne(@request() req: Request, @response() res: Response): Promise<void>
    {
        const _request = new IdRequest({ id: req.params.id });

        const user: IUserDomain = await this.controller.getOne(_request);

        void await this.responder.send(user, req, res, StatusCode.HTTP_OK, new UserTransformer());
    }

    @httpPut('/:id', AuthorizeExpressMiddleware(Permissions.USERS_UPDATE))
    public async update(@request() req: any, @response() res: Response): Promise<void>
    {
        const data = {
            id: req.params.id,
            userId: AuthUser<IDecodeToken>(req, 'decodeToken').userId,
            ...req.body
        };

        const _request = new UserUpdateRequest(data);

        const user: IUserDomain = await this.controller.update(_request);

        void await this.responder.send(user, req, res, StatusCode.HTTP_CREATED, new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
    }

    @httpPut('/assign-role/:id', AuthorizeExpressMiddleware(Permissions.USERS_ASSIGN_ROLE))
    public async assignRole(@request() req: Request, @response() res: Response): Promise<void>
    {
        const data = {
            id: req.params.id,
            ...req.body
        };

        const _request = new UserAssignRoleRequest(data);

        const _response: IUserDomain = await this.controller.assignRole(_request);

        void await this.responder.send(_response, req, res, StatusCode.HTTP_CREATED, new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
    }

    @httpDelete('/:id', AuthorizeExpressMiddleware(Permissions.USERS_DELETE))
    public async remove(@request() req: Request, @response() res: Response): Promise<void>
    {
        const _request = new IdRequest({ id: req.params.id });

        const data = await this.controller.remove(_request);

        void await this.responder.send(data, req, res, StatusCode.HTTP_OK, new UserTransformer());
    }

    @httpPost('/change-my-password', AuthorizeExpressMiddleware(Permissions.USERS_CHANGE_MY_PASSWORD))
    public async changeMyPassword(@request() req: any, @response() res: Response): Promise<void>
    {
        const data = {
            userId: AuthUser<IDecodeToken>(req, 'decodeToken').userId,
            ...req.body
        };

        const _request = new ChangeMyPasswordRequest(data);

        const user: IUserDomain = await this.controller.changeMyPassword(_request);
        void await this.responder.send(user, req, res, StatusCode.HTTP_CREATED, new UserTransformer());
    }

    @httpPut('/change-user-password/:id', AuthorizeExpressMiddleware(Permissions.USERS_CHANGE_USER_PASSWORD))
    public async changeUserPassword(@request() req: Request, @response() res: Response): Promise<void>
    {
        const data = {
            userId: req.params.id,
            ...req.body
        };

        const _request = new ChangeUserPasswordRequest(data);

        const user: IUserDomain = await this.controller.changeUserPassword(_request);

        void await this.responder.send(user, req, res, StatusCode.HTTP_CREATED, new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
    }
}

export default UserExpressHandler;
