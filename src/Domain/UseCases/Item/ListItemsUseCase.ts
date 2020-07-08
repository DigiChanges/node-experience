import { lazyInject } from '../../../inversify.config'
import ICriteria from "../../../InterfaceAdapters/Shared/ICriteria";
import IPaginator from "../../../InterfaceAdapters/Shared/IPaginator";
import IItemRepository from "../../../InterfaceAdapters/IRepositories/IItemRepository";
import {REPOSITORIES} from "../../../repositories";

class ListItemsUseCase
{
    @lazyInject(REPOSITORIES.IItemRepository)
    private repository: IItemRepository;

    async handle(payload: ICriteria): Promise<IPaginator>
    {
        return await this.repository.list(payload);
    }
}

export default ListItemsUseCase;
