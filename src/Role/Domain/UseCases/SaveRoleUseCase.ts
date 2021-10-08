import RoleRepPayload from '../../InterfaceAdapters/Payloads/RoleRepPayload';
import IRoleDomain from '../../InterfaceAdapters/IRoleDomain';
import RoleService from '../Services/RoleService';

class SaveRoleUseCase
{
    private role_service = new RoleService();

    async handle(payload: RoleRepPayload): Promise<IRoleDomain>
    {
        return await this.role_service.create(payload);
    }
}

export default SaveRoleUseCase;
