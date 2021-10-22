import UserAssignRolePayload from '../../InterfaceAdapters/Payloads/UserAssignRolePayload';
import IUserDomain from '../../InterfaceAdapters/IUserDomain';
import UserService from '../Services/UserService';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';

class AssignRoleUseCase
{
    @containerFactory(SERVICES.IUserService)
    private userService: UserService;

    async handle(payload: UserAssignRolePayload): Promise<IUserDomain>
    {
        return await this.userService.assignRole(payload);
    }
}

export default AssignRoleUseCase;
