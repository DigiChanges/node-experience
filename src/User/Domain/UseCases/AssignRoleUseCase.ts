import UserAssignRolePayload from '../../InterfaceAdapters/Payloads/UserAssignRolePayload';
import IUserDomain from '../../InterfaceAdapters/IUserDomain';
import UserService from '../Services/UserService';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';

class AssignRoleUseCase
{
    @containerFactory(SERVICES.IUserService)
    private user_service: UserService;

    async handle(payload: UserAssignRolePayload): Promise<IUserDomain>
    {
        return await this.user_service.assignRole(payload);
    }
}

export default AssignRoleUseCase;
