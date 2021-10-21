import RoleRepPayload from '../../InterfaceAdapters/Payloads/RoleRepPayload';
import IRoleDomain from '../../InterfaceAdapters/IRoleDomain';
import RoleService from '../Services/RoleService';
import { SERVICES } from '../../../services';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';

class SaveRoleUseCase
{
    @containerFactory(SERVICES.IRoleService)
    private roleService: RoleService;

    async handle(payload: RoleRepPayload): Promise<IRoleDomain>
    {
        return await this.roleService.create(payload);
    }
}

export default SaveRoleUseCase;
