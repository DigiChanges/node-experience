import {
    IPaginator,
    IdPayload,
    ICriteria,
    RequestCriteria,
    DefaultMessageTransformer,
    ResponseMessageEnum,
    StatusCode
} from '@digichanges/shared-experience';

import dayjs from 'dayjs';

import KoaResponder from '../../../Main/Presentation/Utils/KoaResponder';
import IUserDomain from '../../Domain/Entities/IUserDomain';
import UserTransformer from '../Transformers/UserTransformer';

import MainConfig from '../../../Config/MainConfig';
import UserSavePayload from '../../Domain/Payloads/User/UserSavePayload';
import UserUpdatePayload from '../../Domain/Payloads/User/UserUpdatePayload';
import UserAssignRolePayload from '../../Domain/Payloads/User/UserAssignRolePayload';
import ChangeMyPasswordPayload from '../../Domain/Payloads/User/ChangeMyPasswordPayload';
import ChangeUserPasswordPayload from '../../Domain/Payloads/User/ChangeUserPasswordPayload';
import SaveUserUseCase from '../../Domain/UseCases/User/SaveUserUseCase';
import ListUsersUseCase from '../../Domain/UseCases/User/ListUsersUseCase';
import UserFilter from '../Criterias/UserFilter';
import UserSort from '../Criterias/UserSort';
import Pagination from '../../../Shared/Utils/Pagination';
import GetUserUseCase from '../../Domain/UseCases/User/GetUserUseCase';
import UpdateUserUseCase from '../../Domain/UseCases/User/UpdateUserUseCase';
import AssignRoleUseCase from '../../Domain/UseCases/User/AssignRoleUseCase';
import RemoveUserUseCase from '../../Domain/UseCases/User/RemoveUserUseCase';
import ChangeMyPasswordUseCase from '../../Domain/UseCases/User/ChangeMyPasswordUseCase';
import ChangeUserPasswordUseCase from '../../Domain/UseCases/User/ChangeUserPasswordUseCase';
import ActiveUserUseCase from '../../Domain/UseCases/User/ActiveUserUseCase';

const responder: KoaResponder = new KoaResponder();

class UserKoaController
{
    static async save(ctx: any)
    {
        const payload: UserSavePayload = {
            ...ctx.request.body,
            birthdate: dayjs(ctx.request.body.birthdate, 'yyyy-mm-dd').toDate(),
            roles: []
        };

        const useCase = new SaveUserUseCase();
        const user: IUserDomain = await useCase.handle(payload);

        await responder.send(user, ctx, StatusCode.HTTP_CREATED, new DefaultMessageTransformer(ResponseMessageEnum.CREATED));
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

        await responder.send(paginator, ctx, StatusCode.HTTP_OK, new UserTransformer()); // TODO: Change to paginate
    }

    static async getOne(ctx: any)
    {
        const payload = {
            id: ctx.params.id
        };

        const useCase = new GetUserUseCase();
        const user: IUserDomain = await useCase.handle(payload);

        await responder.send(user, ctx, StatusCode.HTTP_OK, new UserTransformer());
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

        await responder.send(user, ctx, StatusCode.HTTP_CREATED, new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
    }

    static async assignRole(ctx: any)
    {
        const payload: UserAssignRolePayload = {
            ...ctx.request.body,
            id: ctx.params.id
        };

        const useCase = new AssignRoleUseCase();
        await useCase.handle(payload);

        await responder.send({ message: 'Role assigned successfully.' }, ctx, StatusCode.HTTP_CREATED, new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
    }

    static async remove(ctx: any)
    {
        const payload = {
            id: ctx.params.id
        };

        const useCase = new RemoveUserUseCase();
        const user: IUserDomain = await useCase.handle(payload);

        await responder.send(user, ctx, StatusCode.HTTP_OK, new DefaultMessageTransformer(ResponseMessageEnum.DELETED));
    }

    static async changeMyPassword(ctx: any)
    {
        const payload: ChangeMyPasswordPayload = {
            ...ctx.request.body,
            id: ctx.authUser.getId()
        };

        const useCase = new ChangeMyPasswordUseCase();
        const user: IUserDomain = await useCase.handle(payload);

        await responder.send(user, ctx, StatusCode.HTTP_CREATED, new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
    }

    static async changeUserPassword(ctx: any)
    {
        const payload: ChangeUserPasswordPayload = {
            ...ctx.request.body,
            id: ctx.params.id
        };

        const useCase = new ChangeUserPasswordUseCase();
        const user: IUserDomain = await useCase.handle(payload);

        await responder.send(user, ctx, StatusCode.HTTP_CREATED, new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
    }

    static async activeUser(ctx: any)
    {
        const useCase = new ActiveUserUseCase();
        await useCase.handle(ctx.params as IdPayload);

        await responder.send({ message: 'User activated successfully' }, ctx, StatusCode.HTTP_OK);
    }
}


export default UserKoaController;
