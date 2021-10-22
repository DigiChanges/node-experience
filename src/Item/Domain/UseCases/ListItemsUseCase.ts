import { ICriteria, IPaginator } from '@digichanges/shared-experience';
import ItemService from '../Services/ItemService';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';

class ListItemsUseCase
{
    @containerFactory(SERVICES.IItemService)
    private item_service = new ItemService();

    async handle(payload: ICriteria): Promise<IPaginator>
    {
        return await this.item_service.list(payload);
    }
}

export default ListItemsUseCase;
