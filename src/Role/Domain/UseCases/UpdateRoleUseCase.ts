import RoleUpdatePayload from '../../InterfaceAdapters/Payloads/RoleUpdatePayload';
import IRoleDomain from '../../InterfaceAdapters/IRoleDomain';
import RoleService from '../Services/RoleService';

class UpdateRoleUseCase
{
    private role_service = new RoleService();

    async handle(payload: RoleUpdatePayload): Promise<IRoleDomain>
    {
        return await this.role_service.update(payload);
    }
}

export default UpdateRoleUseCase;
