import UserAssignRoleByPayload from '../../InterfaceAdapters/Payloads/UserAssignRoleByPayload';
import IUserDomain from '../../InterfaceAdapters/IUserDomain';
import UserService from '../Services/UserService';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';

class AssignRoleBySlugUseCase
{
    @containerFactory(SERVICES.IUserService)
    private user_service: UserService;

    async handle(payload: UserAssignRoleByPayload): Promise<IUserDomain>
    {
        return await this.user_service.assignRoleBySlug(payload);
    }
}

export default AssignRoleBySlugUseCase;
