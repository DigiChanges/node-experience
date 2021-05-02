import IItemRepository from '../../InterfaceAdapters/IItemRepository';
import {REPOSITORIES} from '../../../repositories';
import {ICriteria, IPaginator} from '@digichanges/shared-experience';
import {containerFactory} from '../../../Shared/Decorators/ContainerFactory';

class ListItemsUseCase
{
    @containerFactory(REPOSITORIES.IItemRepository)
    private repository: IItemRepository;

    async handle(payload: ICriteria): Promise<IPaginator>
    {
        return await this.repository.list(payload);
    }
}

export default ListItemsUseCase;
