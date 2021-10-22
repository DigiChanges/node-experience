import { ICriteria, IPaginator } from '@digichanges/shared-experience';
import ItemService from '../Services/ItemService';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';

class ListItemsUseCase
{
    @containerFactory(SERVICES.IItemService)
    private itemService = new ItemService();

    async handle(payload: ICriteria): Promise<IPaginator>
    {
        return await this.itemService.list(payload);
    }
}

export default ListItemsUseCase;
