import { IPaginator, ICriteria } from '@digichanges/shared-experience';

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
import UserUpdatePayload from '../../InterfaceAdapters/Payloads/UserUpdatePayload';
import UserAssignRolePayload from '../../InterfaceAdapters/Payloads/UserAssignRolePayload';
import ChangeMyPasswordPayload from '../../InterfaceAdapters/Payloads/ChangeMyPasswordPayload';
import ChangeUserPasswordPayload from '../../InterfaceAdapters/Payloads/ChangeUserPasswordPayload';
import UserSavePayload from '../../InterfaceAdapters/Payloads/UserSavePayload';

class UserController
{
    public async save(request: UserSavePayload): Promise<IUserDomain>
    {
        await ValidatorRequest.handle(request);

        const use_case = new SaveUserUseCase();
        return await use_case.handle(request);
    }

    public async list(request: ICriteria): Promise<IPaginator>
    {
        await ValidatorRequest.handle(request);

        const use_case = new ListUsersUseCase();
        return await use_case.handle(request);
    }

    public async get_one(request: IdPayload): Promise<IUserDomain>
    {
        await ValidatorRequest.handle(request);

        const use_case = new GetUserUseCase();
        return await use_case.handle(request);
    }

    public async update(request: UserUpdatePayload): Promise<IUserDomain>
    {
        await ValidatorRequest.handle(request);

        const use_case = new UpdateUserUseCase();
        return await use_case.handle(request);
    }

    public async assign_role(request: UserAssignRolePayload): Promise<IUserDomain>
    {
        await ValidatorRequest.handle(request);

        const use_case = new AssignRoleUseCase();
        return await use_case.handle(request);
    }

    public async remove(request: IdPayload): Promise<any>
    {
        await ValidatorRequest.handle(request);

        const use_case = new RemoveUserUseCase();
        return await use_case.handle(request);
    }

    public async change_my_password(request: ChangeMyPasswordPayload): Promise<IUserDomain>
    {
        await ValidatorRequest.handle(request);

        const use_case = new ChangeMyPasswordUseCase();
        return await use_case.handle(request);
    }

    public async change_user_password(request: ChangeUserPasswordPayload): Promise<IUserDomain>
    {
        await ValidatorRequest.handle(request);

        const use_case = new ChangeUserPasswordUseCase();
        return await use_case.handle(request);
    }
}

export default UserController;
