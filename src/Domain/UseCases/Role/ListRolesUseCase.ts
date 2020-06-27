import { lazyInject } from '../../../inversify.config'
import {SERVICES} from "../../../services";
import ICriteria from "../../../Lib/Contracts/ICriteria";
import IPaginator from "../../../Lib/Contracts/IPaginator";
import IRoleService from "../../../InterfaceAdapters/IServices/IRoleService";

class ListRolesUseCase
{
    @lazyInject(SERVICES.IRoleService)
    private service: IRoleService;

    async handle(data: ICriteria): Promise<IPaginator>
    {
        return await this.service.list(data);
    }
}

export default ListRolesUseCase;
