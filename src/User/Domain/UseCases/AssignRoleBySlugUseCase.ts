import UserAssignRoleBySlug from '../../InterfaceAdapters/Payloads/UserAssignRoleBySlug';
import IUserDomain from '../../InterfaceAdapters/IUserDomain';
import UserService from '../Services/UserService';

class AssignRoleBySlugUseCase
{
    private userService = new UserService();

    async handle(payload: UserAssignRoleBySlug): Promise<IUserDomain>
    {
        return await this.userService.assignRoleBySlug(payload);
    }
}

export default AssignRoleBySlugUseCase;
