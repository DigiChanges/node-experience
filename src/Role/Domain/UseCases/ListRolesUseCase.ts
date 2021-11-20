import { ICriteria, IPaginator } from '@digichanges/shared-experience';
import RoleService from '../Services/RoleService';

class ListRolesUseCase
{
    private roleService = new RoleService();

    async handle(payload: ICriteria): Promise<IPaginator>
    {
        return await this.roleService.list(payload);
    }
}

export default ListRolesUseCase;
