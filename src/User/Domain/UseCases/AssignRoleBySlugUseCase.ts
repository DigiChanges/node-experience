import UserAssignRoleByPayload from '../../InterfaceAdapters/Payloads/UserAssignRoleByPayload';
import IUserDomain from '../../InterfaceAdapters/IUserDomain';
import UserService from '../Services/UserService';

class AssignRoleBySlugUseCase
{
    private user_service = new UserService();

    async handle(payload: UserAssignRoleByPayload): Promise<IUserDomain>
    {
        return await this.user_service.assign_role_by_slug(payload);
    }
}

export default AssignRoleBySlugUseCase;
