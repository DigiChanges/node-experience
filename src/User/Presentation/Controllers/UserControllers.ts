import {IPaginator, ICriteria} from '@digichanges/shared-experience';

import GetUserUseCase from '../../Domain/UseCases/GetUserUseCase';
import ListUsersUseCase from '../../Domain/UseCases/ListUsersUseCase';
import SaveUserUseCase from '../../Domain/UseCases/SaveUserUseCase';
import AssignRoleUseCase from '../../Domain/UseCases/AssignRoleUseCase';
import RemoveUserUseCase from '../../Domain/UseCases/RemoveUserUseCase';
import ChangeMyPasswordUseCase from '../../Domain/UseCases/ChangeMyPasswordUseCase';
import ChangeUserPasswordUseCase from '../../Domain/UseCases/ChangeUserPasswordUseCase';
import UpdateUserUseCase from '../../Domain/UseCases/UpdateUserUseCase';

import ValidatorRequest from '../../../App/Presentation/Shared/Express/ValidatorRequest';

import IUserDomain from '../../InterfaceAdapters/IUserDomain';
import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import UserRepPayload from '../../InterfaceAdapters/Payloads/UserRepPayload';
import UserUpdatePayload from '../../InterfaceAdapters/Payloads/UserUpdatePayload';
import UserAssignRolePayload from '../../InterfaceAdapters/Payloads/UserAssignRolePayload';
import ChangeMyPasswordPayload from '../../InterfaceAdapters/Payloads/ChangeMyPasswordPayload';
import ChangeUserPasswordPayload from '../../InterfaceAdapters/Payloads/ChangeUserPasswordPayload';

class UserHandler
{
    public async save(request: UserRepPayload): Promise<IUserDomain>
    {
        await ValidatorRequest.handle(request);

        const saveUserUseCase = new SaveUserUseCase();
        return await saveUserUseCase.handle(request);
    }

    public async list(request: ICriteria): Promise<IPaginator>
    {
        await ValidatorRequest.handle(request);

        const listUsersUseCase = new ListUsersUseCase();
        return await listUsersUseCase.handle(request);
    }

    public async getOne(request: IdPayload): Promise<IUserDomain>
    {
        await ValidatorRequest.handle(request);

        const getUserUseCase = new GetUserUseCase();
        return await getUserUseCase.handle(request);
    }

    public async update(request: UserUpdatePayload): Promise<IUserDomain>
    {
        await ValidatorRequest.handle(request);

        const getUserUseCase = new UpdateUserUseCase();
        return await getUserUseCase.handle(request);
    }

    public async assignRole(request: UserAssignRolePayload): Promise<IUserDomain>
    {
        await ValidatorRequest.handle(request);

        const assignRoleUseCase = new AssignRoleUseCase();
        return await assignRoleUseCase.handle(request);
    }

    public async remove(request: IdPayload): Promise<any>
    {
        await ValidatorRequest.handle(request);

        const removeUserUseCase = new RemoveUserUseCase();
        return await removeUserUseCase.handle(request);
    }

    public async changeMyPassword(request: ChangeMyPasswordPayload): Promise<IUserDomain>
    {
        await ValidatorRequest.handle(request);

        const changeMyPasswordUseCase = new ChangeMyPasswordUseCase();
        return await changeMyPasswordUseCase.handle(request);
    }

    public async changeUserPassword(request: ChangeUserPasswordPayload): Promise<IUserDomain>
    {
        await ValidatorRequest.handle(request);

        const changeUserPasswordUseCase = new ChangeUserPasswordUseCase();
        return await changeUserPasswordUseCase.handle(request);
    }
}

export default UserHandler;
