import RoleUpdatePayload from '../../InterfaceAdapters/Payloads/RoleUpdatePayload';
import IRoleDomain from '../../InterfaceAdapters/IRoleDomain';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';
import IRoleService from '../../InterfaceAdapters/IRoleService';

class UpdateRoleUseCase
{
    @containerFactory(SERVICES.IRoleService)
    private roleService: IRoleService;

    async handle(payload: RoleUpdatePayload): Promise<IRoleDomain>
    {
        return await this.roleService.update(payload);
    }
}

export default UpdateRoleUseCase;
