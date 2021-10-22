import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';
import IRoleService from '../../InterfaceAdapters/IRoleService';

class RemoveRoleUseCase
{
    @containerFactory(SERVICES.IRoleService)
    private role_service: IRoleService;

    async handle(payload: IdPayload): Promise<any>
    {
        const id = payload.getId();
        return await this.role_service.remove(id);
    }
}

export default RemoveRoleUseCase;
