import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import IRoleDomain from '../../InterfaceAdapters/IRoleDomain';
import RoleService from '../Services/RoleService';

class GetRoleUseCase
{
    private roleService = new RoleService();

    async handle(payload: IdPayload): Promise<IRoleDomain>
    {
        const id = payload.getId();
        return await this.roleService.get_one(id);
    }
}

export default GetRoleUseCase;
