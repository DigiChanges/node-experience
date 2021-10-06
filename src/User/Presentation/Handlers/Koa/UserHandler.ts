import Koa from 'koa';
import Router from 'koa-router';
import { IPaginator, StatusCode } from '@digichanges/shared-experience';
import Responder from '../../../../App/Presentation/Shared/Koa/Responder';
import IdRequest from '../../../../App/Presentation/Requests/IdRequest';
import UserController from '../../Controllers/UserControllers';
import IUserDomain from '../../../InterfaceAdapters/IUserDomain';
import UserRequestCriteria from '../../Requests/Express/UserRequestCriteria';
import UserUpdateRequest from '../../Requests/Express/UserUpdateRequest';
import UserSaveRequest from '../../Requests/Express/UserSaveRequest';
import UserAssignRoleRequest from '../../Requests/Express/UserAssignRoleRequest';
import ChangeMyPasswordRequest from '../../Requests/Express/ChangeMyPasswordRequest';
import ChangeUserPasswordRequest from '../../Requests/Express/ChangeUserPasswordRequest';
import UserTransformer from '../../Transformers/UserTransformer';


const routerOpts: Router.IRouterOptions = {
    prefix: '/api/users'
};

const UserHandler: Router = new Router(routerOpts);
const responder: Responder = new Responder();
const controller = new UserController();

UserHandler.post('/', async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new UserSaveRequest(ctx.request.body);

    const user: IUserDomain = await controller.save(_request);

    responder.send(user, ctx, StatusCode.HTTP_CREATED, new UserTransformer());
});

UserHandler.get('/', async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new UserRequestCriteria(ctx.request.query, ctx.request.url);

    const paginator: IPaginator = await controller.list(_request);

    await responder.paginate(paginator, ctx, StatusCode.HTTP_OK, new UserTransformer());
});

UserHandler.get('/:id', async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new IdRequest(ctx.params.id);

    const user: IUserDomain = await controller.getOne(_request);

    responder.send(user, ctx, StatusCode.HTTP_OK, new UserTransformer());
});

UserHandler.put('/:id', async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new UserUpdateRequest(ctx.request.body, ctx.params.id, ctx.tokenDecode.userId);

    const user: IUserDomain = await controller.update(_request);

    responder.send(user, ctx, StatusCode.HTTP_CREATED, new UserTransformer());
});

UserHandler.put('/assign-role/:id', async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new UserAssignRoleRequest(ctx.request.body, ctx.params.id);

    const user: IUserDomain = await controller.assignRole(_request);

    responder.send(user, ctx, StatusCode.HTTP_CREATED, new UserTransformer());
});

UserHandler.delete('/:id', async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new IdRequest(ctx.params.id);

    const user: IUserDomain = await controller.remove(_request);

    responder.send(user, ctx, StatusCode.HTTP_OK, new UserTransformer());
});

UserHandler.post('/change-my-password', async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new ChangeMyPasswordRequest(ctx.request.body, ctx.tokenDecode.userId);

    const user: IUserDomain = await controller.changeMyPassword(_request);

    responder.send(user, ctx, StatusCode.HTTP_CREATED, new UserTransformer());
});

UserHandler.put('/change-user-password/:id', async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new ChangeUserPasswordRequest(ctx.request.body, ctx.params.id);

    const user: IUserDomain = await controller.changeUserPassword(_request);

    responder.send(user, ctx, StatusCode.HTTP_CREATED, new UserTransformer());
});

export default UserHandler;
