import { DefaultContext } from 'koa';
import Router from 'koa-router';
import KoaResponder from '../../../Shared/Application/Http/KoaResponder';
import UserController from '../Controllers/UserControllers';
import IUserDomain from '../../Domain/Entities/IUserDomain';
import UserTransformer from '../Transformers/UserTransformer';
import AuthorizeKoaMiddleware from '../Middlewares/AuthorizeKoaMiddleware';
import Permissions from '../../../Config/Permissions';
import ResponseMessageEnum from '../../../Shared/Domain/Enum/ResponseMessageEnum';
import DefaultMessageTransformer from '../../../Shared/Presentation/Transformers/DefaultMessageTransformer';
import StatusCode from '../../../Shared/Application/StatusCode';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';
import UserSavePayload from '../../Domain/Payloads/User/UserSavePayload';
import CriteriaPayload from '../../../Shared/Presentation/Validations/CriteriaPayload';
import UserUpdatePayload from '../../Domain/Payloads/User/UserUpdatePayload';
import UserAssignRolePayload from '../../Domain/Payloads/User/UserAssignRolePayload';
import ChangeMyPasswordPayload from '../../Domain/Payloads/User/ChangeMyPasswordPayload';
import ChangeUserPasswordPayload from '../../Domain/Payloads/User/ChangeUserPasswordPayload';
import dayjs from 'dayjs';
import { AuthUser } from '../Helpers/AuthUser';
import IDecodeToken from '../../Domain/Models/IDecodeToken';

const routerOpts: Router.IRouterOptions = {
    prefix: '/api/users'
};

const UserKoaHandler: Router = new Router(routerOpts);
const responder: KoaResponder = new KoaResponder();
const controller = new UserController();

UserKoaHandler.post('/', AuthorizeKoaMiddleware(Permissions.USERS_SAVE), async(ctx: DefaultContext) =>
{
    const data = {
        ...ctx.request.body,
        birthday: dayjs(ctx.request.body.birthday, 'yyyy-mm-dd').toDate(),
        roles: []
    };

    const user: IUserDomain = await controller.save(data as UserSavePayload);

    void await responder.send(user, ctx, StatusCode.HTTP_CREATED, new DefaultMessageTransformer(ResponseMessageEnum.CREATED));
});

UserKoaHandler.get('/', AuthorizeKoaMiddleware(Permissions.USERS_LIST), async(ctx: DefaultContext) =>
{
    const data: CriteriaPayload = {
        query: ctx.request.query,
        url: ctx.request.url
    };

    const paginator: IPaginator = await controller.list(data);

    await responder.paginate(paginator, ctx, StatusCode.HTTP_OK, new UserTransformer());
});

UserKoaHandler.get('/:id', AuthorizeKoaMiddleware(Permissions.USERS_SHOW), async(ctx: DefaultContext) =>
{
    const data = {
        id: ctx.params.id
    };

    const user: IUserDomain = await controller.getOne(data);

    void await responder.send(user, ctx, StatusCode.HTTP_OK, new UserTransformer());
});

UserKoaHandler.put('/:id', AuthorizeKoaMiddleware(Permissions.USERS_UPDATE), async(ctx: DefaultContext) =>
{
    const data = {
        ...ctx.request.body,
        id: ctx.params.id,
        userId: ctx.decodeToken.userId,
        birthday: dayjs(ctx.request.body.birthday, 'yyyy-mm-dd').toDate(),
        roles: []
    };

    const user: IUserDomain = await controller.update(data as UserUpdatePayload);

    void await responder.send(user, ctx, StatusCode.HTTP_CREATED, new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
});

UserKoaHandler.put('/assign-role/:id', AuthorizeKoaMiddleware(Permissions.USERS_ASSIGN_ROLE), async(ctx: DefaultContext) =>
{
    const data = {
        ...ctx.request.body,
        id: ctx.params.id
    };

    const user: IUserDomain = await controller.assignRole(data as UserAssignRolePayload);

    void await responder.send(user, ctx, StatusCode.HTTP_CREATED, new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
});

UserKoaHandler.delete('/:id', AuthorizeKoaMiddleware(Permissions.USERS_DELETE), async(ctx: DefaultContext) =>
{
    const data = {
        id: ctx.params.id
    };

    const user: IUserDomain = await controller.remove(data);

    void await responder.send(user, ctx, StatusCode.HTTP_OK, new UserTransformer());
});

UserKoaHandler.post('/change-my-password', AuthorizeKoaMiddleware(Permissions.USERS_CHANGE_MY_PASSWORD), async(ctx: DefaultContext) =>
{
    const data = {
        ...ctx.request.body,
        id: AuthUser<IDecodeToken>(ctx, 'decodeToken').userId
    };

    const user: IUserDomain = await controller.changeMyPassword(data as ChangeMyPasswordPayload);

    void await responder.send(user, ctx, StatusCode.HTTP_CREATED, new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
});

UserKoaHandler.put('/change-user-password/:id', AuthorizeKoaMiddleware(Permissions.USERS_CHANGE_USER_PASSWORD), async(ctx: DefaultContext) =>
{
    const data = {
        ...ctx.request.body,
        userId: ctx.params.id
    };

    const user: IUserDomain = await controller.changeUserPassword(data as ChangeUserPasswordPayload);

    void await responder.send(user, ctx, StatusCode.HTTP_CREATED, new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
});

export default UserKoaHandler;
