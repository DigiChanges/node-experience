import { IPaginator } from '@digichanges/shared-experience';

import GetUserUseCase from '../../Domain/UseCases/GetUserUseCase';
import ListUsersUseCase from '../../Domain/UseCases/ListUsersUseCase';
import SaveUserUseCase from '../../Domain/UseCases/SaveUserUseCase';
import AssignRoleUseCase from '../../Domain/UseCases/AssignRoleUseCase';
import RemoveUserUseCase from '../../Domain/UseCases/RemoveUserUseCase';
import ChangeMyPasswordUseCase from '../../Domain/UseCases/ChangeMyPasswordUseCase';
import ChangeUserPasswordUseCase from '../../Domain/UseCases/ChangeUserPasswordUseCase';
import UpdateUserUseCase from '../../Domain/UseCases/UpdateUserUseCase';

import ValidatorRequest from '../../../App/Presentation/Shared/ValidatorRequest';

import IUserDomain from '../../Domain/Entities/IUserDomain';
import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import UserUpdatePayload from '../../Domain/Payloads/UserUpdatePayload';
import UserAssignRolePayload from '../../Domain/Payloads/UserAssignRolePayload';
import ChangeMyPasswordPayload from '../../Domain/Payloads/ChangeMyPasswordPayload';
import ChangeUserPasswordPayload from '../../Domain/Payloads/ChangeUserPasswordPayload';
import UserSavePayload from '../../Domain/Payloads/UserSavePayload';
import ICriteria from '../../../App/Domain/Payloads/ICriteria';

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
