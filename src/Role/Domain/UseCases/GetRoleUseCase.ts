import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import IRoleDomain from '../../InterfaceAdapters/IRoleDomain';
import RoleService from '../Services/RoleService';

class GetRoleUseCase
{
    private role_service = new RoleService();

    async handle(payload: IdPayload): Promise<IRoleDomain>
    {
        const id = payload.get_id();
        return await this.role_service.get_one(id);
    }
}

export default GetRoleUseCase;
