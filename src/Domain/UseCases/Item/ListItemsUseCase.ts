import { lazyInject } from '../../../inversify.config'
import {SERVICES} from "../../../services";
import IItemService from "../../../InterfaceAdapters/IServices/IItemService";
import ICriteria from "../../../Lib/Contracts/ICriteria";
import IPaginator from "../../../Lib/Contracts/IPaginator";

class ListItemsUseCase
{
    @lazyInject(SERVICES.IItemService)
    private service: IItemService;

    async handle(payload: ICriteria): Promise<IPaginator>
    {
        return await this.service.list(payload);
    }
}

export default ListItemsUseCase;
