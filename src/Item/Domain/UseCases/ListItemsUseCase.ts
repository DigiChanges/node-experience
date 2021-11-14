import { ICriteria, IPaginator } from '@digichanges/shared-experience';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';
import IItemService from '../../InterfaceAdapters/IItemService';

class ListItemsUseCase
{
    @containerFactory(SERVICES.IItemService)
    private itemService: IItemService;

    async handle(payload: ICriteria): Promise<IPaginator>
    {
        return await this.itemService.list(payload);
    }
}

export default ListItemsUseCase;
