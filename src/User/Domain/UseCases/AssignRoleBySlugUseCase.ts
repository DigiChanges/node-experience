import UserAssignRoleByPayload from '../../InterfaceAdapters/Payloads/UserAssignRoleByPayload';
import IUserDomain from '../../InterfaceAdapters/IUserDomain';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';
import IUserService from '../../InterfaceAdapters/IUserService';

class AssignRoleBySlugUseCase
{
    @containerFactory(SERVICES.IUserService)
    private userService: IUserService;

    async handle(payload: UserAssignRoleByPayload): Promise<IUserDomain>
    {
        return await this.userService.assignRoleBySlug(payload);
    }
}

export default AssignRoleBySlugUseCase;
