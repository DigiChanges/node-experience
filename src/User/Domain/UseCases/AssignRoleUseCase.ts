import UserAssignRolePayload from '../../InterfaceAdapters/Payloads/UserAssignRolePayload';
import IUserDomain from '../../InterfaceAdapters/IUserDomain';
import UserService from '../Services/UserService';

class AssignRoleUseCase
{
    private user_service = new UserService();

    async handle(payload: UserAssignRolePayload): Promise<IUserDomain>
    {
        return await this.user_service.assign_role(payload);
    }
}

export default AssignRoleUseCase;
