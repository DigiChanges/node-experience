import RoleRepPayload from '../../InterfaceAdapters/Payloads/RoleRepPayload';
import IRoleDomain from '../../InterfaceAdapters/IRoleDomain';
import { SERVICES } from '../../../services';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import IRoleService from '../../InterfaceAdapters/IRoleService';

class SaveRoleUseCase
{
    @containerFactory(SERVICES.IRoleService)
    private role_service: IRoleService;

    async handle(payload: RoleRepPayload): Promise<IRoleDomain>
    {
        return await this.role_service.create(payload);
    }
}

export default SaveRoleUseCase;
