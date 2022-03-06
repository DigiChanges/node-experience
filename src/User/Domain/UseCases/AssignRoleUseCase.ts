import UserAssignRolePayload from '../Payloads/UserAssignRolePayload';
import IUserDomain from '../Entities/IUserDomain';
import UserService from '../Services/UserService';

class AssignRoleUseCase
{
    private userService = new UserService();

    async handle(payload: UserAssignRolePayload): Promise<IUserDomain>
    {
        return await this.userService.assignRole(payload);
    }
}

export default AssignRoleUseCase;
