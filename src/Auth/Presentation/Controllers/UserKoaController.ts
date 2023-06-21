import KoaResponder from '../../../Shared/Application/Http/KoaResponder';
import IUserDomain from '../../Domain/Entities/IUserDomain';
import UserTransformer from '../Transformers/UserTransformer';
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

class UserKoaController
{
    static responder: KoaResponder = new KoaResponder();
    static config = MainConfig.getInstance().getConfig().statusCode;

    static async save(ctx: any)
    {
        const payload: UserSavePayload = {
            ...ctx.request.body,
            birthdate: dayjs(ctx.request.body.birthdate, 'yyyy-mm-dd').toDate(),
            roles: []
        };

        const useCase = new SaveUserUseCase();
        const user: IUserDomain = await useCase.handle(payload);

        void await UserKoaController.responder.send(user, ctx, UserKoaController.config['HTTP_CREATED'], new DefaultMessageTransformer(ResponseMessageEnum.CREATED));
    }

    static async list(ctx: any)
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

        await UserKoaController.responder.send(paginator, ctx, UserKoaController.config['HTTP_OK'], new UserTransformer()); // TODO: Change to paginate
    }

    static async getOne(ctx: any)
    {
        const payload = {
            id: ctx.params.id
        };

        const useCase = new GetUserUseCase();
        const user: IUserDomain = await useCase.handle(payload);

        void await UserKoaController.responder.send(user, ctx, UserKoaController.config['HTTP_OK'], new UserTransformer());
    }

    static async update(ctx: any)
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

        void await UserKoaController.responder.send(user, ctx, UserKoaController.config['HTTP_CREATED'], new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
    }

    static async assignRole(ctx: any)
    {
        const payload: UserAssignRolePayload = {
            ...ctx.request.body,
            id: ctx.params.id
        };

        const useCase = new AssignRoleUseCase();
        await useCase.handle(payload);

        void await UserKoaController.responder.send({ message: 'Role assigned successfully.' }, ctx, UserKoaController.config['HTTP_CREATED'], new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
    }

    static async remove(ctx: any)
    {
        const payload = {
            id: ctx.params.id
        };

        const useCase = new RemoveUserUseCase();
        const user: IUserDomain = await useCase.handle(payload);

        void await UserKoaController.responder.send(user, ctx, UserKoaController.config['HTTP_OK'], new DefaultMessageTransformer(ResponseMessageEnum.DELETED));
    }

    static async changeMyPassword(ctx: any)
    {
        const payload: ChangeMyPasswordPayload = {
            ...ctx.request.body,
            id: ctx.authUser.getId()
        };

        const useCase = new ChangeMyPasswordUseCase();
        const user: IUserDomain = await useCase.handle(payload);

        void await UserKoaController.responder.send(user, ctx, UserKoaController.config['HTTP_CREATED'], new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
    }

    static async changeUserPassword(ctx: any)
    {
        const payload: ChangeUserPasswordPayload = {
            ...ctx.request.body,
            id: ctx.params.id
        };

        const useCase = new ChangeUserPasswordUseCase();
        const user: IUserDomain = await useCase.handle(payload);

        void await UserKoaController.responder.send(user, ctx, UserKoaController.config['HTTP_CREATED'], new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
    }

    static async activeUser(ctx: any)
    {
        const useCase = new ActiveUserUseCase();
        await useCase.handle(ctx.params as IdPayload);

        void await UserKoaController.responder.send({ message: 'User activated successfully' }, ctx, UserKoaController.config['HTTP_OK']);
    }
}


export default UserKoaController;
