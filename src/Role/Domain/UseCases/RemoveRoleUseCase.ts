import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import RoleService from '../Services/RoleService';

class RemoveRoleUseCase
{
    private roleService = new RoleService();

    async handle(payload: IdPayload): Promise<any>
    {
        const id = payload.get_id();
        return await this.roleService.remove(id);
    }
}

export default RemoveRoleUseCase;
