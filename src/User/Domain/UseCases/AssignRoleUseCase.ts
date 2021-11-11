import UserAssignRolePayload from '../../InterfaceAdapters/Payloads/UserAssignRolePayload';
import IUserDomain from '../../InterfaceAdapters/IUserDomain';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';
import IUserService from '../../InterfaceAdapters/IUserService';

class AssignRoleUseCase
{
    @containerFactory(SERVICES.IUserService)
    private userService: IUserService;

    async handle(payload: UserAssignRolePayload): Promise<IUserDomain>
    {
        return await this.userService.assignRole(payload);
    }
}

export default AssignRoleUseCase;
