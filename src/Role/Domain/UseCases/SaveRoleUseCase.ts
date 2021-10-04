import RoleRepPayload from '../../InterfaceAdapters/Payloads/RoleRepPayload';
import IRoleDomain from '../../InterfaceAdapters/IRoleDomain';
import RoleService from '../Services/RoleService';

class SaveRoleUseCase
{
    private roleService = new RoleService();

    async handle(payload: RoleRepPayload): Promise<IRoleDomain>
    {
        return await this.roleService.create(payload);
    }
}

export default SaveRoleUseCase;
