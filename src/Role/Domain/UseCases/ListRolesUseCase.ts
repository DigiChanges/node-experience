import { ICriteria, IPaginator } from '@digichanges/shared-experience';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';
import IRoleService from '../../InterfaceAdapters/IRoleService';

class ListRolesUseCase
{
    @containerFactory(SERVICES.IRoleService)
    private roleService: IRoleService;

    async handle(payload: ICriteria): Promise<IPaginator>
    {
        return await this.roleService.list(payload);
    }
}

export default ListRolesUseCase;
