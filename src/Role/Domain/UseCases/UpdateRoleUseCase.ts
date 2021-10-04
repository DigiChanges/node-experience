import RoleUpdatePayload from '../../InterfaceAdapters/Payloads/RoleUpdatePayload';
import IRoleDomain from '../../InterfaceAdapters/IRoleDomain';
import RoleService from '../Services/RoleService';

class UpdateRoleUseCase
{
    private roleService = new RoleService();

    async handle(payload: RoleUpdatePayload): Promise<IRoleDomain>
    {
        return await this.roleService.update(payload);
    }
}

export default UpdateRoleUseCase;
