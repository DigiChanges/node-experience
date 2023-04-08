import GetUserUseCase from '../../Domain/UseCases/User/GetUserUseCase';
import ListUsersUseCase from '../../Domain/UseCases/User/ListUsersUseCase';
import SaveUserUseCase from '../../Domain/UseCases/User/SaveUserUseCase';
import AssignRoleUseCase from '../../Domain/UseCases/User/AssignRoleUseCase';
import RemoveUserUseCase from '../../Domain/UseCases/User/RemoveUserUseCase';
import ChangeMyPasswordUseCase from '../../Domain/UseCases/User/ChangeMyPasswordUseCase';
import ChangeUserPasswordUseCase from '../../Domain/UseCases/User/ChangeUserPasswordUseCase';
import UpdateUserUseCase from '../../Domain/UseCases/User/UpdateUserUseCase';

import ValidatorSchema from '../../../Shared/Presentation/Shared/ValidatorSchema';

import IUserDomain from '../../Domain/Entities/IUserDomain';
import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import UserUpdatePayload from '../../Domain/Payloads/User/UserUpdatePayload';
import UserAssignRolePayload from '../../Domain/Payloads/User/UserAssignRolePayload';
import ChangeMyPasswordPayload from '../../Domain/Payloads/User/ChangeMyPasswordPayload';
import ChangeUserPasswordPayload from '../../Domain/Payloads/User/ChangeUserPasswordPayload';
import UserSavePayload from '../../Domain/Payloads/User/UserSavePayload';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';
import CriteriaSchemaValidation from '../../../Shared/Presentation/Validations/CriteriaSchemaValidation';
import RequestCriteria from '../../../Shared/Presentation/Requests/RequestCriteria';
import CriteriaPayload from '../../../Shared/Presentation/Validations/CriteriaPayload';
import UserFilter from '../Criterias/UserFilter';
import UserSort from '../Criterias/UserSort';
import Pagination from '../../../Shared/Presentation/Shared/Pagination';
import IdSchemaValidation from '../../../Shared/Presentation/Validations/IdSchemaValidation';
import UserRepSchemaValidation from '../Validations/User/UserRepSchemaValidation';
import UserUpdateSchemaValidation from '../Validations/User/UserUpdateSchemaValidation';
import UserAssignSchemaValidation from '../Validations/User/UserAssignSchemaValidation';
import ChangeMyPasswordSchemaValidation from '../Validations/User/ChangeMyPasswordSchemaValidation';
import ChangeUserPasswordSchemaValidation from '../Validations/User/ChangeUserPasswordSchemaValidation';
import ActiveUserUseCase from '../../Domain/UseCases/User/ActiveUserUseCase';

class UserController
{
    public async save(payload: UserSavePayload): Promise<IUserDomain>
    {
        await ValidatorSchema.handle(UserRepSchemaValidation, payload);

        const useCase = new SaveUserUseCase();
        return await useCase.handle(payload);
    }

    public async list(payload: CriteriaPayload): Promise<IPaginator>
    {
        await ValidatorSchema.handle(CriteriaSchemaValidation, payload);

        const requestCriteria: ICriteria = new RequestCriteria(
            {
                filter: new UserFilter(payload.query),
                sort: new UserSort(payload.query),
                pagination: new Pagination(payload.query, payload.url)
            });

        const useCase = new ListUsersUseCase();
        return await useCase.handle(requestCriteria);
    }

    public async getOne(payload: IdPayload): Promise<IUserDomain>
    {
        await ValidatorSchema.handle(IdSchemaValidation, payload);

        const useCase = new GetUserUseCase();
        return await useCase.handle(payload);
    }

    public async update(payload: UserUpdatePayload): Promise<IUserDomain>
    {
        await ValidatorSchema.handle(UserUpdateSchemaValidation, payload);

        const useCase = new UpdateUserUseCase();
        return await useCase.handle(payload);
    }

    public async assignRole(payload: UserAssignRolePayload): Promise<void>
    {
        await ValidatorSchema.handle(UserAssignSchemaValidation, payload);

        const useCase = new AssignRoleUseCase();
        await useCase.handle(payload);
    }

    public async remove(payload: IdPayload): Promise<IUserDomain>
    {
        await ValidatorSchema.handle(IdSchemaValidation, payload);

        const useCase = new RemoveUserUseCase();
        return await useCase.handle(payload);
    }

    public async changeMyPassword(payload: ChangeMyPasswordPayload): Promise<IUserDomain>
    {
        await ValidatorSchema.handle(ChangeMyPasswordSchemaValidation, payload);

        const useCase = new ChangeMyPasswordUseCase();
        return await useCase.handle(payload);
    }

    public async changeUserPassword(payload: ChangeUserPasswordPayload): Promise<IUserDomain>
    {
        await ValidatorSchema.handle(ChangeUserPasswordSchemaValidation, payload);

        const useCase = new ChangeUserPasswordUseCase();
        return await useCase.handle(payload);
    }

    public async active(payload: IdPayload): Promise<void>
    {
        await ValidatorSchema.handle(IdSchemaValidation, payload);

        const useCase = new ActiveUserUseCase();
        await useCase.handle(payload);
    }
}

export default UserController;
