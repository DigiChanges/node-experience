import { DefaultContext } from 'koa';
import Router from 'koa-router';
import KoaResponder from '../../../Shared/Application/Http/KoaResponder';
import IUserDomain from '../../Domain/Entities/IUserDomain';
import UserTransformer from '../Transformers/UserTransformer';
import AuthorizeKoaMiddleware from '../Middlewares/AuthorizeKoaMiddleware';
import Permissions from '../../../Config/Permissions';
import ResponseMessageEnum from '../../../Shared/Domain/Enum/ResponseMessageEnum';
import DefaultMessageTransformer from '../../../Shared/Presentation/Transformers/DefaultMessageTransformer';
import MainConfig from '../../../Config/MainConfig';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';
import UserSavePayload from '../../Domain/Payloads/User/UserSavePayload';
import UserUpdatePayload from '../../Domain/Payloads/User/UserUpdatePayload';
import UserAssignRolePayload from '../../Domain/Payloads/User/UserAssignRolePayload';
import ChangeMyPasswordPayload from '../../Domain/Payloads/User/ChangeMyPasswordPayload';
import ChangeUserPasswordPayload from '../../Domain/Payloads/User/ChangeUserPasswordPayload';
import dayjs from 'dayjs';
import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import SaveUserUseCase from '../../Domain/UseCases/User/SaveUserUseCase';
import ListUsersUseCase from '../../Domain/UseCases/User/ListUsersUseCase';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import RequestCriteria from '../../../Shared/Presentation/Requests/RequestCriteria';
import UserFilter from '../Criterias/UserFilter';
import UserSort from '../Criterias/UserSort';
import Pagination from '../../../Shared/Presentation/Shared/Pagination';
import GetUserUseCase from '../../Domain/UseCases/User/GetUserUseCase';
import UpdateUserUseCase from '../../Domain/UseCases/User/UpdateUserUseCase';
import AssignRoleUseCase from '../../Domain/UseCases/User/AssignRoleUseCase';
import RemoveUserUseCase from '../../Domain/UseCases/User/RemoveUserUseCase';
import ChangeMyPasswordUseCase from '../../Domain/UseCases/User/ChangeMyPasswordUseCase';
import ChangeUserPasswordUseCase from '../../Domain/UseCases/User/ChangeUserPasswordUseCase';
import ActiveUserUseCase from '../../Domain/UseCases/User/ActiveUserUseCase';

const routerOpts: Router.IRouterOptions = {
    prefix: '/api/users'
};

const UserKoaHandler: Router = new Router(routerOpts);
const responder: KoaResponder = new KoaResponder();
const config = MainConfig.getInstance().getConfig().statusCode;

UserKoaHandler.post('/', AuthorizeKoaMiddleware(Permissions.USERS_SAVE), async(ctx: DefaultContext) =>
{
    const payload: UserSavePayload = {
        ...ctx.request.body,
        birthdate: dayjs(ctx.request.body.birthdate, 'yyyy-mm-dd').toDate(),
        roles: []
    };

    const useCase = new SaveUserUseCase();
    const user: IUserDomain = await useCase.handle(payload);

    void await responder.send(user, ctx, config['HTTP_CREATED'], new DefaultMessageTransformer(ResponseMessageEnum.CREATED));
});

UserKoaHandler.get('/', AuthorizeKoaMiddleware(Permissions.USERS_LIST), async(ctx: DefaultContext) =>
{
    const  { query, url } = ctx.request;

    const requestCriteria: ICriteria = new RequestCriteria(
        {
            filter: new UserFilter(query),
            sort: new UserSort(query),
            pagination: new Pagination(query, url)
        });

    const useCase = new ListUsersUseCase();
    const paginator: IPaginator = await useCase.handle(requestCriteria);

    await responder.send(paginator, ctx, config['HTTP_OK'], new UserTransformer()); // TODO: Change to paginate
});

UserKoaHandler.get('/:id', AuthorizeKoaMiddleware(Permissions.USERS_SHOW), async(ctx: DefaultContext) =>
{
    const payload = {
        id: ctx.params.id
    };

    const useCase = new GetUserUseCase();
    const user: IUserDomain = await useCase.handle(payload);

    void await responder.send(user, ctx, config['HTTP_OK'], new UserTransformer());
});

UserKoaHandler.put('/:id', AuthorizeKoaMiddleware(Permissions.USERS_UPDATE), async(ctx: DefaultContext) =>
{
    const payload: UserUpdatePayload = {
        ...ctx.request.body,
        id: ctx.params.id,
        userId: ctx.authUser.getId(),
        birthdate: dayjs(ctx.request.body.birthdate, 'yyyy-mm-dd').toDate(),
        roles: []
    };

    const useCase = new UpdateUserUseCase();
    const user: IUserDomain = await useCase.handle(payload);

    void await responder.send(user, ctx, config['HTTP_CREATED'], new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
});

UserKoaHandler.put('/assign-role/:id', AuthorizeKoaMiddleware(Permissions.USERS_ASSIGN_ROLE), async(ctx: DefaultContext) =>
{
    const payload: UserAssignRolePayload = {
        ...ctx.request.body,
        id: ctx.params.id
    };

    const useCase = new AssignRoleUseCase();
    await useCase.handle(payload);

    void await responder.send({ message: 'Role assigned successfully.' }, ctx, config['HTTP_CREATED'], new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
});

UserKoaHandler.delete('/:id', AuthorizeKoaMiddleware(Permissions.USERS_DELETE), async(ctx: DefaultContext) =>
{
    const payload = {
        id: ctx.params.id
    };

    const useCase = new RemoveUserUseCase();
    const user: IUserDomain = await useCase.handle(payload);

    void await responder.send(user, ctx, config['HTTP_OK'], new DefaultMessageTransformer(ResponseMessageEnum.DELETED));
});

UserKoaHandler.post('/change-my-password', AuthorizeKoaMiddleware(Permissions.USERS_CHANGE_MY_PASSWORD), async(ctx: DefaultContext) =>
{
    const payload: ChangeMyPasswordPayload = {
        ...ctx.request.body,
        id: ctx.authUser.getId()
    };

    const useCase = new ChangeMyPasswordUseCase();
    const user: IUserDomain = await useCase.handle(payload);

    void await responder.send(user, ctx, config['HTTP_CREATED'], new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
});

UserKoaHandler.put('/change-user-password/:id', AuthorizeKoaMiddleware(Permissions.USERS_CHANGE_USER_PASSWORD), async(ctx: DefaultContext) =>
{
    const payload: ChangeUserPasswordPayload = {
        ...ctx.request.body,
        id: ctx.params.id
    };

    const useCase = new ChangeUserPasswordUseCase();
    const user: IUserDomain = await useCase.handle(payload);

    void await responder.send(user, ctx, config['HTTP_CREATED'], new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
});

UserKoaHandler.post('/active/:id', AuthorizeKoaMiddleware(Permissions.USERS_CHANGE_USER_PASSWORD), async(ctx: DefaultContext) =>
{
    const useCase = new ActiveUserUseCase();
    await useCase.handle(ctx.params as IdPayload);

    void await responder.send({ message: 'User activated successfully' }, ctx, config['HTTP_OK']);
});

export default UserKoaHandler;
