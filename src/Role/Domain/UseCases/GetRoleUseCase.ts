import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import IRoleDomain from '../../InterfaceAdapters/IRoleDomain';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';
import IRoleService from '../../InterfaceAdapters/IRoleService';

class GetRoleUseCase
{
    @containerFactory(SERVICES.IRoleService)
    private roleService: IRoleService;

    async handle(payload: IdPayload): Promise<IRoleDomain>
    {
        const id = payload.getId();
        return await this.roleService.getOne(id);
    }
}

export default GetRoleUseCase;
