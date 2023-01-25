import { Request, Response } from 'express';
import { controller, httpDelete, httpGet, httpPost, httpPut, request, response } from 'inversify-express-utils';
import MainConfig, { IHttpStatusCode } from '../../../Config/MainConfig';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';

import ExpressResponder from '../../../Shared/Application/Http/ExpressResponder';

import AuthorizeExpressMiddleware from '../Middlewares/AuthorizeExpressMiddleware';
import Permissions from '../../../Config/Permissions';

import UserTransformer from '../Transformers/UserTransformer';

import IUserDomain from '../../Domain/Entities/IUserDomain';
import UserController from '../Controllers/UserControllers';
import { AuthUser } from '../Helpers/AuthUser';
import IDecodeToken from '../../Domain/Models/IDecodeToken';
import ResponseMessageEnum from '../../../Shared/Domain/Enum/ResponseMessageEnum';
import DefaultMessageTransformer from '../../../Shared/Presentation/Transformers/DefaultMessageTransformer';
import UserSavePayload from '../../Domain/Payloads/User/UserSavePayload';
import CriteriaPayload from '../../../Shared/Presentation/Validations/CriteriaPayload';
import UserUpdatePayload from '../../Domain/Payloads/User/UserUpdatePayload';
import UserAssignRolePayload from '../../Domain/Payloads/User/UserAssignRolePayload';
import ChangeMyPasswordPayload from '../../Domain/Payloads/User/ChangeMyPasswordPayload';
import ChangeUserPasswordPayload from '../../Domain/Payloads/User/ChangeUserPasswordPayload';

@controller('/api/users')
class UserExpressHandler
{
    private responder: ExpressResponder;
    private readonly controller: UserController;
    private readonly config: Record<string, IHttpStatusCode>;

    constructor()
    {
        this.responder = new ExpressResponder();
        this.controller = new UserController();
        this.config = MainConfig.getInstance().getConfig().statusCode;
    }

    @httpPost('/', void AuthorizeExpressMiddleware(Permissions.USERS_SAVE))
    public async save(@request() req: Request, @response() res: Response): Promise<void>
    {
        const user: IUserDomain = await this.controller.save(req.body as UserSavePayload);

        void await this.responder.send(user, req, res, this.config['HTTP_CREATED'], new DefaultMessageTransformer(ResponseMessageEnum.CREATED));
    }

    @httpGet('/', void AuthorizeExpressMiddleware(Permissions.USERS_LIST))
    public async list(@request() req: Request, @response() res: Response): Promise<void>
    {
        const data: CriteriaPayload = {
            url: req.url,
            query: req.query
        };

        const paginator: IPaginator = await this.controller.list(data);

        await this.responder.paginate(paginator, req, res, this.config['HTTP_OK'], new UserTransformer());
    }

    @httpGet('/:id', void AuthorizeExpressMiddleware(Permissions.USERS_SHOW))
    public async getOne(@request() req: Request, @response() res: Response): Promise<void>
    {
        const data = {
            id: req.params.id
        };

        const user: IUserDomain = await this.controller.getOne(data);

        void await this.responder.send(user, req, res, this.config['HTTP_OK'], new UserTransformer());
    }

    @httpPut('/:id', void AuthorizeExpressMiddleware(Permissions.USERS_UPDATE))
    public async update(@request() req: any, @response() res: Response): Promise<void>
    {
        const data = {
            id: req.params.id,
            userId: AuthUser<IDecodeToken>(req, 'decodeToken').userId,
            ...req.body
        };

        const user: IUserDomain = await this.controller.update(data as UserUpdatePayload);

        void await this.responder.send(user, req, res, this.config['HTTP_CREATED'], new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
    }

    @httpPut('/assign-role/:id', void AuthorizeExpressMiddleware(Permissions.USERS_ASSIGN_ROLE))
    public async assignRole(@request() req: Request, @response() res: Response): Promise<void>
    {
        const data = {
            id: req.params.id,
            ...req.body
        };

        const user: IUserDomain = await this.controller.assignRole(data as UserAssignRolePayload);

        void await this.responder.send(user, req, res, this.config['HTTP_CREATED'], new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
    }

    @httpDelete('/:id', void AuthorizeExpressMiddleware(Permissions.USERS_DELETE))
    public async remove(@request() req: Request, @response() res: Response): Promise<void>
    {
        const data = {
            id: req.params.id
        };

        const user: IUserDomain = await this.controller.remove(data);

        void await this.responder.send(user, req, res, this.config['HTTP_OK'], new UserTransformer());
    }

    @httpPost('/change-my-password', void AuthorizeExpressMiddleware(Permissions.USERS_CHANGE_MY_PASSWORD))
    public async changeMyPassword(@request() req: any, @response() res: Response): Promise<void>
    {
        const data = {
            id: AuthUser<IDecodeToken>(req, 'decodeToken').userId,
            ...req.body
        };

        const user: IUserDomain = await this.controller.changeMyPassword(data as ChangeMyPasswordPayload);

        void await this.responder.send(user, req, res, this.config['HTTP_CREATED'], new UserTransformer());
    }

    @httpPut('/change-user-password/:id', void AuthorizeExpressMiddleware(Permissions.USERS_CHANGE_USER_PASSWORD))
    public async changeUserPassword(@request() req: Request, @response() res: Response): Promise<void>
    {
        const data = {
            userId: req.params.id,
            ...req.body
        };

        const user: IUserDomain = await this.controller.changeUserPassword(data as ChangeUserPasswordPayload);

        void await this.responder.send(user, req, res, this.config['HTTP_CREATED'], new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
    }
}

export default UserExpressHandler;
