import Koa from 'koa';
import Router from 'koa-router';
import KoaResponder from '../../../Shared/Application/Http/KoaResponder';
import IdRequest from '../../../Shared/Presentation/Requests/IdRequest';
import UserController from '../Controllers/UserControllers';
import IUserDomain from '../../Domain/Entities/IUserDomain';
import UserRequestCriteria from '../Requests/UserRequestCriteria';
import UserUpdateRequest from '../Requests/UserUpdateRequest';
import UserSaveRequest from '../Requests/UserSaveRequest';
import UserAssignRoleRequest from '../Requests/UserAssignRoleRequest';
import ChangeMyPasswordRequest from '../Requests/ChangeMyPasswordRequest';
import ChangeUserPasswordRequest from '../Requests/ChangeUserPasswordRequest';
import UserTransformer from '../Transformers/UserTransformer';
import AuthorizeKoaMiddleware from '../../../Auth/Presentation/Middlewares/AuthorizeKoaMiddleware';
import Permissions from '../../../Config/Permissions';
import ResponseMessageEnum from '../../../Shared/Domain/Enum/ResponseMessageEnum';
import DefaultMessageTransformer from '../../../Shared/Presentation/Transformers/DefaultMessageTransformer';
import StatusCode from '../../../Shared/Application/StatusCode';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';

const routerOpts: Router.IRouterOptions = {
    prefix: '/api/users'
};

const UserKoaHandler: Router = new Router(routerOpts);
const responder: KoaResponder = new KoaResponder();
const controller = new UserController();

UserKoaHandler.post('/', AuthorizeKoaMiddleware(Permissions.USERS_SAVE), async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new UserSaveRequest(ctx.request.body);

    const user: IUserDomain = await controller.save(_request);

    void await responder.send(user, ctx, StatusCode.HTTP_CREATED, new DefaultMessageTransformer(ResponseMessageEnum.CREATED));
});

UserKoaHandler.get('/', AuthorizeKoaMiddleware(Permissions.USERS_LIST), async(ctx: Koa.ParameterizedContext & any) =>
{
    const data = {
        query: ctx.request.query,
        url: ctx.request.url
    };

    const _request = new UserRequestCriteria(data);

    const paginator: IPaginator = await controller.list(_request);

    await responder.paginate(paginator, ctx, StatusCode.HTTP_OK, new UserTransformer());
});

UserKoaHandler.get('/:id', AuthorizeKoaMiddleware(Permissions.USERS_SHOW), async(ctx: Koa.ParameterizedContext & any) =>
{
    const data = {
        id: ctx.params.id
    };

    const _request = new IdRequest(data);

    const user: IUserDomain = await controller.getOne(_request);

    void await responder.send(user, ctx, StatusCode.HTTP_OK, new UserTransformer());
});

UserKoaHandler.put('/:id', AuthorizeKoaMiddleware(Permissions.USERS_UPDATE), async(ctx: Koa.ParameterizedContext & any) =>
{
    const data = {
        id: ctx.params.id,
        userId: ctx.decodeToken.userId,
        ...ctx.request.body
    };

    const _request = new UserUpdateRequest(data);

    const user: IUserDomain = await controller.update(_request);

    void await responder.send(user, ctx, StatusCode.HTTP_CREATED, new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
});

UserKoaHandler.put('/assign-role/:id', AuthorizeKoaMiddleware(Permissions.USERS_ASSIGN_ROLE), async(ctx: Koa.ParameterizedContext & any) =>
{
    const data = {
        id: ctx.params.id,
        ...ctx.request.body
    };

    const _request = new UserAssignRoleRequest(data);

    const user: IUserDomain = await controller.assignRole(_request);

    void await responder.send(user, ctx, StatusCode.HTTP_CREATED, new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
});

UserKoaHandler.delete('/:id', AuthorizeKoaMiddleware(Permissions.USERS_DELETE), async(ctx: Koa.ParameterizedContext & any) =>
{
    const data = {
        id: ctx.params.id
    };

    const _request = new IdRequest(data);

    const user: IUserDomain = await controller.remove(_request);

    void await responder.send(user, ctx, StatusCode.HTTP_OK, new UserTransformer());
});

UserKoaHandler.post('/change-my-password', AuthorizeKoaMiddleware(Permissions.USERS_CHANGE_MY_PASSWORD), async(ctx: Koa.ParameterizedContext & any) =>
{
    const data = {
        userId: ctx.decodeToken.userId,
        ...ctx.request.body
    };

    const _request = new ChangeMyPasswordRequest(data);

    const user: IUserDomain = await controller.changeMyPassword(_request);

    void await responder.send(user, ctx, StatusCode.HTTP_CREATED, new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
});

UserKoaHandler.put('/change-user-password/:id', AuthorizeKoaMiddleware(Permissions.USERS_CHANGE_USER_PASSWORD), async(ctx: Koa.ParameterizedContext & any) =>
{
    const data = {
        userId: ctx.params.id,
        ...ctx.request.body
    };

    const _request = new ChangeUserPasswordRequest(data);

    const user: IUserDomain = await controller.changeUserPassword(_request);

    void await responder.send(user, ctx, StatusCode.HTTP_CREATED, new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
});

export default UserKoaHandler;
