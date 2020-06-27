import { lazyInject } from '../../../inversify.config'
import {SERVICES} from "../../../services";
import ICriteria from "../../../Lib/Contracts/ICriteria";
import IPaginator from "../../../Lib/Contracts/IPaginator";
import IUserService from "../../../InterfaceAdapters/IServices/IUserService";

class ListUsersUseCase
{
    @lazyInject(SERVICES.IUserService)
    private service: IUserService;

    async handle(payload: ICriteria): Promise<IPaginator>
    {
        return await this.service.list(payload);
    }
}

export default ListUsersUseCase;
