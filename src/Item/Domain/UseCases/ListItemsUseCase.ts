import { ICriteria, IPaginator } from '@digichanges/shared-experience';
import ItemService from '../Services/ItemService';

class ListItemsUseCase
{
    private itemService = new ItemService();

    async handle(payload: ICriteria): Promise<IPaginator>
    {
        return await this.itemService.list(payload);
    }
}

export default ListItemsUseCase;
