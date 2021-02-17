import { lazyInject } from '../../../inversify.config'
import IItemRepository from "../../../InterfaceAdapters/IRepositories/IItemRepository";
import {REPOSITORIES} from "../../../repositories";
import {ICriteria, IPaginator} from "@digichanges/shared-experience";

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
