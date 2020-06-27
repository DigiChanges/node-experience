import { lazyInject } from '../../../inversify.config'
import {SERVICES} from "../../../services";
import IItemService from "../../../InterfaceAdapters/IServices/IItemService";
import ItemRepPayload from "../../../InterfaceAdapters/Payloads/Items/ItemRepPayload";
import IItem from "../../../InterfaceAdapters/IEntities/IItem";

class SaveItemUseCase
{
    @lazyInject(SERVICES.IItemService)
    private service: IItemService;

    async handle(payload: ItemRepPayload): Promise<IItem>
    {
        return await this.service.save(payload);
    }
}

export default SaveItemUseCase;
