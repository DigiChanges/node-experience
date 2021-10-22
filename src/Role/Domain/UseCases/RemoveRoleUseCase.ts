import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';
import IRoleService from '../../InterfaceAdapters/IRoleService';

class RemoveRoleUseCase
{
    @containerFactory(SERVICES.IRoleService)
    private roleService: IRoleService;

    async handle(payload: IdPayload): Promise<any>
    {
        const id = payload.getId();
        return await this.roleService.remove(id);
    }
}

export default RemoveRoleUseCase;
