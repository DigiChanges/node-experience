import UserAssignRoleByPayload from '../../InterfaceAdapters/Payloads/UserAssignRoleByPayload';
import IUserDomain from '../../InterfaceAdapters/IUserDomain';
import UserService from '../Services/UserService';

class AssignRoleBySlugUseCase
{
    private user_service = new UserService();

    async handle(payload: UserAssignRoleByPayload): Promise<IUserDomain>
    {
        return await this.user_service.assignRoleBySlug(payload);
    }
}

export default AssignRoleBySlugUseCase;
