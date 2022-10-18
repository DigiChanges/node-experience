import GetUserUseCase from '../../Domain/UseCases/User/GetUserUseCase';
import ListUsersUseCase from '../../Domain/UseCases/User/ListUsersUseCase';
import SaveUserUseCase from '../../Domain/UseCases/User/SaveUserUseCase';
import AssignRoleUseCase from '../../Domain/UseCases/User/AssignRoleUseCase';
import RemoveUserUseCase from '../../Domain/UseCases/User/RemoveUserUseCase';
import ChangeMyPasswordUseCase from '../../Domain/UseCases/User/ChangeMyPasswordUseCase';
import ChangeUserPasswordUseCase from '../../Domain/UseCases/User/ChangeUserPasswordUseCase';
import UpdateUserUseCase from '../../Domain/UseCases/User/UpdateUserUseCase';

import ValidatorRequest from '../../../Shared/Presentation/Shared/ValidatorRequest';

import IUserDomain from '../../Domain/Entities/IUserDomain';
import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import UserUpdatePayload from '../../Domain/Payloads/User/UserUpdatePayload';
import UserAssignRolePayload from '../../Domain/Payloads/User/UserAssignRolePayload';
import ChangeMyPasswordPayload from '../../Domain/Payloads/User/ChangeMyPasswordPayload';
import ChangeUserPasswordPayload from '../../Domain/Payloads/User/ChangeUserPasswordPayload';
import UserSavePayload from '../../Domain/Payloads/User/UserSavePayload';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';

class UserController
{
    public async save(request: UserSavePayload): Promise<IUserDomain>
    {
        await ValidatorRequest.handle(request);

        const useCase = new SaveUserUseCase();
        return await useCase.handle(request);
    }

    public async list(request: ICriteria): Promise<IPaginator>
    {
        await ValidatorRequest.handle(request);

        const useCase = new ListUsersUseCase();
        return await useCase.handle(request);
    }

    public async getOne(request: IdPayload): Promise<IUserDomain>
    {
        await ValidatorRequest.handle(request);

        const useCase = new GetUserUseCase();
        return await useCase.handle(request);
    }

    public async update(request: UserUpdatePayload): Promise<IUserDomain>
    {
        await ValidatorRequest.handle(request);

        const useCase = new UpdateUserUseCase();
        return await useCase.handle(request);
    }

    public async assignRole(request: UserAssignRolePayload): Promise<IUserDomain>
    {
        await ValidatorRequest.handle(request);

        const useCase = new AssignRoleUseCase();
        return await useCase.handle(request);
    }

    public async remove(request: IdPayload): Promise<IUserDomain>
    {
        await ValidatorRequest.handle(request);

        const useCase = new RemoveUserUseCase();
        return await useCase.handle(request);
    }

    public async changeMyPassword(request: ChangeMyPasswordPayload): Promise<IUserDomain>
    {
        await ValidatorRequest.handle(request);

        const useCase = new ChangeMyPasswordUseCase();
        return await useCase.handle(request);
    }

    public async changeUserPassword(request: ChangeUserPasswordPayload): Promise<IUserDomain>
    {
        await ValidatorRequest.handle(request);

        const useCase = new ChangeUserPasswordUseCase();
        return await useCase.handle(request);
    }
}

export default UserController;
