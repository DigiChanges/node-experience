import { Request, Response } from 'express';
import { controller, httpDelete, httpGet, httpPost, httpPut, request, response } from 'inversify-express-utils';
import { IPaginator, StatusCode } from '@digichanges/shared-experience';

import { inject } from 'inversify';
import { TYPES } from '../../../../Config/Injects/types';
import Responder from '../../../../App/Presentation/Shared/Express/Responder';

import AuthorizeMiddleware from '../../../../Auth/Presentation/Middlewares/Express/AuthorizeMiddleware';
import Permissions from '../../../../Config/Permissions';

import UserTransformer from '../../Transformers/UserTransformer';

import IdRequest from '../../../../App/Presentation/Requests/IdRequest';
import UserRequestCriteria from '../../Requests/UserRequestCriteria';
import UserUpdateRequest from '../../Requests/UserUpdateRequest';
import UserAssignRoleRequest from '../../Requests/UserAssignRoleRequest';
import ChangeUserPasswordRequest from '../../Requests/ChangeUserPasswordRequest';
import ChangeMyPasswordRequest from '../../Requests/ChangeMyPasswordRequest';

import IUserDomain from '../../../Domain/Entities/IUserDomain';
import UserController from '../../Controllers/UserControllers';
import UserSaveRequest from '../../Requests/UserSaveRequest';
import { AuthUser } from '../../../../Auth/Presentation/Helpers/AuthUser';
import ITokenDecode from '../../../../Shared/InterfaceAdapters/ITokenDecode';
import ResponseData from '../../../../App/Presentation/Transformers/Response/DataResponseMessage';
import ResponseMessageEnum from '../../../../App/Domain/Enum/ResponseMessageEnum';
import ResponseTransformer from '../../../../App/Presentation/Transformers/DefaultMessageTransformer';
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
        const responseData = new ResponseData(user.getId(), ResponseMessageEnum.CREATED);
        void await this.responder.send(responseData, req, res, StatusCode.HTTP_CREATED, new ResponseTransformer());
    }

    @httpGet('/', AuthorizeMiddleware(Permissions.USERS_LIST))
    public async list(@request() req: Request, @response() res: Response): Promise<void>
    {
        const _request = new UserRequestCriteria(req.query, req.url);

        const paginator: IPaginator = await this.controller.list(_request);

        await this.responder.paginate(paginator, req, res, StatusCode.HTTP_OK, new UserTransformer());
    }

    @httpGet('/:id', AuthorizeMiddleware(Permissions.USERS_SHOW))
    public async getOne(@request() req: Request, @response() res: Response): Promise<void>
    {
        const _request = new IdRequest({ id: req.params.id });

        const user: IUserDomain = await this.controller.getOne(_request);

        void await this.responder.send(user, req, res, StatusCode.HTTP_OK, new UserTransformer());
    }

    @httpPut('/:id', AuthorizeMiddleware(Permissions.USERS_UPDATE))
    public async update(@request() req: any, @response() res: Response): Promise<void>
    {
        const _request = new UserUpdateRequest(req.body, req.params.id, AuthUser<ITokenDecode>(req, 'tokenDecode').userId);

        const user: IUserDomain = await this.controller.update(_request);
        const responseData = new ResponseData(user.getId(), ResponseMessageEnum.CREATED);
        void await this.responder.send(responseData, req, res, StatusCode.HTTP_CREATED, new ResponseTransformer());
    }

    @httpPut('/assign-role/:id', AuthorizeMiddleware(Permissions.USERS_ASSIGN_ROLE))
    public async assignRole(@request() req: Request, @response() res: Response): Promise<void>
    {
        const _request = new UserAssignRoleRequest(req.body, req.params.id);

        const _response: IUserDomain = await this.controller.assignRole(_request);
        const responseData = new ResponseData(_response.getId(), ResponseMessageEnum.UPDATED);
        void await this.responder.send(responseData, req, res, StatusCode.HTTP_CREATED, new ResponseTransformer());
    }

    @httpDelete('/:id', AuthorizeMiddleware(Permissions.USERS_DELETE))
    public async remove(@request() req: Request, @response() res: Response): Promise<void>
    {
        const _request = new IdRequest({ id: req.params.id });

        const data = await this.controller.remove(_request);

        void await this.responder.send(data, req, res, StatusCode.HTTP_OK, new UserTransformer());
    }

    @httpPost('/change-my-password', AuthorizeMiddleware(Permissions.USERS_CHANGE_MY_PASSWORD))
    public async changeMyPassword(@request() req: any, @response() res: Response): Promise<void>
    {
        const _request = new ChangeMyPasswordRequest(req.body, AuthUser<ITokenDecode>(req, 'tokenDecode').userId);

        const user: IUserDomain = await this.controller.changeMyPassword(_request);
        void await this.responder.send(user, req, res, StatusCode.HTTP_CREATED, new UserTransformer());
    }

    @httpPut('/change-user-password/:id', AuthorizeMiddleware(Permissions.USERS_CHANGE_USER_PASSWORD))
    public async changeUserPassword(@request() req: Request, @response() res: Response): Promise<void>
    {
        const _request = new ChangeUserPasswordRequest(req.body, req.params.id);

        const user: IUserDomain = await this.controller.changeUserPassword(_request);
        const responseData = new ResponseData(user.getId(), ResponseMessageEnum.UPDATED);
        void await this.responder.send(responseData, req, res, StatusCode.HTTP_CREATED, new ResponseTransformer());
    }
}

export default UserHandler;
