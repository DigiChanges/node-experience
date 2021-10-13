import { ICriteria, IPaginator } from '@digichanges/shared-experience';
import RoleService from '../Services/RoleService';

class ListRolesUseCase
{
    private role_service = new RoleService();

    async handle(payload: ICriteria): Promise<IPaginator>
    {
        return await this.role_service.list(payload);
    }
}

export default ListRolesUseCase;
